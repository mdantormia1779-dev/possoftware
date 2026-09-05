import React from "react";
import Link from "next/link";
import { Layers, Receipt, CreditCard, FileText, ArrowUpRight } from "lucide-react";

interface AccountingQuickLinksProps {
  accountsCount: number;
}

export function AccountingQuickLinks({ accountsCount }: AccountingQuickLinksProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <Link
        href="/app/accounting/chart-of-accounts"
        className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all shadow-subtle-xs hover:shadow-subtle-sm flex flex-col justify-between group"
      >
        <div>
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit mb-3">
            <Layers className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-foreground">
            Chart of Accounts
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            {accountsCount} structured general ledger accounts
          </p>
        </div>
        <div className="mt-4 flex items-center text-xs font-semibold text-primary group-hover:underline">
          <span>Manage accounts</span>{" "}
          <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>

      <Link
        href="/app/accounting/journal"
        className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all shadow-subtle-xs hover:shadow-subtle-sm flex flex-col justify-between group"
      >
        <div>
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit mb-3">
            <Receipt className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-foreground">
            Auto-Journal Entries
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Audit double-entry debit &amp; credit postings
          </p>
        </div>
        <div className="mt-4 flex items-center text-xs font-semibold text-primary group-hover:underline">
          <span>View journals</span>{" "}
          <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>

      <Link
        href="/app/accounting/banks"
        className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all shadow-subtle-xs hover:shadow-subtle-sm flex flex-col justify-between group"
      >
        <div>
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit mb-3">
            <CreditCard className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-foreground">
            Cash &amp; Bank Accounts
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Reconciliation with bKash, Nagad &amp; City Bank
          </p>
        </div>
        <div className="mt-4 flex items-center text-xs font-semibold text-primary group-hover:underline">
          <span>Reconcile balances</span>{" "}
          <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>

      <Link
        href="/app/accounting/reports"
        className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all shadow-subtle-xs hover:shadow-subtle-sm flex flex-col justify-between group"
      >
        <div>
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit mb-3">
            <FileText className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-foreground">
            Financial Reports
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            P&amp;L, Balance Sheet, Cash Flow &amp; Mushak-6.3
          </p>
        </div>
        <div className="mt-4 flex items-center text-xs font-semibold text-primary group-hover:underline">
          <span>Generate statements</span>{" "}
          <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>
    </div>
  );
}
