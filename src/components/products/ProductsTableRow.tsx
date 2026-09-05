import React from "react";
import { Edit2 } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface ProductsTableRowProps {
  product: Product;
}

export function ProductsTableRow({ product: p }: ProductsTableRowProps) {
  const margin =
    p.sellingPrice > 0
      ? (((p.sellingPrice - p.purchasePrice) / p.sellingPrice) * 100).toFixed(1)
      : 0;
  const isLow = p.totalStock <= p.minStockAlert;

  return (
    <tr className="hover:bg-muted/30 transition-colors h-[56px]">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {p.imageUrl && (
            <img
              src={p.imageUrl}
              alt={p.name}
              className="h-9 w-9 rounded-lg object-cover border border-border shrink-0"
            />
          )}
          <div>
            <div className="font-semibold text-foreground text-xs sm:text-sm">
              {p.name}
            </div>
            {p.nameBn && (
              <div className="text-[10px] text-muted-foreground">{p.nameBn}</div>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-3 font-mono text-muted-foreground">
        <div className="font-bold text-foreground">{p.sku}</div>
        <div className="text-[10px] text-muted-foreground font-mono">{p.barcode}</div>
      </td>
      <td className="px-4 py-3 text-muted-foreground">{p.categoryName || "General"}</td>
      <td className="px-4 py-3 text-muted-foreground font-mono">
        {formatCurrency(p.purchasePrice)}
      </td>
      <td className="px-4 py-3 font-bold text-foreground font-mono">
        {formatCurrency(p.sellingPrice)}
      </td>
      <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-bold font-mono">
        {margin}%
      </td>
      <td className="px-4 py-3">
        <span
          className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold font-mono ${
            isLow
              ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
              : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
          }`}
        >
          {p.totalStock} {p.unit}
        </span>
      </td>
      <td className="px-4 py-3 text-muted-foreground font-mono text-[11px]">
        {p.minStockAlert} {p.unit}
      </td>
      <td className="px-4 py-3 text-right space-x-1">
        <button
          className="p-1.5 rounded-lg bg-muted/60 hover:bg-muted text-foreground transition-colors"
          title="Edit Product"
        >
          <Edit2 className="h-3.5 w-3.5" />
        </button>
      </td>
    </tr>
  );
}
