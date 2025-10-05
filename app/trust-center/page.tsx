import { BadgeCheck, FileCheck, Shield, ShieldCheck, UserCheck } from "lucide-react";

export default function TrustCenterPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-white">Trust & Verification</h1>
        <p className="max-w-2xl text-sm text-slate-400">
          We combine identity checks, business verification, and community reputation to create a trusted marketplace.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Identity verification",
            description: "KYC and KYB checks via trusted providers, including biometric verification and document validation.",
            icon: UserCheck
          },
          {
            title: "Document vault",
            description: "Secure storage for CAC/Corporate docs, tax IDs, compliance certificates, and signed term sheets.",
            icon: FileCheck
          },
          {
            title: "Reputation scores",
            description: "Ratings based on transparency, responsiveness, and community engagement for every profile.",
            icon: BadgeCheck
          }
        ].map((item) => (
          <div key={item.title} className="space-y-3 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <item.icon className="h-8 w-8 text-primary-300" />
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <p className="text-sm text-slate-400">{item.description}</p>
          </div>
        ))}
      </section>
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">Verification tiers</h2>
            <p className="text-sm text-slate-400">
              Complete tiered verification to unlock more dealflow visibility and access to premium analytics.
            </p>
          </div>
          <Shield className="h-16 w-16 text-primary-400" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              tier: "Starter",
              requirements: "Email + phone verification",
              perks: "Follow & comment"
            },
            {
              tier: "Verified",
              requirements: "Government ID + CAC documents",
              perks: "Publish ideas, access investor filters"
            },
            {
              tier: "Elite",
              requirements: "Enhanced due diligence + reference checks",
              perks: "Priority listing, concierge intros, analytics"
            }
          ].map((tier) => (
            <div key={tier.tier} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-lg font-semibold text-white">{tier.tier}</h3>
              <p className="mt-2 text-xs text-slate-400">Requirements: {tier.requirements}</p>
              <p className="mt-2 text-xs text-slate-400">Perks: {tier.perks}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-emerald-100">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6" />
          <h2 className="text-lg font-semibold">Community-led ratings</h2>
        </div>
        <p className="mt-3 text-sm">
          Ratings highlight credibility, transparency, and responsiveness. Entrepreneurs with high ratings receive a
          verified badge and are featured on the home feed.
        </p>
      </section>
    </div>
  );
}
