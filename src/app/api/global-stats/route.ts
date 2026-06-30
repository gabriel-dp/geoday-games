import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode");
  const date = searchParams.get("date");

  if (!mode || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid params" }, { status: 400 });
  }

  try {
    const { rows } = await pool.query(
      `SELECT
         COUNT(*)::int                            AS "totalPlayers",
         ROUND(AVG(attempts)::numeric, 1)::float  AS "avgAttempts"
       FROM global_result
       WHERE played_date = $1 AND mode = $2`,
      [date, mode],
    );
    return NextResponse.json({
      totalPlayers: rows[0].totalPlayers ?? 0,
      avgAttempts: rows[0].avgAttempts ?? null,
    });
  } catch (err) {
    console.error("[GET /api/global-stats]", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { mode, date, attempts, won } = body as Record<string, unknown>;

  if (
    typeof mode !== "string" ||
    !["hints", "flag"].includes(mode) ||
    typeof date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    typeof attempts !== "number" ||
    attempts < 0 ||
    attempts > 100 ||
    typeof won !== "boolean"
  ) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    await pool.query(`INSERT INTO global_result (played_date, mode, attempts, won) VALUES ($1, $2, $3, $4)`, [
      date,
      mode,
      attempts,
      won,
    ]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[POST /api/global-stats]", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
