import React from "react";
import { formatCurrency } from "@/lib/utils";

interface PurchasesStatsCardsProps {
  totalPurchases: number;
  totalDueToSuppliers: number;
  pendingDeliveryCount: number;
}

export function PurchasesStatsCards({
  totalPurchases,
  totalDueToSuppliers,
  pendingDeliveryCount,
}: PurchasesStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-5 rounded-2xl border border-border bg-card shadow-subtle-xs text-xs space-y-1">
        <span className="text-muted-foreground font-semibold">Total Procurement Volume</span>
        <div className="text-2xl font-black font-mono text-foreground">{formatCurrency(totalPurchases)}</div>
        <span className="text-[11px] text-muted-foreground block">Lifetime purchase orders</span>
      </div>

      <div className="p-5 rounded-2xl border border-border bg-card shadow-subtle-xs text-xs space-y-1">
        <span className="text-muted-foreground font-semibold">Supplier Payables (Ledger 2010)</span>
        <div className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400">
          {formatCurrency(totalDueToSuppliers)}
        </div>
        <span className="text-[11px] text-muted-foreground block">Payable within credit terms</span>
      </div>

      <div className="p-5 rounded-2xl border border-border bg-card shadow-subtle-xs text-xs space-y-1">
        <span className="text-muted-foreground font-semibold">Pending Delivery POs</span>
        <div className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
          {pendingDeliveryCount} Orders
        </div>
        <span className="text-[11px] text-muted-foreground block">Awaiting warehouse receipt</span>
      </div>
    </div>
  );
}
