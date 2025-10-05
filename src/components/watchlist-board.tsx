import { primaryEntrepreneurIdeas, primaryInvestors } from "@/lib/sampleData";

export function WatchlistBoard() {
  const watchlistIds = new Set(primaryInvestors.flatMap((investor) => investor.watchlist));
  const watchlistIdeas = primaryEntrepreneurIdeas.filter((idea) => watchlistIds.has(idea.id));

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Investor watchlist</h2>
          <p className="text-sm text-slate-500">Monitor traction and follow-ups for saved startups.</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {watchlistIdeas.map((idea) => (
          <div key={idea.id} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">{idea.title}</h3>
              <span className="text-xs font-semibold uppercase text-brand">{idea.status}</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">{idea.problem}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>{idea.followers} followers</span>
              <span>{idea.likes} likes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
