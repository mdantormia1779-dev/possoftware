import React from "react";
import { ShoppingCart, PauseCircle, Trash2 } from "lucide-react";

interface PosCartHeaderProps {
  totalItems: number;
  heldCount: number;
  hasItems: boolean;
  onOpenHeld: () => void;
  onClearCart: () => void;
}

export function PosCartHeader({
  totalItems,
  heldCount,
  hasItems,
  onOpenHeld,
  onClearCart,
}: PosCartHeaderProps) {
  return (
    <div className="p-3.5 sm:p-4 border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC]/70 dark:bg-[#0B1120]/40 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-[#EEF2FF] dark:bg-indigo-950/60 text-[#4F46E5] dark:text-[#818CF8]">
          <ShoppingCart className="h-4 w-4" />
        </div>
        <h3 className="font-semibold text-xs sm:text-sm text-[#0F172A] dark:text-[#F8FAFC]">
          Current Order
        </h3>
        <span className="px-2 py-0.2 rounded-md text-[10px] font-bold bg-[#EEF2FF] text-[#4F46E5] dark:bg-indigo-950 dark:text-[#818CF8] font-mono">
          {totalItems}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {heldCount > 0 && (
          <button
            type="button"
            onClick={onOpenHeld}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FFFBEB] text-[#B45309] dark:bg-amber-950/40 dark:text-[#FBBF24] border border-amber-200/80 dark:border-amber-800/60 flex items-center gap-1 shadow-subtle-xs"
          >
            <PauseCircle className="h-3.5 w-3.5" />
            <span>Held ({heldCount})</span>
          </button>
        )}
        {hasItems && (
          <button
            type="button"
            onClick={onClearCart}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-rose-950/40 transition-colors"
            title="Clear Cart"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
