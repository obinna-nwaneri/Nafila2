import { cache } from "react";
import { neon } from "@neondatabase/serverless";
import { EntrepreneurIdea } from "@/lib/types";

const FALLBACK_IDEAS: EntrepreneurIdea[] = [
  {
    id: "demo-1",
    title: "Nafila Logistics Mesh",
    problem: "African SMEs lack reliable last-mile fulfillment for online sales.",
    solution: "Distributed network of micro-fulfillment hubs with IoT tracking and AI routing.",
    market: "$12B addressable market across 5 countries.",
    businessModel: "Tiered SaaS subscriptions plus per-delivery fees.",
    financials: "ARR $540k, burn multiple 1.2x, runway 18 months.",
    traction: "1,200 merchants onboarded, 30% MoM GMV growth.",
    sector: "Logistics",
    location: "Lagos, Nigeria",
    pitchUrl: "https://youtu.be/demo",
    instagram: "https://instagram.com/nafila",
    otherLinks: "https://nafila.shop",
    isVerified: true,
    ownerName: "Zainab Bello",
    ownerAvatar: null,
    updatedAt: new Date().toISOString()
  }
];

export const getIdeas = cache(async (): Promise<EntrepreneurIdea[]> => {
  if (!process.env.DATABASE_URL) {
    return FALLBACK_IDEAS;
  }

  const sql = neon(process.env.DATABASE_URL);
  try {
    const rows = await sql<EntrepreneurIdea[]>`
      select
        i.id,
        i.title,
        i.problem_statement as problem,
        i.solution,
        i.market_opportunity as market,
        i.business_model as "businessModel",
        i.financial_projection as financials,
        i.traction,
        i.sector,
        i.location,
        i.pitch_url as "pitchUrl",
        i.instagram_handle as instagram,
        i.other_links as "otherLinks",
        i.is_verified as "isVerified",
        coalesce(u.full_name, u.email) as "ownerName",
        ep.avatar_url as "ownerAvatar",
        i.updated_at as "updatedAt"
      from ideas i
      join users u on u.id = i.owner_id
      left join entrepreneur_profiles ep on ep.user_id = u.id
      order by i.updated_at desc
      limit 30;
    `;

    return rows.map((row) => ({ ...row, updatedAt: new Date(row.updatedAt).toISOString() }));
  } catch (error) {
    console.error("Failed to fetch ideas", error);
    return FALLBACK_IDEAS;
  }
});
