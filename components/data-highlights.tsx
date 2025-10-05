import { format } from "date-fns";

export type HeroStats = {
  entrepreneurs: number;
  investors: number;
  verifiedStartups: number;
  dealsClosed: number;
  lastUpdated: Date;
};

export function DataHighlights({ stats }: { stats: HeroStats }) {
  const cards = [
    {
      title: "Entrepreneurs onboarded",
      value: stats.entrepreneurs.toLocaleString(),
      caption: "+324 this month"
    },
    {
      title: "Investors active",
      value: stats.investors.toLocaleString(),
      caption: "42 family offices"
    },
    {
      title: "Verified startups",
      value: stats.verifiedStartups.toLocaleString(),
      caption: "KYC + CAC + Tax IDs"
    },
    {
      title: "Deals closed",
      value: stats.dealsClosed.toLocaleString(),
      caption: "Tracked via smart contracts"
    }
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/40 px-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Marketplace momentum</h2>
          <p className="text-sm text-slate-400">
            Updated {format(stats.lastUpdated, "MMM d, yyyy")}.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-inner shadow-slate-950/40"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">{card.title}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
            <p className="mt-2 text-sm text-slate-400">{card.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
