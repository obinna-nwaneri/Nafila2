import Link from "next/link";
import { getIdeas } from "@/lib/server/ideas";
import { BadgeCheck, Globe2, MapPin, PlayCircle } from "lucide-react";

export default async function IdeasPage() {
  const ideas = await getIdeas();

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-white">Startup & Business Ideas</h1>
        <p className="max-w-2xl text-sm text-slate-400">
          Discover curated ventures with transparent market insights, financial projections, and traction data.
          Filter by sector, location, or growth stage to find opportunities aligned with your investment thesis.
        </p>
        <div className="flex gap-3">
          <Link href="/ideas/create" className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white">
            Submit new idea
          </Link>
          <Link href="/dashboard" className="rounded-md border border-slate-800 px-4 py-2 text-sm font-semibold text-slate-200">
            Go to dashboard
          </Link>
        </div>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {ideas.map((idea) => (
          <article key={idea.id} className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">{idea.title}</h2>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 px-2 py-1">
                    <Globe2 className="h-3 w-3" /> {idea.sector}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 px-2 py-1">
                    <MapPin className="h-3 w-3" /> {idea.location}
                  </span>
                  {idea.isVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-emerald-200">
                      <BadgeCheck className="h-3 w-3" /> Verified
                    </span>
                  )}
                </div>
              </div>
              {idea.pitchUrl && (
                <a href={idea.pitchUrl} target="_blank" className="inline-flex items-center gap-2 text-sm text-primary-300">
                  <PlayCircle className="h-5 w-5" /> Pitch
                </a>
              )}
            </div>
            <dl className="space-y-3 text-sm text-slate-300">
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Problem</dt>
                <dd>{idea.problem}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Solution</dt>
                <dd>{idea.solution}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Market Opportunity</dt>
                <dd>{idea.market}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Business Model</dt>
                <dd>{idea.businessModel}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Financial Projections</dt>
                <dd>{idea.financials}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Traction & Validation</dt>
                <dd>{idea.traction}</dd>
              </div>
            </dl>
            <footer className="flex items-center justify-between text-xs text-slate-400">
              <div>
                <p className="font-medium text-slate-200">{idea.ownerName}</p>
                <p>Updated {new Date(idea.updatedAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-3">
                {idea.instagram && (
                  <a href={idea.instagram} className="hover:text-primary-300">
                    Instagram
                  </a>
                )}
                {idea.otherLinks && (
                  <a href={idea.otherLinks} className="hover:text-primary-300">
                    More
                  </a>
                )}
              </div>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
