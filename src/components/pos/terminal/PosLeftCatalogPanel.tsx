import React, { useMemo } from "react";
import { PosCatalogHeader } from "./PosCatalogHeader";
import { PosProductList } from "./PosProductList";
import { Category, Product, CartItem } from "@/types";

interface PosLeftCatalogPanelProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  categories: Category[];
  totalProductsCount: number;
  viewMode: "grid" | "compact";
  onToggleViewMode: () => void;
  filteredProducts: Product[];
  branchId: string;
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
}

export function PosLeftCatalogPanel({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  totalProductsCount,
  viewMode,
  onToggleViewMode,
  filteredProducts,
  branchId,
  cart,
  onAddToCart,
}: PosLeftCatalogPanelProps) {
  const cartQuantities = useMemo(() => {
    return cart.reduce<Record<string, number>>((acc, item) => {
      acc[item.product.id] = (acc[item.product.id] || 0) + item.quantity;
      return acc;
    }, {});
  }, [cart]);

  return (
    <div className="flex-1 flex flex-col border-r border-slate-200/80 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-950/40">
      <PosCatalogHeader
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        categories={categories}
        totalProductsCount={totalProductsCount}
        filteredCount={filteredProducts.length}
        viewMode={viewMode}
        onToggleViewMode={onToggleViewMode}
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        <PosProductList
          products={filteredProducts}
          branchId={branchId}
          cartQuantities={cartQuantities}
          viewMode={viewMode}
          onAddToCart={onAddToCart}
        />
      </div>
    </div>
  );
}
