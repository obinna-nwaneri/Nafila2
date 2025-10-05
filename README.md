# Nafila Shop Platform

A Next.js 14 template for the Nafila Shop marketplace that connects entrepreneurs and investors with modern trust and
engagement tooling. The project ships with Tailwind CSS styling, role-based dashboards, Neon Postgres integration, and
sample data.

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Copy the environment file and fill in secrets as needed

   ```bash
   cp .env.example .env
   ```

3. (Optional) Run the seed script to provision core tables and sample users/ideas

   ```bash
   npm run seed
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`.

## Default accounts

The seed script creates ready-to-use users:

| Role          | Email                         | Password          |
| ------------- | ----------------------------- | ----------------- |
| Entrepreneur  | founder@nafila.shop           | entrepreneur123   |
| Investor      | investor@auroracapital.com    | investor123       |
| Admin         | admin@nafila.shop             | admin123          |

## Features

- **Authentication** powered by NextAuth with email/password and Google OAuth providers.
- **Role-based dashboards** for entrepreneurs, investors, and administrators.
- **Structured idea submissions** covering problem, solution, market opportunity, business model, financials, and traction.
- **Investor discovery** with ticket size, sector focus, and geography filters.
- **Trust center** outlining verification tiers, document vault, and community ratings.
- **Community feed** showcasing engagement features like likes and comments.
- **API routes & server actions** backed by Neon Postgres for persistence.

## Project structure

```
app/         # App Router routes, layouts, dashboards, and API handlers
components/  # Reusable UI components
lib/         # Server utilities and typed data helpers
scripts/     # Database seed utilities
```

## Database schema

The `scripts/seed.ts` script provisions the following tables:

- `users`
- `entrepreneur_profiles`
- `investor_profiles`
- `ideas`
- `deals`

Adjust or extend the schema to fit production requirements.

## Deployment

1. Ensure the Neon database connection string is configured via `DATABASE_URL`.
2. Provide OAuth credentials for Google sign-in.
3. Run `npm run build` followed by `npm start` on your hosting provider.

## License

MIT
