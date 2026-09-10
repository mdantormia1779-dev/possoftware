import React from "react";
import { SearchX } from "lucide-react";
import { Product } from "@/types";
import { PosProductCard } from "./PosProductCard";
import { PosProductCompactRow } from "./PosProductCompactRow";

interface PosProductListProps {
  products: Product[];
  branchId: string;
  cartQuantities?: Record<string, number>;
  viewMode: "grid" | "compact";
  onAddToCart: (product: Product) => void;
}

export function PosProductList({
  products,
  branchId,
  cartQuantities = {},
  viewMode,
  onAddToCart,
}: PosProductListProps) {
  if (products.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-24 text-slate-400 text-xs sm:text-sm space-y-3">
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
          <SearchX className="h-7 w-7 text-slate-400" />
        </div>
        <div className="text-center space-y-1">
          <p className="font-semibold text-slate-700 dark:text-slate-300">No products found</p>
          <p className="text-[11px] text-slate-400">Try changing your search query or selected category.</p>
        </div>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3.5 pb-8">
        {products.map((product) => (
          <PosProductCard
            key={product.id}
            product={product}
            branchId={branchId}
            cartQuantity={cartQuantities[product.id] || 0}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2 pb-8">
      {products.map((product) => (
        <PosProductCompactRow
          key={product.id}
          product={product}
          branchId={branchId}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
