import { primaryEntrepreneurIdeas, socialFeed, users } from "@/lib/sampleData";
import { TrendingUp, Users, BriefcaseBusiness, MessageCircle } from "lucide-react";

export function AnalyticsSummary() {
  const metrics = [
    {
      label: "Active entrepreneurs",
      value: users.filter((user) => user.role === "entrepreneur").length,
      change: "+18%",
      icon: Users
    },
    {
      label: "Investors onboarded",
      value: users.filter((user) => user.role === "investor").length,
      change: "+12%",
      icon: BriefcaseBusiness
    },
    {
      label: "Ideas tracked",
      value: primaryEntrepreneurIdeas.length,
      change: "+24%",
      icon: TrendingUp
    },
    {
      label: "Engagement actions",
      value: socialFeed.reduce((acc, item) => acc + item.likes + item.comments, 0),
      change: "+32%",
      icon: MessageCircle
    }
  ];

  return (
    <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
          <metric.icon className="h-6 w-6 text-brand" />
          <div>
            <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{metric.label}</p>
          </div>
          <p className="text-xs text-emerald-600">{metric.change} vs last month</p>
        </div>
      ))}
    </div>
  );
}
