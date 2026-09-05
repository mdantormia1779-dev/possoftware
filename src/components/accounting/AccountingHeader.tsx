import React from "react";
import Link from "next/link";
import { BookOpen, FileText, Receipt } from "lucide-react";

interface AccountingHeaderProps {
  journalsCount: number;
}

export function AccountingHeader({ journalsCount }: AccountingHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
      <div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Accounting &amp; Financial Ledger</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Automated double-entry general ledger, liquid reserves, and real-time P&amp;L in BDT (৳)
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/app/accounting/reports"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-card border border-border/80 text-foreground hover:bg-muted shadow-subtle-xs transition-colors"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Financial Statements</span>
        </Link>
        <Link
          href="/app/accounting/journal"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/25 transition-transform active:scale-95"
        >
          <Receipt className="h-3.5 w-3.5" />
          <span>Auto Journals ({journalsCount})</span>
        </Link>
      </div>
    </div>
  );
}
