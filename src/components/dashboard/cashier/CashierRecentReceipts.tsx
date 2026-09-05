import React from "react";
import Link from "next/link";
import { ArrowRight, Receipt, Printer } from "lucide-react";
import { Sale } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface CashierRecentReceiptsProps {
  branchSales: Sale[];
  onReprintReceipt: (sale: Sale) => void;
}

export function CashierRecentReceipts({
  branchSales,
  onReprintReceipt,
}: CashierRecentReceiptsProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-subtle-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            Recent Counter Invoices &amp; Instant Reprint
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Reprint 80mm thermal receipts or review transactions
          </p>
        </div>
        <Link
          href="/app/sales"
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
        >
          <span>All Counter Sales</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-2 text-xs">
        {branchSales.slice(0, 5).map((sale) => (
          <div
            key={sale.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border hover:bg-muted/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                <Receipt className="h-4 w-4" />
              </div>
              <div>
                <div className="font-mono font-bold text-foreground">{sale.invoiceNumber}</div>
                <div className="text-[10px] text-muted-foreground">
                  {sale.customerName || "Walk-in Customer"} • {sale.paymentMethod.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-foreground text-sm">
                {formatCurrency(sale.grandTotal)}
              </span>
              <Button
                size="xs"
                variant="outline"
                onClick={() => onReprintReceipt(sale)}
                className="flex items-center gap-1 text-[11px] font-medium"
              >
                <Printer className="h-3.5 w-3.5 text-primary" />
                <span>Reprint</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
