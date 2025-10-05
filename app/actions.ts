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
