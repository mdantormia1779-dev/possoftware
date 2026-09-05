import React from "react";
import Link from "next/link";
import { Sale } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface BranchRecentSalesProps {
  branchSales: Sale[];
  onReceiptClick: (sale: Sale) => void;
}

export function BranchRecentSales({
  branchSales,
  onReceiptClick,
}: BranchRecentSalesProps) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            Branch Sales Activity
          </h3>
          <p className="text-xs text-muted-foreground">Latest invoices rung at this branch</p>
        </div>
        <Link
          href="/app/sales"
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          All Sales
        </Link>
      </div>

      <div className="space-y-2 text-xs">
        {branchSales.slice(0, 4).map((sale) => (
          <div
            key={sale.id}
            className="flex items-center justify-between p-2.5 rounded-xl bg-muted/20 border border-border/60"
          >
            <div>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {sale.invoiceNumber}
              </span>
              <span className="text-foreground ml-2 font-medium">
                {sale.customerName || "Walk-in"}
              </span>
              <span className="text-[10px] text-muted-foreground block">
                Cashier: {sale.cashierName} • {sale.paymentMethod.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-foreground font-mono text-xs">
                {formatCurrency(sale.grandTotal)}
              </span>
              <Button
                size="xs"
                variant="outline"
                onClick={() => onReceiptClick(sale)}
                className="text-[10px]"
              >
                Receipt
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
