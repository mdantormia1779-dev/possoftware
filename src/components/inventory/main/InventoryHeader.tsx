import React from "react";
import Link from "next/link";
import { Boxes, Truck, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface InventoryHeaderProps {
  onAdjustClick: () => void;
}

export function InventoryHeader({ onAdjustClick }: InventoryHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
      <div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <Boxes className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Stock &amp; Warehouse Control</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Multi-branch live stock levels, threshold alerts, and inventory ledger adjustments
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/app/inventory/transfers"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shadow-subtle-xs hover:bg-indigo-100 transition-colors"
        >
          <Truck className="h-3.5 w-3.5" />
          <span>Stock Transfers</span>
        </Link>
        <Button
          variant="primary"
          size="sm"
          onClick={onAdjustClick}
          className="shadow-sm shadow-indigo-500/25"
        >
          <Plus className="h-4 w-4 mr-1" /> Adjust Stock Qty
        </Button>
      </div>
    </div>
  );
}
