import Link from "next/link";
import { BriefcaseBusiness, Building, ShieldCheck, Users } from "lucide-react";
import { getIdeas } from "@/lib/server/ideas";

export default async function DashboardPage() {
  const ideas = await getIdeas();

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
          <p className="text-sm text-slate-400">Personalized workspace for your role on Nafila Shop.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/dashboard/entrepreneur" className="rounded-md border border-slate-800 px-3 py-2">
            Entrepreneur view
          </Link>
          <Link href="/dashboard/investor" className="rounded-md border border-slate-800 px-3 py-2">
            Investor view
          </Link>
          <Link href="/dashboard/admin" className="rounded-md border border-slate-800 px-3 py-2">
            Admin view
          </Link>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Entrepreneur Console",
            icon: BriefcaseBusiness,
            description: "Manage your startup profile, publish pitches, and monitor engagement metrics.",
            href: "/dashboard/entrepreneur"
          },
          {
            title: "Investor Dealroom",
            icon: Building,
            description: "Track watchlists, analyze KPIs, and collaborate with founders in real time.",
            href: "/dashboard/investor"
          },
          {
            title: "Trust & Compliance",
            icon: ShieldCheck,
            description: "Monitor verifications, KYC/KYB workflows, and platform-wide moderation reports.",
            href: "/dashboard/admin"
          }
        ].map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-primary-500/60"
          >
            <card.icon className="h-8 w-8 text-primary-300" />
            <h2 className="text-xl font-semibold text-white">{card.title}</h2>
            <p className="text-sm text-slate-400">{card.description}</p>
            <span className="text-sm font-medium text-primary-300">Open workspace &rarr;</span>
          </Link>
        ))}
      </section>

      <section className="space-y-4">
        <header className="flex items-center gap-3">
          <Users className="h-5 w-5 text-primary-300" />
          <h2 className="text-lg font-semibold text-white">Recent pitches</h2>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {ideas.slice(0, 4).map((idea) => (
            <article key={idea.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between text-sm">
                <p className="font-medium text-white">{idea.title}</p>
                <span className="text-xs text-slate-400">{idea.sector}</span>
              </div>
              <p className="mt-2 text-xs text-slate-400">{idea.problem}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>{idea.location}</span>
                <span>Updated {new Date(idea.updatedAt).toLocaleDateString()}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
