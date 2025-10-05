import "dotenv/config";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(process.env.DATABASE_URL);

  await sql`create extension if not exists "pgcrypto";`;

  await sql`
    create table if not exists users (
      id uuid primary key default gen_random_uuid(),
      email text unique not null,
      password_hash text,
      role text not null default 'USER',
      full_name text,
      created_at timestamptz default now()
    );
  `;

  await sql`create unique index if not exists users_email_key on users(email);`;

  await sql`
    create table if not exists entrepreneur_profiles (
      id uuid primary key default gen_random_uuid(),
      user_id uuid unique references users(id) on delete cascade,
      bio text,
      idea_summary text,
      pitch_video_url text,
      documents jsonb default '[]'::jsonb,
      contact_email text,
      social_links jsonb default '[]'::jsonb,
      avatar_url text,
      created_at timestamptz default now()
    );
  `;

  await sql`
    create unique index if not exists entrepreneur_profiles_user_id_idx
    on entrepreneur_profiles(user_id);
  `;

  await sql`
    create table if not exists investor_profiles (
      id uuid primary key default gen_random_uuid(),
      user_id uuid unique references users(id) on delete cascade,
      firm_name text,
      sectors text[] default '{}',
      ticket_size_min numeric,
      ticket_size_max numeric,
      geography text[] default '{}',
      risk_appetite text,
      bio text,
      contact_email text,
      linkedin_url text,
      website_url text,
      created_at timestamptz default now()
    );
  `;

  await sql`
    create unique index if not exists investor_profiles_user_id_idx
    on investor_profiles(user_id);
  `;

  await sql`
    create table if not exists ideas (
      id uuid primary key default gen_random_uuid(),
      owner_id uuid references users(id) on delete cascade,
      title text not null,
      problem_statement text not null,
      solution text not null,
      market_opportunity text not null,
      business_model text not null,
      financial_projection text not null,
      traction text not null,
      sector text not null,
      location text not null,
      pitch_url text,
      instagram_handle text,
      other_links text,
      is_verified boolean default false,
      created_at timestamptz default now(),
      updated_at timestamptz default now(),
      unique (owner_id, title)
    );
  `;

  await sql`
    create unique index if not exists ideas_owner_id_title_idx
    on ideas(owner_id, title);
  `;

  await sql`
    create table if not exists deals (
      id uuid primary key default gen_random_uuid(),
      idea_id uuid references ideas(id) on delete cascade,
      investor_id uuid references users(id) on delete cascade,
      amount numeric,
      status text,
      created_at timestamptz default now()
    );
  `;

  const entrepreneurPassword = await bcrypt.hash("entrepreneur123", 12);
  const investorPassword = await bcrypt.hash("investor123", 12);
  const adminPassword = await bcrypt.hash("admin123", 12);

  const [entrepreneur] = await sql`
    insert into users (email, password_hash, role, full_name)
    values ('founder@nafila.shop', ${entrepreneurPassword}, 'ENTREPRENEUR', 'Zainab Bello')
    on conflict (email) do update set password_hash = excluded.password_hash
    returning *;
  `;

  const [investor] = await sql`
    insert into users (email, password_hash, role, full_name)
    values ('investor@auroracapital.com', ${investorPassword}, 'INVESTOR', 'Aurora Capital Team')
    on conflict (email) do update set password_hash = excluded.password_hash
    returning *;
  `;

  await sql`
    insert into users (email, password_hash, role, full_name)
    values ('admin@nafila.shop', ${adminPassword}, 'ADMIN', 'Nafila Admin')
    on conflict (email) do update set password_hash = excluded.password_hash;
  `;

  await sql`
    insert into entrepreneur_profiles (user_id, bio, idea_summary, pitch_video_url, documents, contact_email, social_links)
    values (
      ${entrepreneur.id},
      'Founder with 10 years of retail ops experience building resilient commerce infrastructure.',
      'Nafila Logistics Mesh provides last-mile delivery for African SMEs.',
      'https://youtu.be/demo',
      '[{"type":"pitchdeck","url":"https://nafila.shop/deck"}]',
      'founder@nafila.shop',
      '["https://instagram.com/nafila","https://linkedin.com/in/zainabbello"]'
    )
    on conflict (user_id) do nothing;
  `;

  await sql`
    insert into investor_profiles (
      user_id,
      firm_name,
      sectors,
      ticket_size_min,
      ticket_size_max,
      geography,
      risk_appetite,
      bio,
      contact_email,
      linkedin_url,
      website_url
    )
    values (
      ${investor.id},
      'Aurora Capital',
      '{Retail,Logistics,Fintech}',
      250000,
      1500000,
      '{Nigeria,Kenya,Ghana}',
      'Balanced',
      'Backing resilient commerce infrastructure across Africa with operational expertise.',
      'investor@auroracapital.com',
      'https://linkedin.com/company/aurora-capital',
      'https://auroracapital.com'
    )
    on conflict (user_id) do nothing;
  `;

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
      ${entrepreneur.id},
      'Nafila Logistics Mesh',
      'African SMEs lack reliable last-mile fulfillment for online sales.',
      'Distributed network of micro-fulfillment hubs with IoT tracking and AI routing.',
      '$12B addressable market across 5 countries.',
      'Tiered SaaS subscriptions plus per-delivery fees.',
      'ARR $540k, burn multiple 1.2x, runway 18 months.',
      '1,200 merchants onboarded, 30% MoM GMV growth.',
      'Logistics',
      'Lagos, Nigeria',
      'https://youtu.be/demo',
      'https://instagram.com/nafila',
      'https://nafila.shop',
      true
    )
    on conflict (owner_id, title) do nothing;
  `;

  console.log("Seed data inserted successfully");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
