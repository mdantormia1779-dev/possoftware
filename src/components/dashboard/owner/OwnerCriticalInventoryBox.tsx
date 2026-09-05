import React from "react";
import { Product } from "@/lib/types";
import { AlertTriangle } from "lucide-react";

interface OwnerCriticalInventoryBoxProps {
  lowStockProducts: Product[];
}

export function OwnerCriticalInventoryBox({
  lowStockProducts,
}: OwnerCriticalInventoryBoxProps) {
  return (
    <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 space-y-2.5 shadow-subtle-xs">
      <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
        <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
        <span>Low Stock Threshold Alert ({lowStockProducts.length} SKUs)</span>
      </div>
      <div className="space-y-1.5 text-xs">
        {lowStockProducts.slice(0, 3).map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-2 rounded-lg bg-card border border-border shadow-subtle-xs"
          >
            <div className="truncate pr-2">
              <span className="font-medium text-foreground text-xs">{p.name}</span>
              <span className="text-[10px] text-muted-foreground font-mono block">
                SKU: {p.sku}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-destructive/10 text-destructive shrink-0 font-mono">
              {p.totalStock} {p.unit} left
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
