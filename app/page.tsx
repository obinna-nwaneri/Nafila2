import Link from "next/link";
import { Rocket, ShieldCheck, Users } from "lucide-react";
import { SpotlightCard } from "@/components/spotlight-card";
import { DataHighlights } from "@/components/data-highlights";
import { getHeroStats } from "@/lib/server/metrics";

export default async function HomePage() {
  const stats = await getHeroStats();

  return (
    <div className="space-y-16">
      <section className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-200">
            <ShieldCheck className="h-4 w-4" />
            Trusted Deal Room for Visionaries
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Where Entrepreneurs meet Investors to build the future of commerce
          </h1>
          <p className="max-w-xl text-lg text-slate-300">
            Nafila Shop is a modern deal-flow platform that empowers entrepreneurs to showcase their
            ideas, collaborate with investors, and build trust through transparency.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/register" className="rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white">
              Create free account
            </Link>
            <Link href="/ideas" className="rounded-md border border-slate-800 px-6 py-3 text-base font-semibold text-slate-200">
              Browse live pitches
            </Link>
          </div>
        </div>
        <SpotlightCard />
      </section>

      <DataHighlights stats={stats} />

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Structured Pitch Templates",
            icon: Rocket,
            description:
              "Submit comprehensive startup profiles with financial projections, traction metrics, and multimedia attachments.",
            href: "/ideas/create"
          },
          {
            title: "Investor Intelligence",
            icon: Users,
            description:
              "Filter opportunities by sector, stage, ticket size, and risk appetite. Build a personal watchlist of ventures.",
            href: "/investors"
          },
          {
            title: "Trust & Verification",
            icon: ShieldCheck,
            description:
              "KYC verification, document vaults, and community ratings provide confidence for every transaction.",
            href: "/trust-center"
          }
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-primary-500/60 hover:bg-slate-900"
          >
            <item.icon className="h-10 w-10 text-primary-400 transition group-hover:text-primary-300" />
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="text-sm leading-6 text-slate-400">{item.description}</p>
            <span className="text-sm font-medium text-primary-300">Explore &rarr;</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
