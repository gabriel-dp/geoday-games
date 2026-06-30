import { NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { CountryData } from "@/types/country";

// Country data is static — cache for 24 h
export const revalidate = 86400;

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT
          alpha_3,
          alpha_2,
          common_name,
          alternate_names,
          native_names,
          translations,
          capitals,
          flag_emoji,
          flag_unicode,
          flag_html_entity,
          flag_url_png,
          flag_url_svg,
          region,
          subregion,
          continents,
          landlocked,
          borders,
          area_kilometers,
          latitude,
          longitude,
          population,
          languages,
          calling_codes,
          driving_side,
          un_member,
          parent_alpha_3,
          government_type
      FROM
          country
      WHERE
          un_member = TRUE
      ORDER BY
          common_name
    `);

    const countries: CountryData[] = rows.map((row) => ({
      names: {
        common: row.common_name,
        alternates: row.alternate_names ?? [],
        native: row.native_names ?? {},
        translations: row.translations ?? {},
      },
      capitals: (row.capitals ?? []).map((name: string) => ({ name })),
      codes: {
        alpha_2: row.alpha_2.trim(),
        alpha_3: row.alpha_3.trim(),
      },
      flag: {
        emoji: row.flag_emoji,
        unicode: row.flag_unicode,
        html_entity: row.flag_html_entity,
        url_png: row.flag_url_png,
        url_svg: row.flag_url_svg,
      },
      region: row.region,
      subregion: row.subregion ?? "",
      continents: row.continents ?? [],
      landlocked: row.landlocked,
      borders: (row.borders ?? []).map((b: string) => b.trim()),
      area: { kilometers: Number(row.area_kilometers ?? 0) },
      coordinates: {
        lat: Number(row.latitude ?? 0),
        lng: Number(row.longitude ?? 0),
      },
      population: Number(row.population),
      languages: row.languages ?? [],
      calling_codes: row.calling_codes ?? [],
      cars: { driving_side: row.driving_side },
      classification: { un_member: row.un_member },
      parent: {
        alpha_2: "",
        alpha_3: row.parent_alpha_3?.trim() ?? "",
      },
      government_type: row.government_type ?? "",
    }));

    return NextResponse.json(countries, {
      headers: { "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600" },
    });
  } catch (err) {
    console.error("[GET /api/countries]", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
