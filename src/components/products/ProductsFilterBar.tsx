import React from "react";
import { Search } from "lucide-react";
import { Category } from "@/types";

interface ProductsFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCat: string;
  onSelectCat: (id: string) => void;
  categories: Category[];
  totalCount: number;
}

export function ProductsFilterBar({
  searchQuery,
  onSearchChange,
  selectedCat,
  onSelectCat,
  categories,
  totalCount,
}: ProductsFilterBarProps) {
  return (
    <div className="p-3 sm:p-4 rounded-xl border border-border bg-card shadow-subtle-xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
      <div className="relative sm:col-span-2">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search by product name, SKU, or scan barcode..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-10 pl-10 pr-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>

      <div>
        <select
          value={selectedCat}
          onChange={(e) => onSelectCat(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs font-medium cursor-pointer"
        >
          <option value="all">All Categories ({totalCount})</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
