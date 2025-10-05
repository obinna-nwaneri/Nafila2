import { DashboardShell } from "@/components/dashboard-shell";
import { IdeaForm } from "@/components/idea-form";
import { IdeaTable } from "@/components/idea-table";

export default function EntrepreneurDashboard() {
  return (
    <DashboardShell
      title="Entrepreneur workspace"
      description="Manage startup ideas, upload proof points, and monitor investor engagement."
      tabs={[
        { name: "Overview", href: "/entrepreneur", active: true },
        { name: "Ideas", href: "#ideas" },
        { name: "Documents", href: "#documents" },
        { name: "Messages", href: "#messages" }
      ]}
      actions={<button className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-card">New pitch</button>}
    >
      <section className="grid gap-8 lg:grid-cols-[1.3fr,1fr]">
        <div id="ideas" className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">Idea portfolio</h2>
          <IdeaTable />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="text-lg font-semibold text-slate-900">Submit new idea</h2>
          <p className="text-sm text-slate-500">
            Capture the problem, solution, traction, and projections in a standardised canvas.
          </p>
          <div className="mt-6">
            <IdeaForm />
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
