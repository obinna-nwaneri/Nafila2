"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";

interface IdeaRecord {
  id: string;
  title: string;
  owner_id: string;
  sector: string;
  status: string;
  target_raise: string | null;
}

export async function getIdeasFromDatabase(): Promise<IdeaRecord[]> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn("DATABASE_URL is not configured. Returning empty data set.");
    return [];
  }

  const sql = neon(connectionString);
  try {
    const ideas = await sql<IdeaRecord>`
      select id, title, owner_id, sector, status, target_raise
      from ideas
      order by created_at desc
      limit 25
    `;
    return ideas;
  } catch (error) {
    console.error("Failed to query Neon database", error);
    return [];
  }
}

export async function createSampleIdea(data: {
  title: string;
  ownerId: string;
  sector: string;
  status?: string;
  targetRaise?: string;
}) {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }

  const sql = neon(connectionString);
  const status = data.status ?? "raising";

  await sql`
    insert into ideas (title, owner_id, sector, status, target_raise)
    values (${data.title}, ${data.ownerId}, ${data.sector}, ${status}, ${data.targetRaise ?? null})
    on conflict (title)
    do update set
      sector = excluded.sector,
      status = excluded.status,
      target_raise = excluded.target_raise
  `;

  revalidatePath("/entrepreneur");
  revalidatePath("/investor");
}
