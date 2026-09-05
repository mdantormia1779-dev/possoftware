import React from "react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface InventoryMatrixRowProps {
  product: Product;
}

export function InventoryMatrixRow({ product: p }: InventoryMatrixRowProps) {
  const b1 = p.branchStocks?.["br-1"] ?? 0;
  const b2 = p.branchStocks?.["br-2"] ?? 0;
  const b3 = p.branchStocks?.["br-3"] ?? 0;
  const isLow = p.totalStock <= p.minStockAlert;

  return (
    <tr className="hover:bg-muted/30 transition-colors h-[52px]">
      <td className="px-4 py-3 font-semibold text-foreground">{p.name}</td>
      <td className="px-4 py-3 font-mono text-muted-foreground font-medium">
        {p.sku}
      </td>
      <td className="px-4 py-3 font-medium font-mono text-[11px]">
        {b1} {p.unit}
      </td>
      <td className="px-4 py-3 font-medium font-mono text-[11px]">
        {b2} {p.unit}
      </td>
      <td className="px-4 py-3 font-medium font-mono text-[11px]">
        {b3} {p.unit}
      </td>
      <td className="px-4 py-3 font-bold text-foreground font-mono">
        {p.totalStock} {p.unit}
      </td>
      <td className="px-4 py-3 font-bold text-foreground font-mono">
        {formatCurrency(p.totalStock * p.purchasePrice)}
      </td>
      <td className="px-4 py-3 text-right">
        <span
          className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono ${
            isLow
              ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
              : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
          }`}
        >
          {isLow ? "Low Stock" : "In Stock"}
        </span>
      </td>
    </tr>
  );
}
