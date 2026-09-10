import React from "react";
import { Plus } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface PosProductCardProps {
  product: Product;
  branchId: string;
  cartQuantity?: number;
  onAddToCart: (product: Product) => void;
}

export function PosProductCard({ product, branchId, cartQuantity = 0, onAddToCart }: PosProductCardProps) {
  const branchStock = product.branchStocks?.[branchId] ?? product.totalStock;
  const isLow = branchStock <= product.minStockAlert;
  const regularPrice = Math.round(product.sellingPrice * 1.25);

  return (
    <div
      onClick={() => onAddToCart(product)}
      className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-xs hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between select-none active:scale-[0.98]"
    >
      <div className="space-y-2.5">
        <div className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-800/80">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="text-slate-400 font-bold text-xs tracking-wider">{product.sku.slice(0, 4)}</div>
          )}

          {cartQuantity > 0 && (
            <span className="absolute top-2 left-2 h-6 min-w-[24px] px-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex items-center justify-center text-[11px] font-bold font-mono shadow-md shadow-indigo-600/40 ring-2 ring-white dark:ring-slate-900 animate-in zoom-in-75">
              {cartQuantity}
            </span>
          )}

          <span
            className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs ${
              isLow
                ? "bg-rose-50 text-rose-600 border border-rose-200/80 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-900"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-900"
            }`}
          >
            {branchStock} {product.unit}
          </span>
        </div>

        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {product.name}
          </h4>
          <span className="text-[11px] text-slate-400 font-mono mt-0.5 block truncate">
            {product.categoryName || `SKU: ${product.sku}`}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono">
            {formatCurrency(product.sellingPrice)}
          </div>
          <div className="text-[10px] text-slate-400 line-through font-mono">
            {formatCurrency(regularPrice)}
          </div>
        </div>

        <button
          type="button"
          className="h-7 w-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:text-white transition-all shadow-xs"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
