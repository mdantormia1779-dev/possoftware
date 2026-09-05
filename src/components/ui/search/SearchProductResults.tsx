import React from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types";

interface SearchProductResultsProps {
  products: Product[];
  onSelect: () => void;
}

export function SearchProductResults({ products, onSelect }: SearchProductResultsProps) {
  if (products.length === 0) return null;

  return (
    <div>
      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5 px-1">
        <Package className="h-3.5 w-3.5" /> Products ({products.length})
      </div>
      <div className="space-y-1.5">
        {products.map((p) => (
          <Link
            key={p.id}
            href="/app/products"
            onClick={onSelect}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all group"
          >
            <div className="flex items-center gap-3 truncate">
              <div className="h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs shrink-0 border border-indigo-200/40 dark:border-indigo-800/40">
                {p.sku.slice(0, 3)}
              </div>
              <div className="truncate">
                <div className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                  {p.name}
                </div>
                <div className="text-[11px] text-muted-foreground font-mono">
                  SKU: {p.sku} | Barcode: {p.barcode} | Stock: {p.totalStock} {p.unit}
                </div>
              </div>
            </div>
            <div className="text-right shrink-0 pl-2">
              <span className="text-xs sm:text-sm font-bold text-foreground block font-mono">
                {formatCurrency(p.sellingPrice)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
