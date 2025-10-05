import {
  primaryEntrepreneurIdeas,
  primaryInvestors,
  socialFeed,
  users,
} from "../src/lib/sampleData";

import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";

loadEnv();
loadEnv({ path: ".env.local", override: true });

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not defined. Please set it in your environment before seeding."
    );
  }

  const sql = neon(connectionString);

  await sql`create table if not exists users (
    id text primary key,
    name text not null,
    email text unique not null,
    role text not null,
    password text not null,
    avatar_url text,
    bio text,
    location text,
    social_handles jsonb,
    verification jsonb,
    metrics jsonb,
    created_at timestamptz default now()
  )`;

  await sql`create table if not exists ideas (
    id text primary key,
    owner_id text not null references users(id) on delete cascade,
    title text not null,
    sector text not null,
    problem text,
    solution text,
    market_opportunity text,
    business_model text,
    financial_projections text,
    traction text,
    location text,
    media jsonb,
    status text not null,
    target_raise text,
    followers integer default 0,
    likes integer default 0,
    created_at timestamptz default now(),
    unique(title)
  )`;

  await sql`create table if not exists investor_profiles (
    id text primary key,
    user_id text not null references users(id) on delete cascade,
    ticket_size text,
    sectors text[],
    geography text[],
    risk_appetite text,
    traction_preference text,
    watchlist text[],
    created_at timestamptz default now()
  )`;

  await sql`create table if not exists feed_entries (
    id text primary key,
    user_id text not null references users(id) on delete cascade,
    message text not null,
    timestamp timestamptz not null,
    likes integer default 0,
    comments integer default 0
  )`;

  for (const user of users) {
    await sql`
      insert into users (
        id, name, email, role, password, avatar_url, bio, location,
        social_handles, verification, metrics
      ) values (
        ${user.id},
        ${user.name},
        ${user.email},
        ${user.role},
        ${user.password},
        ${user.avatarUrl ?? null},
        ${user.bio ?? null},
        ${user.location ?? null},
        ${user.socialHandles ? sql.json(user.socialHandles) : null},
        ${user.verification ? sql.json(user.verification) : null},
        ${user.metrics ? sql.json(user.metrics) : null}
      )
      on conflict (id) do update set
        name = excluded.name,
        email = excluded.email,
        role = excluded.role,
        password = excluded.password,
        avatar_url = excluded.avatar_url,
        bio = excluded.bio,
        location = excluded.location,
        social_handles = excluded.social_handles,
        verification = excluded.verification,
        metrics = excluded.metrics
    `;
  }

  for (const idea of primaryEntrepreneurIdeas) {
    await sql`
      insert into ideas (
        id, owner_id, title, sector, problem, solution,
        market_opportunity, business_model, financial_projections,
        traction, location, media, status, target_raise, followers, likes
      ) values (
        ${idea.id},
        ${idea.ownerId},
        ${idea.title},
        ${idea.sector},
        ${idea.problem},
        ${idea.solution},
        ${idea.marketOpportunity},
        ${idea.businessModel},
        ${idea.financialProjections},
        ${idea.traction},
        ${idea.location},
        ${idea.media ? sql.json(idea.media) : null},
        ${idea.status},
        ${idea.targetRaise ?? null},
        ${idea.followers},
        ${idea.likes}
      )
      on conflict (id) do update set
        owner_id = excluded.owner_id,
        title = excluded.title,
        sector = excluded.sector,
        problem = excluded.problem,
        solution = excluded.solution,
        market_opportunity = excluded.market_opportunity,
        business_model = excluded.business_model,
        financial_projections = excluded.financial_projections,
        traction = excluded.traction,
        location = excluded.location,
        media = excluded.media,
        status = excluded.status,
        target_raise = excluded.target_raise,
        followers = excluded.followers,
        likes = excluded.likes
    `;
  }

  for (const investor of primaryInvestors) {
    await sql`
      insert into investor_profiles (
        id, user_id, ticket_size, sectors, geography, risk_appetite,
        traction_preference, watchlist
      ) values (
        ${investor.id},
        ${investor.userId},
        ${investor.ticketSize},
        ${investor.sectors},
        ${investor.geography},
        ${investor.riskAppetite},
        ${investor.tractionPreference},
        ${investor.watchlist}
      )
      on conflict (id) do update set
        user_id = excluded.user_id,
        ticket_size = excluded.ticket_size,
        sectors = excluded.sectors,
        geography = excluded.geography,
        risk_appetite = excluded.risk_appetite,
        traction_preference = excluded.traction_preference,
        watchlist = excluded.watchlist
    `;
  }

  for (const entry of socialFeed) {
    await sql`
      insert into feed_entries (
        id, user_id, message, timestamp, likes, comments
      ) values (
        ${entry.id},
        ${entry.userId},
        ${entry.message},
        ${new Date(entry.timestamp)},
        ${entry.likes},
        ${entry.comments}
      )
      on conflict (id) do update set
        user_id = excluded.user_id,
        message = excluded.message,
        timestamp = excluded.timestamp,
        likes = excluded.likes,
        comments = excluded.comments
    `;
  }

  console.log("Database seeded with sample Nafila Shop data.");
}

main().catch((error) => {
  console.error("Failed to seed database", error);
  process.exit(1);
});
