import React from "react";
import { StockTransfer } from "@/types";

interface TransfersStatsCardsProps {
  transfers: StockTransfer[];
}

export function TransfersStatsCards({ transfers }: TransfersStatsCardsProps) {
  const pendingCount = transfers.filter((t) => t.status === "pending").length;
  const inTransitCount = transfers.filter((t) => t.status === "in_transit").length;
  const receivedCount = transfers.filter((t) => t.status === "received").length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div className="p-4 rounded-xl border border-border bg-card shadow-subtle-xs text-xs">
        <span className="text-muted-foreground font-semibold">Pending Approval</span>
        <div className="text-xl font-bold text-foreground mt-1">
          {pendingCount} Orders
        </div>
      </div>
      <div className="p-4 rounded-xl border border-border bg-card shadow-subtle-xs text-xs">
        <span className="text-muted-foreground font-semibold">In Transit (Dispatched)</span>
        <div className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">
          {inTransitCount} Shipments
        </div>
      </div>
      <div className="p-4 rounded-xl border border-border bg-card shadow-subtle-xs text-xs">
        <span className="text-muted-foreground font-semibold">Completed (Received)</span>
        <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
          {receivedCount} Shipments
        </div>
      </div>
      <div className="p-4 rounded-xl border border-border bg-card shadow-subtle-xs text-xs">
        <span className="text-muted-foreground font-semibold">Total Transferred</span>
        <div className="text-xl font-bold text-foreground mt-1">
          {transfers.length} Transfers
        </div>
      </div>
    </div>
  );
}
