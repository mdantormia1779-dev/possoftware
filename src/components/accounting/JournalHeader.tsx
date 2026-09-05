import React from "react";
import Link from "next/link";
import { Receipt, ArrowLeft, CheckCircle2 } from "lucide-react";

export function JournalHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Link href="/app/accounting" className="p-2 rounded-lg border border-border hover:bg-muted">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Receipt className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>General Journal Entries</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Automated double-entry debit &amp; credit postings generated directly from POS, Purchases &amp; Payroll
          </p>
        </div>
      </div>

      <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-2 text-xs font-bold">
        <CheckCircle2 className="h-4 w-4" />
        <span>All Ledgers Strictly Balanced (Debit = Credit)</span>
      </div>
    </div>
  );
}
