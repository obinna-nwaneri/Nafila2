import { getIdeas } from "@/lib/server/ideas";
import { Lightbulb, TrendingUp, Users } from "lucide-react";

export default async function EntrepreneurDashboard() {
  const ideas = await getIdeas();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-white">Entrepreneur Workspace</h1>
        <p className="text-sm text-slate-400">
          Manage your profile, pitches, and investor interactions from one console.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Ideas live", value: ideas.length, icon: Lightbulb },
          { label: "Average engagement", value: "68%", icon: Users },
          { label: "Month growth", value: "+24%", icon: TrendingUp }
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
        <h2 className="text-lg font-semibold text-white">Your ideas</h2>
        <div className="grid gap-4">
          {ideas.map((idea) => (
            <article key={idea.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">{idea.title}</h3>
                  <p className="text-sm text-slate-400">{idea.sector} • {idea.location}</p>
                </div>
                <span className="rounded-full border border-slate-800 px-3 py-1 text-xs text-slate-400">
                  Updated {new Date(idea.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300">{idea.solution}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
                <span>Market: {idea.market}</span>
                <span>Financials: {idea.financials}</span>
                <span>Traction: {idea.traction}</span>
              </div>
            </article>
          ))}
          {!ideas.length && <p className="text-sm text-slate-400">No ideas yet. Share your first venture to start attracting investors.</p>}
        </div>
      </section>
    </div>
  );
}
