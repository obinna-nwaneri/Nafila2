import { InvestorProfile, users } from "@/lib/sampleData";

interface InvestorSnapshotProps {
  investors: InvestorProfile[];
}

export function InvestorSnapshot({ investors }: InvestorSnapshotProps) {
  return (
    <div className="space-y-4">
      {investors.map((investor) => {
        const user = users.find((candidate) => candidate.id === investor.userId);
        const avatar = user?.avatarUrl ?? `https://avatar.vercel.sh/${encodeURIComponent(user?.name ?? "investor")}`;
        return (
          <div key={investor.id} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <img
              src={avatar}
              alt={user?.name}
              className="h-12 w-12 rounded-full border border-white object-cover shadow"
            />
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{user?.name ?? "Investor"}</p>
                <p className="text-xs text-slate-500">Ticket size: {investor.ticketSize}</p>
              </div>
              <div className="grid gap-2 text-xs text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">Sectors:</span> {investor.sectors.join(", ")}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Geographies:</span> {investor.geography.join(", ")}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Risk:</span> {investor.riskAppetite.toUpperCase()}
                </p>
                <p className="text-slate-500">{investor.tractionPreference}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
