import React from "react";
import { Plus } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface PosProductCardProps {
  product: Product;
  branchId: string;
  onAddToCart: (product: Product) => void;
}

export function PosProductCard({ product, branchId, onAddToCart }: PosProductCardProps) {
  const branchStock = product.branchStocks?.[branchId] ?? product.totalStock;
  const isLow = branchStock <= product.minStockAlert;

  return (
    <div
      onClick={() => onAddToCart(product)}
      className="group relative rounded-[12px] border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-3 shadow-subtle-xs hover:shadow-subtle-sm hover:border-[#CBD5E1] dark:hover:border-[#334155] transition-all duration-150 cursor-pointer flex flex-col justify-between select-none active:scale-[0.98]"
    >
      <div className="space-y-2">
        <div className="relative h-24 sm:h-28 w-full rounded-lg overflow-hidden bg-[#F1F5F9] dark:bg-[#1E293B] flex items-center justify-center border border-[#E2E8F0]/60 dark:border-[#1E293B]">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="text-[#94A3B8] font-bold text-[11px]">{product.sku.slice(0, 4)}</div>
          )}
          <span
            className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-semibold shadow-subtle-xs ${
              isLow
                ? "bg-[#FEF2F2] text-[#B91C1C] border border-rose-200/80"
                : "bg-[#ECFDF5] text-[#047857] border border-emerald-200/80"
            }`}
          >
            {branchStock} {product.unit}
          </span>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] line-clamp-2 leading-snug group-hover:text-[#4F46E5] dark:group-hover:text-[#818CF8] transition-colors">
            {product.name}
          </h4>
          <span className="text-[11px] text-[#94A3B8] font-mono mt-0.5 block truncate">
            SKU: {product.sku}
          </span>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between">
        <span className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] font-mono">
          {formatCurrency(product.sellingPrice)}
        </span>
        <button
          type="button"
          className="h-7 w-7 rounded-lg bg-[#EEF2FF] dark:bg-indigo-950/60 text-[#4F46E5] dark:text-[#818CF8] flex items-center justify-center font-bold text-xs group-hover:bg-[#4F46E5] group-hover:text-white transition-all shadow-subtle-xs"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
