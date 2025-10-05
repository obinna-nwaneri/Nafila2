import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

export type DbUser = {
  id: string;
  email: string;
  full_name: string | null;
  password_hash: string | null;
  role: string;
};

function getClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  return neon(process.env.DATABASE_URL);
}

export async function getUserByEmail(email: string) {
  const sql = getClient();
  const rows = await sql<DbUser[]>`
    select id, email, full_name, password_hash, role
    from users
    where email = ${email}
    limit 1;
  `;
  return rows[0] ?? null;
}

export async function verifyUserCredentials(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user?.password_hash) {
    return null;
  }
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return null;
  return user;
}
