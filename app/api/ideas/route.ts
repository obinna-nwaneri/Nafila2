import { NextResponse } from "next/server";
import { z } from "zod";
import { neon } from "@neondatabase/serverless";

const createSchema = z.object({
  ownerId: z.string().uuid(),
  title: z.string().min(3),
  problem: z.string().min(10),
  solution: z.string().min(10),
  market: z.string().min(10),
  businessModel: z.string().min(5),
  financials: z.string().min(5),
  traction: z.string().min(5),
  sector: z.string().min(2),
  location: z.string().min(2),
  pitchUrl: z.string().url().nullable().optional(),
  instagram: z.string().url().nullable().optional(),
  otherLinks: z.string().url().nullable().optional()
});

function getClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  return neon(process.env.DATABASE_URL);
}

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json([]);
    }
    const sql = getClient();
    const rows = await sql`
      select id, title, sector, location, updated_at
      from ideas
      order by updated_at desc
      limit 50;
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load ideas" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = createSchema.parse(body);
    const sql = getClient();
    await sql`
      insert into ideas (
        owner_id,
        title,
        problem_statement,
        solution,
        market_opportunity,
        business_model,
        financial_projection,
        traction,
        sector,
        location,
        pitch_url,
        instagram_handle,
        other_links,
        is_verified
      )
      values (
        ${payload.ownerId},
        ${payload.title},
        ${payload.problem},
        ${payload.solution},
        ${payload.market},
        ${payload.businessModel},
        ${payload.financials},
        ${payload.traction},
        ${payload.sector},
        ${payload.location},
        ${payload.pitchUrl ?? null},
        ${payload.instagram ?? null},
        ${payload.otherLinks ?? null},
        false
      );
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create idea" }, { status: 500 });
  }
}
