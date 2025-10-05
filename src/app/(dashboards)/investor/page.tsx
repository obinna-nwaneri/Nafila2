import { DashboardShell } from "@/components/dashboard-shell";
import { InvestorFilters } from "@/components/investor-filters";
import { IdeaHighlights } from "@/components/idea-highlights";
import { WatchlistBoard } from "@/components/watchlist-board";
import { primaryEntrepreneurIdeas } from "@/lib/sampleData";

export default function InvestorDashboard() {
  return (
    <DashboardShell
      title="Investor control room"
      description="Discover filtered deal flow, manage watchlists, and drive due diligence."
      tabs={[
        { name: "Overview", href: "/investor", active: true },
        { name: "Saved", href: "#watchlist" },
        { name: "Analytics", href: "#analytics" },
        { name: "Messages", href: "#messages" }
      ]}
      actions={<button className="rounded-full border border-brand/40 px-4 py-2 text-sm font-semibold text-brand hover:border-brand hover:bg-brand/10">Export pipeline</button>}
    >
      <div className="space-y-8">
        <InvestorFilters />
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold text-slate-900">Matching opportunities</h2>
          <p className="text-sm text-slate-500">Pre-filtered results based on your ticket size and preferences.</p>
          <div className="mt-6">
            <IdeaHighlights ideas={primaryEntrepreneurIdeas} />
          </div>
        </section>
        <div id="watchlist">
          <WatchlistBoard />
        </div>
      </div>
    </DashboardShell>
  );
}
