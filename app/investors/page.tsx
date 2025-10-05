import { getInvestors } from "@/lib/server/investors";
import { Building2, Globe2, MapPin, Wallet } from "lucide-react";

export default async function InvestorsPage() {
  const investors = await getInvestors();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-white">Investor network</h1>
        <p className="max-w-2xl text-sm text-slate-400">
          Search vetted investors by sector expertise, preferred ticket size, geography, and risk appetite to discover the
          perfect partner for your venture.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {investors.map((investor) => (
          <article key={investor.id} className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">{investor.fullName}</h2>
                <p className="text-xs text-slate-400">
                  {investor.riskAppetite} risk • Ticket size ${""}
                  {investor.ticketSizeMin.toLocaleString()}
                  {" - $"}
                  {investor.ticketSizeMax.toLocaleString()}
                </p>
              </div>
              <span className="rounded-full border border-primary-500/40 bg-primary-500/10 px-3 py-1 text-xs text-primary-200">
                Active
              </span>
            </div>
            <p className="text-sm text-slate-300">{investor.bio}</p>
            <div className="grid gap-3 text-xs text-slate-400 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>Sectors: {investor.sectors.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span>
                  Tickets: ${""}
                  {investor.ticketSizeMin.toLocaleString()}
                  {" - $"}
                  {investor.ticketSizeMax.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4" />
                <span>Geography: {investor.geography.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Contact: {investor.contactEmail}</span>
              </div>
            </div>
            <div className="flex gap-3 text-xs text-primary-300">
              {investor.website && (
                <a href={investor.website} className="hover:text-primary-200">
                  Website
                </a>
              )}
              {investor.linkedIn && (
                <a href={investor.linkedIn} className="hover:text-primary-200">
                  LinkedIn
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
