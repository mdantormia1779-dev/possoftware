import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Sale } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface OwnerRecentTransactionsProps {
  sales: Sale[];
  onReceiptClick: (sale: Sale) => void;
}

export function OwnerRecentTransactions({
  sales,
  onReceiptClick,
}: OwnerRecentTransactionsProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-subtle-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            Recent Transactions Across Network
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Latest invoices generated across all terminal counters
          </p>
        </div>
        <Link
          href="/app/sales"
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
        >
          View All Sales <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider h-11">
              <th className="px-4 py-3">Invoice No</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Branch</th>
              <th className="px-4 py-3">Cashier</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {sales.slice(0, 5).map((sale) => (
              <tr key={sale.id} className="hover:bg-muted/30 transition-colors h-[52px]">
                <td className="px-4 py-3 font-mono font-bold text-primary">
                  {sale.invoiceNumber}
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-foreground">
                    {sale.customerName || "Walk-in Customer"}
                  </span>
                  {sale.customerPhone && (
                    <span className="text-[10px] text-muted-foreground block font-mono">
                      {sale.customerPhone}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{sale.branchName}</td>
                <td className="px-4 py-3 text-muted-foreground">{sale.cashierName}</td>
                <td className="px-4 py-3 font-bold text-foreground font-mono">
                  {formatCurrency(sale.grandTotal)}
                </td>
                <td className="px-4 py-3 uppercase font-medium text-[11px] text-muted-foreground">
                  {sale.paymentMethod}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={sale.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => onReceiptClick(sale)}
                    className="text-[11px]"
                  >
                    Receipt
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
