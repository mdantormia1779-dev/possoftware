import React from "react";
import Link from "next/link";
import { ShieldCheck, Plus } from "lucide-react";

export function SuperAdminHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
      <div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <span>SaaS Platform Control Center</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Platform-wide tenant metrics, Monthly Recurring Revenue (MRR), and system infrastructure
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/super-admin/organizations"
          className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-md shadow-purple-500/25 flex items-center gap-1.5 transition-all active:scale-95"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Manage &amp; Add Companies</span>
        </Link>

        <div className="px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/60 text-purple-900 dark:text-purple-300 text-xs font-black shadow-subtle-xs flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Online</span>
        </div>
      </div>
    </div>
  );
}
