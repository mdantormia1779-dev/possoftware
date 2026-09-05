import React from "react";
import { Plus } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface PosProductCompactRowProps {
  product: Product;
  branchId: string;
  onAddToCart: (product: Product) => void;
}

export function PosProductCompactRow({
  product,
  branchId,
  onAddToCart,
}: PosProductCompactRowProps) {
  const branchStock = product.branchStocks?.[branchId] ?? product.totalStock;

  return (
    <div
      onClick={() => onAddToCart(product)}
      className="p-2.5 rounded-xl border border-border/70 bg-card hover:bg-muted/40 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex items-center justify-between cursor-pointer group shadow-subtle-xs"
    >
      <div className="flex items-center gap-3 truncate">
        <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs shrink-0">
          {product.sku.slice(0, 3)}
        </div>
        <div className="truncate">
          <h4 className="text-xs font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
            {product.name}
          </h4>
          <span className="text-[10px] text-muted-foreground font-mono">
            SKU: {product.sku} | Stock: {branchStock} {product.unit}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs font-black text-foreground font-mono">
          {formatCurrency(product.sellingPrice)}
        </span>
        <div className="h-6 w-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <Plus className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}
