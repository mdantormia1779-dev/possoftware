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
      className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
    >
      <div className="flex items-center gap-3 truncate">
        <div className="h-9 w-9 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs shrink-0 border border-slate-100 dark:border-slate-800">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            product.sku.slice(0, 3)
          )}
        </div>
        <div className="truncate">
          <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
            {product.name}
          </h4>
          <span className="text-[10px] text-slate-400 font-mono">
            SKU: {product.sku} | Stock: {branchStock} {product.unit}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
          {formatCurrency(product.sellingPrice)}
        </span>
        <div className="h-7 w-7 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <Plus className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
