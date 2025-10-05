import Link from "next/link";
import { Lightbulb, Rocket, ShieldCheck, Users2 } from "lucide-react";
import { primaryEntrepreneurIdeas, primaryInvestors, socialFeed } from "@/lib/sampleData";
import { IdeaHighlights } from "@/components/idea-highlights";
import { InvestorSnapshot } from "@/components/investor-snapshot";
import { SocialFeed } from "@/components/social-feed";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="grid gap-8 rounded-3xl bg-white p-10 shadow-card lg:grid-cols-2">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
            Built for Entrepreneurs & Investors
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Launch, fund, and grow Africa&apos;s most ambitious businesses.
          </h1>
          <p className="text-base text-slate-600">
            Nafila Shop is a deal-flow operating system combining venture matchmaking, trust-building,
            and community engagement. Explore validated ideas, meet aligned investors, and build
            transparent relationships through a single collaborative workspace.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/entrepreneur"
              className="inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-dark"
            >
              For entrepreneurs
            </Link>
            <Link
              href="/investor"
              className="inline-flex items-center rounded-full border border-brand/30 px-5 py-2.5 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand/10"
            >
              For investors
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-6 text-sm text-slate-500 sm:grid-cols-3">
            <div>
              <dt className="font-semibold text-slate-900">Verified founders</dt>
              <dd>120+</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Active investors</dt>
              <dd>65 venture partners</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Deals tracked</dt>
              <dd>$7.5M pipeline</dd>
            </div>
          </dl>
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-slate-100 bg-slate-900 p-6 text-white shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">Live Watchlist</p>
            <IdeaHighlights ideas={primaryEntrepreneurIdeas.slice(0, 2)} variant="dark" />
          </div>
          <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Top investors this week</p>
            <InvestorSnapshot investors={primaryInvestors.slice(0, 3)} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-10 shadow-card lg:grid-cols-4">
        {[{
          title: "Idea intelligence",
          description: "Structured canvases for problem, solution, business model, traction, and financials.",
          icon: Lightbulb
        },
        {
          title: "Deal collaboration",
          description: "Watchlists, follow, and investor portfolio dashboards bring transparency to deal-making.",
          icon: Users2
        },
        {
          title: "Launch faster",
          description: "End-to-end support for pitch videos, data rooms, CAC documents, and traction proofs.",
          icon: Rocket
        },
        {
          title: "Earn trust",
          description: "KYC, business verification, and community ratings provide proof of credibility.",
          icon: ShieldCheck
        }].map((feature) => (
          <div key={feature.title} className="space-y-3 rounded-2xl border border-slate-100 p-6">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
              <feature.icon className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
            <p className="text-sm text-slate-600">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-slate-900">Fresh ideas to explore</h2>
            <Link href="/entrepreneur" className="text-sm font-semibold text-brand">
              View all
            </Link>
          </div>
          <IdeaHighlights ideas={primaryEntrepreneurIdeas} />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-slate-900">Community feed</h2>
            <Link href="/feed" className="text-sm font-semibold text-brand">
              Open feed
            </Link>
          </div>
          <SocialFeed entries={socialFeed} />
        </div>
      </section>
    </div>
  );
}
