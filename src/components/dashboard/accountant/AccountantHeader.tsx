import React from "react";
import Link from "next/link";
import { BookOpen, ShieldCheck, Receipt, BarChart3 } from "lucide-react";

export function AccountantHeader() {
  return (
    <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent border border-blue-200/80 dark:border-blue-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-700 dark:text-blue-300">
            <BookOpen className="h-4 w-4" />
          </span>
          <h2 className="text-base sm:text-lg font-black text-foreground">
            General Ledger &amp; Fiscal Compliance Control
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> NBR Compliant
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Double-entry bookkeeping, NBR 5% Mushak 6.3 tracking &amp; automated ledger postings
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/app/accounting/journal"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border/80 hover:border-blue-400 text-xs font-bold text-foreground transition-all shadow-subtle-xs active:scale-95"
        >
          <Receipt className="h-3.5 w-3.5 text-blue-600" />
          <span>New Journal</span>
        </Link>

        <Link
          href="/app/accounting/reports"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all active:scale-95"
        >
          <BarChart3 className="h-3.5 w-3.5" />
          <span>P&amp;L Statements</span>
        </Link>
      </div>
    </div>
  );
}
