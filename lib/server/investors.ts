import { cache } from "react";
import { neon } from "@neondatabase/serverless";
import { InvestorProfile } from "@/lib/types";

const FALLBACK_INVESTORS: InvestorProfile[] = [
  {
    id: "demo-investor-1",
    userId: "demo",
    fullName: "Aurora Capital",
    sectors: ["Retail", "Logistics", "Fintech"],
    ticketSizeMin: 250000,
    ticketSizeMax: 1500000,
    geography: ["Nigeria", "Kenya", "Ghana"],
    riskAppetite: "Balanced",
    bio: "Backing resilient commerce infrastructure across Africa with operational expertise.",
    contactEmail: "hello@auroracapital.com",
    linkedIn: "https://linkedin.com/company/aurora-capital",
    website: "https://auroracapital.com"
  }
];

export const getInvestors = cache(async (): Promise<InvestorProfile[]> => {
  if (!process.env.DATABASE_URL) {
    return FALLBACK_INVESTORS;
  }

  const sql = neon(process.env.DATABASE_URL);
  try {
    const rows = await sql<InvestorProfile[]>`
      select
        ip.id,
        ip.user_id as "userId",
        coalesce(ip.firm_name, u.full_name, u.email) as "fullName",
        ip.sectors,
        ip.ticket_size_min as "ticketSizeMin",
        ip.ticket_size_max as "ticketSizeMax",
        ip.geography,
        ip.risk_appetite as "riskAppetite",
        ip.bio,
        ip.contact_email as "contactEmail",
        ip.linkedin_url as "linkedIn",
        ip.website_url as "website"
      from investor_profiles ip
      join users u on u.id = ip.user_id
      order by ip.created_at desc
      limit 40;
    `;

    return rows.map((row) => ({
      ...row,
      sectors: Array.isArray(row.sectors) ? row.sectors : String(row.sectors || "").split(",").map((s) => s.trim()).filter(Boolean),
      geography: Array.isArray(row.geography)
        ? row.geography
        : String(row.geography || "").split(",").map((s) => s.trim()).filter(Boolean)
    }));
  } catch (error) {
    console.error("Failed to load investors", error);
    return FALLBACK_INVESTORS;
  }
});
