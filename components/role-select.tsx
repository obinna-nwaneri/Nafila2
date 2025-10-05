"use client";

import { useState } from "react";
import { Briefcase, LineChart, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  {
    id: "ENTREPRENEUR" as const,
    title: "Entrepreneur",
    description: "Showcase ideas, pitch investors, manage traction.",
    icon: Briefcase
  },
  {
    id: "INVESTOR" as const,
    title: "Investor",
    description: "Discover startups, monitor KPIs, track portfolios.",
    icon: LineChart
  },
  {
    id: "USER" as const,
    title: "Community",
    description: "Follow ventures, join discussions, give feedback.",
    icon: UsersRound
  }
];

export function RoleSelect() {
  const [active, setActive] = useState<(typeof roles)[number]["id"]>("ENTREPRENEUR");

  return (
    <div className="space-y-4">
      <input type="hidden" name="role" value={active} />
      <p className="text-sm font-medium text-slate-300">Select a role</p>
      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setActive(role.id)}
            className={cn(
              "flex h-full flex-col items-start gap-3 rounded-xl border p-4 text-left transition",
              active === role.id ? "border-primary-500 bg-primary-500/10" : "border-slate-800 bg-slate-900/60"
            )}
          >
            <role.icon className="h-6 w-6 text-primary-400" />
            <div>
              <p className="text-base font-semibold text-white">{role.title}</p>
              <p className="text-sm text-slate-400">{role.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
