import { DashboardShell } from "@/components/dashboard-shell";
import { AnalyticsSummary } from "@/components/analytics-summary";
import { UserDirectory } from "@/components/user-directory";
import { VerificationBadges } from "@/components/verification-badges";

export default function AdminDashboard() {
  return (
    <DashboardShell
      title="Admin intelligence"
      description="Monitor onboarding, compliance, and engagement metrics across the Nafila ecosystem."
      tabs={[
        { name: "Overview", href: "/admin", active: true },
        { name: "Users", href: "#users" },
        { name: "Verification", href: "#verification" },
        { name: "Reports", href: "#reports" }
      ]}
      actions={<button className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-card">Generate report</button>}
    >
      <div className="space-y-8">
        <AnalyticsSummary />
        <div id="verification">
          <VerificationBadges />
        </div>
        <div id="users">
          <UserDirectory />
        </div>
      </div>
    </DashboardShell>
  );
}
