import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { pool } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { rows } = await pool.query(
      `SELECT played_date::text AS date, won, attempts,
              used_hints AS "usedHints", used_map AS "usedMap", forfeited
       FROM game_result
       WHERE user_id = $1
       ORDER BY played_date DESC`,
      [session.user.id],
    );
    return NextResponse.json({ results: rows });
  } catch (err) {
    console.error("[GET /api/results]", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { date, won, attempts, usedHints, usedMap, forfeited } = body as Record<string, unknown>;

  // Basic input validation
  if (
    typeof date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    typeof won !== "boolean" ||
    typeof attempts !== "number" ||
    attempts < 0
  ) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    // Upsert user profile on every result submission so user_auth stays current
    await pool.query(
      `INSERT INTO user_auth (id, email, name, avatar_url)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE SET
           email      = EXCLUDED.email,
           name       = EXCLUDED.name,
           avatar_url = EXCLUDED.avatar_url,
           updated_at = now()`,
      [session.user.id, session.user.email ?? null, session.user.name ?? null, session.user.image ?? null],
    );

    await pool.query(
      `INSERT INTO game_result (user_id, played_date, won, attempts, used_hints, used_map, forfeited)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (user_id, played_date) DO NOTHING`,
      [session.user.id, date, won, attempts, usedHints === true, usedMap === true, forfeited === true],
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[POST /api/results]", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
