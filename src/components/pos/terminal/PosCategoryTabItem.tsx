import React from "react";

interface PosCategoryTabItemProps {
  id: string;
  name: string;
  count?: number;
  isActive: boolean;
  onSelect: (id: string) => void;
}

function getCategoryIcon(name: string, id: string): string {
  if (id === "all") return "🍽️";
  const lower = name.toLowerCase();
  if (lower.includes("salad")) return "🥗";
  if (lower.includes("burger")) return "🍔";
  if (lower.includes("pizza")) return "🍕";
  if (lower.includes("pasta")) return "🍝";
  if (lower.includes("drink") || lower.includes("beverage")) return "🍹";
  if (lower.includes("sweet") || lower.includes("dessert") || lower.includes("cake")) return "🍰";
  if (lower.includes("panjabi") || lower.includes("shirt") || lower.includes("men")) return "👔";
  if (lower.includes("sharee") || lower.includes("women") || lower.includes("salwar")) return "👗";
  if (lower.includes("trouser") || lower.includes("denim") || lower.includes("pant")) return "👖";
  if (lower.includes("shoe") || lower.includes("footwear") || lower.includes("leather")) return "👞";
  if (lower.includes("access") || lower.includes("perfume")) return "✨";
  return "🏷️";
}

export function PosCategoryTabItem({ id, name, count, isActive, onSelect }: PosCategoryTabItemProps) {
  const icon = getCategoryIcon(name, id);

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all duration-200 cursor-pointer ${
        isActive
          ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-500/30 scale-[1.02]"
          : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/90 dark:border-slate-800/90 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50/80 dark:hover:bg-slate-800/60 shadow-2xs"
      }`}
    >
      <span className="text-sm transition-transform group-hover:scale-110">{icon}</span>
      <span className="truncate max-w-[130px]">{name}</span>
      {typeof count === "number" && (
        <span
          className={`ml-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold transition-colors ${
            isActive
              ? "bg-white/20 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
