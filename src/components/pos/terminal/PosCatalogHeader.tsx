import React from "react";
import { Search, List, LayoutGrid } from "lucide-react";
import { BarcodeScannerSimulator } from "@/components/pos/BarcodeScannerSimulator";
import { Category } from "@/types";

interface PosCatalogHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  categories: Category[];
  totalProductsCount: number;
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
  viewMode,
  onToggleViewMode,
}: PosCatalogHeaderProps) {
  return (
    <div className="p-3.5 sm:p-4 border-b border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] space-y-3 shadow-subtle-xs">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
        <div className="sm:col-span-7">
          <BarcodeScannerSimulator />
        </div>

        <div className="relative sm:col-span-4">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#94A3B8] pointer-events-none" />
          <input
            type="text"
            placeholder="Filter name, color..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-9.5 pr-3 rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] text-xs sm:text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#4F46E5] shadow-subtle-xs transition-all"
          />
        </div>

        <div className="sm:col-span-1 hidden sm:flex justify-end">
          <button
            onClick={onToggleViewMode}
            className="p-2.5 rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors shadow-subtle-xs"
            title={viewMode === "grid" ? "Switch to Compact View" : "Switch to Grid View"}
          >
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => onSelectCategory("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all ${
            selectedCategory === "all"
              ? "bg-[#4F46E5] text-white font-semibold shadow-subtle-xs"
              : "bg-white dark:bg-[#111827] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] border border-[#E2E8F0] dark:border-[#1E293B]"
          }`}
        >
          All Products ({totalProductsCount})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all ${
              selectedCategory === cat.id
                ? "bg-[#4F46E5] text-white font-semibold shadow-subtle-xs"
                : "bg-white dark:bg-[#111827] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] border border-[#E2E8F0] dark:border-[#1E293B]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
