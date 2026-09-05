import React from "react";
import { PosCatalogHeader } from "./PosCatalogHeader";
import { PosProductList } from "./PosProductList";
import { Category, Product } from "@/types";

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
  onAddToCart,
}: PosLeftCatalogPanelProps) {
  return (
    <div className="flex-1 flex flex-col border-r border-border/80 overflow-hidden bg-muted/15">
      <PosCatalogHeader
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        categories={categories}
        totalProductsCount={totalProductsCount}
        viewMode={viewMode}
        onToggleViewMode={onToggleViewMode}
      />

      <div className="flex-1 overflow-y-auto p-3.5 sm:p-4">
        <PosProductList
          products={filteredProducts}
          branchId={branchId}
          viewMode={viewMode}
          onAddToCart={onAddToCart}
        />
      </div>
    </div>
  );
}
