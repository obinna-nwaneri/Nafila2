# Nafila Shop Platform

A responsive Next.js application template for Nafila Shop that connects entrepreneurs and investors with trust and community at the core.

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Configure environment variables. Duplicate `.env.example` and rename to `.env.local`, then update values.

```bash
cp .env.example .env.local
```

3. Seed the database with sample data (optional but recommended)

```bash
npm run seed
```

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Environment Variables

```
DATABASE_URL=postgresql://neondb_owner:npg_ZMgvT4APVa9C@ep-icy-fire-adel044n-pooler.c-2.us-east-1.aws.neon.tech/nafila3?sslmode=require&channel_binding=require
```
Sample seeded accounts

Amina Yusuf – entrepreneur (email amina@nafila.africa, password Nafila@2024)

Kwame Mensah – investor (email kwame.mensah@panthera.vc, password InvestSmart!2024)

Nafila Admin – administrator (email admin@nafila.africa, password AdminSecure#2024)

## Features

- Role-based dashboards for entrepreneurs, investors, and admins.
- Structured idea submission canvas covering problem, solution, market, traction, and financials.
- Investor filter controls and watchlist summaries.
- Verification centre for KYC and business document tracking.
- Community feed with likes and comments and sample engagement metrics.
- Tailwind CSS design system with reusable cards, tables, and forms.

## Data & Integrations

- Sample users, investors, and ideas are stored in `src/lib/sampleData.ts`.
- Run `npm run seed` to push the sample data (including user passwords) into Neon Postgres.
- Server actions in `app/actions.ts` ready to connect with Neon Postgres.
- Authentication UI stubbed for email/password and Google sign-in via NextAuth.

## Next Steps

- Wire up database reads/writes by replacing the mock data with Neon-backed queries.
- Configure NextAuth providers for credentials and Google OAuth.
- Implement CRUD APIs, messaging, and notifications as needed.
- Connect identity verification providers for automated KYC checks.
