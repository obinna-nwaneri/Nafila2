import { getIdeas } from "@/lib/server/ideas";
import { Building2, BookmarkCheck, Filter, Wallet } from "lucide-react";

export default async function InvestorDashboard() {
  const ideas = await getIdeas();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-white">Investor Dealroom</h1>
        <p className="text-sm text-slate-400">Discover, evaluate, and monitor opportunities tailored to your thesis.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Watchlisted", value: 12, icon: BookmarkCheck },
          { label: "Capital deployed", value: "$2.7M", icon: Wallet },
          { label: "Filters active", value: 5, icon: Filter }
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <stat.icon className="h-8 w-8 text-primary-300" />
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">{stat.label}</p>
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Opportunities</h2>
          <button className="flex items-center gap-2 border border-slate-800 bg-transparent px-4 py-2 text-sm">
            <Filter className="h-4 w-4" /> Refine search
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {ideas.map((idea) => (
            <article key={idea.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{idea.title}</h3>
                  <p className="text-xs text-slate-400">{idea.sector} • {idea.location}</p>
                </div>
                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                  ROI 3.2x
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300">{idea.solution}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                <span>Market: {idea.market}</span>
                <span>Financials: {idea.financials}</span>
                <span>Traction: {idea.traction}</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Updated {new Date(idea.updatedAt).toLocaleDateString()}</span>
                <button className="rounded-md border border-slate-700 px-3 py-1 text-xs text-slate-200">
                  Add to watchlist
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-primary-300" />
          <div>
            <h3 className="text-lg font-semibold text-white">Portfolio overview</h3>
            <p className="text-sm text-slate-400">Track stage distribution, risk exposure, and upcoming founder check-ins.</p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase text-slate-400">Seed</p>
            <p className="text-2xl font-semibold text-white">40%</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase text-slate-400">Series A</p>
            <p className="text-2xl font-semibold text-white">35%</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase text-slate-400">Growth</p>
            <p className="text-2xl font-semibold text-white">25%</p>
          </div>
        </div>
      </section>
    </div>
  );
}
