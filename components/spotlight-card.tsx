import { Building2, CheckCircle, Handshake, LineChart } from "lucide-react";

export function SpotlightCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl">
      <div className="absolute -top-24 -right-20 h-56 w-56 rounded-full bg-primary-500/20 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 -left-12 h-64 w-64 rounded-full bg-primary-400/10 blur-3xl" aria-hidden />
      <div className="relative space-y-6">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary-300" />
          <div>
            <p className="text-xs uppercase tracking-widest text-primary-200">Active round</p>
            <h3 className="text-2xl font-semibold text-white">Nafila Marketplace 2.0</h3>
          </div>
        </div>
        <p className="text-sm leading-6 text-slate-300">
          Omnichannel retail infrastructure for African SMEs bringing inventory financing, social commerce
          and fulfillment into a single trusted operating system.
        </p>
        <dl className="grid gap-4 text-sm text-slate-200 md:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Sector</dt>
            <dd className="font-semibold text-white">Retail Infrastructure</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Funding ask</dt>
            <dd className="font-semibold text-white">$1.5M seed extension</dd>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-primary-500/30 bg-primary-500/10 p-3">
            <Handshake className="h-5 w-5 text-primary-300" />
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Lead investor</p>
              <p className="text-sm font-semibold text-white">Aurora Capital</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
            <LineChart className="h-5 w-5 text-emerald-300" />
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Projected ROI</p>
              <p className="text-sm font-semibold text-white">3.6x in 36 months</p>
            </div>
          </div>
        </dl>
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <CheckCircle className="h-5 w-5 text-emerald-400" />
          Verified by Nafila Trust Network
        </div>
      </div>
    </div>
  );
}
