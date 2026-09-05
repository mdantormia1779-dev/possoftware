"use client";

import React from "react";
import { Search } from "lucide-react";

interface OrgFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  planFilter: string;
  onPlanChange: (val: string) => void;
  statusFilter: string;
  onStatusChange: (val: string) => void;
}

export function OrgFilterBar({
  searchQuery,
  onSearchChange,
  planFilter,
  onPlanChange,
  statusFilter,
  onStatusChange,
}: OrgFilterBarProps) {
  return (
    <div className="p-4 rounded-3xl border border-border/80 bg-card shadow-subtle-xs flex flex-col md:flex-row items-center gap-3">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search company name, industry, email or phone..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-10 pl-10 pr-3 rounded-xl border border-border/80 bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <select
          value={planFilter}
          onChange={(e) => onPlanChange(e.target.value)}
          className="h-10 px-3 rounded-xl border border-border/80 bg-background text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          <option value="all">All Plans</option>
          <option value="starter">Starter Plan</option>
          <option value="business">Business Plan</option>
          <option value="enterprise">Enterprise Plan</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="h-10 px-3 rounded-xl border border-border/80 bg-background text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="cancelled">Suspended</option>
          <option value="expired">Expired</option>
          <option value="past_due">Past Due</option>
          <option value="trial">Trial</option>
        </select>
      </div>
    </div>
  );
}
