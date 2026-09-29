"use client";

import React from "react";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryFilterProps): React.JSX.Element {
  return (
    <div
      role="group"
      aria-label="Filter articles by category"
      className="flex flex-wrap justify-center gap-2.5 sm:gap-3"
    >
      {categories.map((cat) => {
        const isActive = cat.toLowerCase() === activeCategory.toLowerCase();
        return (
          <button
            key={cat}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelectCategory(cat)}
            className={[
              "rounded-full border px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              isActive
                ? "border-[#005bd4] bg-[#005bd4] text-white shadow-md shadow-blue-500/20"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
            ].join(" ")}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}