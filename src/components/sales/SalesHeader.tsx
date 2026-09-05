import React from "react";
import { Receipt, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

interface SalesHeaderProps {
  totalSalesRevenue: number;
}

export function SalesHeader({ totalSalesRevenue }: SalesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
      <div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <Receipt className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Sales Invoices &amp; Ledger</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Audit trail of all POS transactions with 80mm reprint &amp; refund controls
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="shadow-subtle-xs">
          <Download className="h-3.5 w-3.5 mr-1.5" /> Export CSV
        </Button>
        <div className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-black font-mono text-xs border border-indigo-200/60 dark:border-indigo-800/60 shadow-subtle-xs">
          Revenue: {formatCurrency(totalSalesRevenue)}
        </div>
      </div>
    </div>
  );
}
