"use client";

import React from "react";
import { Organization } from "@/lib/types";

interface OrgSummaryStatsProps {
  orgs: Organization[];
}

export function OrgSummaryStats({ orgs }: OrgSummaryStatsProps) {
  const activeCount = orgs.filter((o) => o.subscriptionStatus === "active").length;
  const issueCount = orgs.filter(
    (o) =>
      o.subscriptionStatus === "cancelled" ||
      o.subscriptionStatus === "past_due" ||
      o.subscriptionStatus === "expired"
  ).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div className="p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs space-y-1">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          Total Tenants
        </span>
        <div className="text-2xl font-black text-foreground font-mono">{orgs.length}</div>
        <span className="text-[10px] text-emerald-600 font-semibold">Active SaaS Database</span>
      </div>

      <div className="p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs space-y-1">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          Active Paid
        </span>
        <div className="text-2xl font-black text-emerald-600 font-mono">{activeCount}</div>
        <span className="text-[10px] text-muted-foreground">Good standing</span>
      </div>

      <div className="p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs space-y-1">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          Suspended / Overdue
        </span>
        <div className="text-2xl font-black text-rose-600 font-mono">{issueCount}</div>
        <span className="text-[10px] text-rose-600 font-semibold">Action needed</span>
      </div>

      <div className="p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs space-y-1">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          Control Privileges
        </span>
        <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">
          Super Admin
        </div>
        <span className="text-[10px] text-purple-600 font-semibold">Root Access Active</span>
      </div>
    </div>
  );
}
