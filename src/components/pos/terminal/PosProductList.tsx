import React from "react";
import { AlertCircle } from "lucide-react";
import { Product } from "@/types";
import { PosProductCard } from "./PosProductCard";
import { PosProductCompactRow } from "./PosProductCompactRow";

interface PosProductListProps {
  products: Product[];
  branchId: string;
  viewMode: "grid" | "compact";
  onAddToCart: (product: Product) => void;
}

export function PosProductList({
  products,
  branchId,
  viewMode,
  onAddToCart,
}: PosProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-[#94A3B8] text-xs sm:text-sm space-y-2">
        <AlertCircle className="h-8 w-8 mx-auto text-[#94A3B8] opacity-50" />
        <p>No products match your search or filter.</p>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
        {products.map((product) => (
          <PosProductCard
            key={product.id}
            product={product}
            branchId={branchId}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
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
