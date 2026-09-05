import React from "react";
import { Branch } from "@/types";

interface ReportsFilterBarProps {
  selectedReportType: string;
  setSelectedReportType: (val: string) => void;
  selectedBranch: string;
  setSelectedBranch: (val: string) => void;
  branches: Branch[];
}

export function ReportsFilterBar({
  selectedReportType,
  setSelectedReportType,
  selectedBranch,
  setSelectedBranch,
  branches,
}: ReportsFilterBarProps) {
  return (
    <div className="no-print p-3.5 sm:p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
      <div>
        <label className="font-bold text-foreground block mb-1">
          Report Category
        </label>
        <select
          value={selectedReportType}
          onChange={(e) => setSelectedReportType(e.target.value)}
          className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        >
          <option value="sales">Sales &amp; Revenue Trajectory</option>
          <option value="inventory">Inventory Movement &amp; Shrinkage</option>
          <option value="hr">Staff Commissions &amp; Payroll</option>
          <option value="branches">Branch Comparative Growth</option>
        </select>
      </div>

      <div>
        <label className="font-bold text-foreground block mb-1">
          Outlet Scope
        </label>
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        >
          <option value="all">All Outlets Consolidated</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-bold text-foreground block mb-1">
          Time Horizon
        </label>
        <select className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
          <option>Last 6 Months (Sep 2025 - Feb 2026)</option>
          <option>Current Quarter (Q1 2026)</option>
          <option>Fiscal Year 2025-2026</option>
        </select>
      </div>
    </div>
  );
}
