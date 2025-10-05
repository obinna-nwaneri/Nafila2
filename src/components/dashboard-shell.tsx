import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

interface DashboardShellProps {
  title: string;
  description: string;
  tabs: { name: string; href: string; active?: boolean }[];
  actions?: ReactNode;
  children: ReactNode;
}

export function DashboardShell({ title, description, tabs, actions, children }: DashboardShellProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
          {actions}
        </div>
        <nav className="mt-6 flex flex-wrap gap-2 text-sm font-medium">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={clsx(
                "rounded-full px-4 py-2",
                tab.active ? "bg-brand text-white shadow-card" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </section>
      {children}
    </div>
  );
}
