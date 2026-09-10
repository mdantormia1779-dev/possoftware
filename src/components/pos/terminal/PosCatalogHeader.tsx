import React from "react";
import { Search, List, LayoutGrid, X } from "lucide-react";
import { BarcodeScannerSimulator } from "@/components/pos/BarcodeScannerSimulator";
import { PosCategoryTabItem } from "./PosCategoryTabItem";
import { Category } from "@/types";

interface PosCatalogHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  categories: Category[];
  totalProductsCount: number;
  filteredCount: number;
  viewMode: "grid" | "compact";
  onToggleViewMode: () => void;
}

export function PosCatalogHeader({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  totalProductsCount,
  filteredCount,
  viewMode,
  onToggleViewMode,
}: PosCatalogHeaderProps) {
  return (
    <div className="p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm space-y-3 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-6 lg:col-span-7">
          <BarcodeScannerSimulator />
        </div>

        <div className="relative sm:col-span-5 lg:col-span-4">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search favorite item, SKU..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-9.5 pr-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="sm:col-span-1 hidden sm:flex justify-end">
          <button
            onClick={onToggleViewMode}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
            title={viewMode === "grid" ? "Switch to Compact View" : "Switch to Grid View"}
          >
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-0.5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-1">
          <PosCategoryTabItem
            id="all"
            name="All Items"
            count={totalProductsCount}
            isActive={selectedCategory === "all"}
            onSelect={onSelectCategory}
          />
          {categories.map((cat) => (
            <PosCategoryTabItem
              key={cat.id}
              id={cat.id}
              name={cat.name}
              count={cat.itemCount}
              isActive={selectedCategory === cat.id}
              onSelect={onSelectCategory}
            />
          ))}
        </div>

        <span className="text-[11px] font-medium text-slate-400 shrink-0 hidden lg:inline-block">
          Showing <strong className="text-slate-700 dark:text-slate-200 font-mono">{filteredCount}</strong> items
        </span>
      </div>
    </div>
  );
}
