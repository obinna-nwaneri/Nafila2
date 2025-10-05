import { cache } from "react";
import { neon } from "@neondatabase/serverless";
import { HeroStats } from "@/components/data-highlights";

const FALLBACK_STATS: HeroStats = {
  entrepreneurs: 1280,
  investors: 540,
  verifiedStartups: 312,
  dealsClosed: 96,
  lastUpdated: new Date()
};

export const getHeroStats = cache(async (): Promise<HeroStats> => {
  if (!process.env.DATABASE_URL) {
    return FALLBACK_STATS;
  }

  const sql = neon(process.env.DATABASE_URL);
  try {
    const result = await sql<{ entrepreneurs: number; investors: number; deals: number; verified: number; updated_at: Date }[]>`
      select
        coalesce((select count(*) from users where role = 'ENTREPRENEUR'), 0)::int as entrepreneurs,
        coalesce((select count(*) from users where role = 'INVESTOR'), 0)::int as investors,
        coalesce((select count(*) from ideas where is_verified = true), 0)::int as verified,
        coalesce((select count(*) from deals where status = 'CLOSED'), 0)::int as deals,
        now() as updated_at;
    `;

    const row = result[0];
    if (!row) return FALLBACK_STATS;

    return {
      entrepreneurs: row.entrepreneurs,
      investors: row.investors,
      verifiedStartups: row.verified,
      dealsClosed: row.deals,
      lastUpdated: new Date(row.updated_at)
    };
  } catch (error) {
    console.error("Failed to load hero stats", error);
    return FALLBACK_STATS;
  }
});
