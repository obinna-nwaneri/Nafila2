import { getIdeas } from "@/lib/server/ideas";
import { ShieldCheck, UserCheck, Users } from "lucide-react";

export default async function AdminDashboard() {
  const ideas = await getIdeas();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-white">Platform Administration</h1>
        <p className="text-sm text-slate-400">
          Monitor user activity, verification pipelines, and marketplace health metrics.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Users", value: 2680, icon: Users },
          { label: "Verified entities", value: 712, icon: ShieldCheck },
          { label: "Pending reviews", value: 54, icon: UserCheck }
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
        <h2 className="text-lg font-semibold text-white">Idea moderation queue</h2>
        <div className="grid gap-4">
          {ideas.map((idea) => (
            <article key={idea.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{idea.title}</h3>
                  <p className="text-xs text-slate-400">{idea.sector} • {idea.location}</p>
                </div>
                <span className="text-xs text-slate-500">{idea.isVerified ? "Verified" : "Awaiting review"}</span>
              </div>
              <p className="mt-3 text-sm text-slate-300">{idea.problem}</p>
              <div className="mt-4 flex gap-3 text-xs text-slate-400">
                <button className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                  Approve
                </button>
                <button className="rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs text-rose-200">
                  Flag for review
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
