"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["ENTREPRENEUR", "INVESTOR", "USER"]),
  name: z.string().min(2)
});

const ideaSchema = z.object({
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

export async function registerUser(formData: FormData) {
  const payload = registrationSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    name: formData.get("name")
  });

  const hashedPassword = await bcrypt.hash(payload.password, 12);
  const sql = getClient();

  await sql`
    insert into users (email, password_hash, role, full_name)
    values (${payload.email}, ${hashedPassword}, ${payload.role}, ${payload.name})
    on conflict (email) do update set
      password_hash = excluded.password_hash,
      role = excluded.role,
      full_name = excluded.full_name
    returning id;
  `;

  revalidatePath("/dashboard");
}

export async function submitIdea(_: any, formData: FormData) {
  const payload = ideaSchema.parse({
    ownerId: formData.get("ownerId"),
    title: formData.get("title"),
    problem: formData.get("problem"),
    solution: formData.get("solution"),
    market: formData.get("market"),
    businessModel: formData.get("businessModel"),
    financials: formData.get("financials"),
    traction: formData.get("traction"),
    sector: formData.get("sector"),
    location: formData.get("location"),
    pitchUrl: formData.get("pitchUrl") || null,
    instagram: formData.get("instagram") || null,
    otherLinks: formData.get("otherLinks") || null
  });

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
      ${payload.pitchUrl},
      ${payload.instagram},
      ${payload.otherLinks},
      false
    );
  `;

  revalidatePath("/ideas");
}
