import React from "react";
import { Receipt, PauseCircle, Trash2 } from "lucide-react";

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
    <div className="p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-xs">
          <Receipt className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              Order Details
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono">
              {totalItems} items
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            ID: #{Math.abs(1000 + (totalItems * 37) % 8999)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {heldCount > 0 && (
          <button
            type="button"
            onClick={onOpenHeld}
            className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 flex items-center gap-1.5 shadow-2xs hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
          >
            <PauseCircle className="h-3.5 w-3.5" />
            <span>Held ({heldCount})</span>
          </button>
        )}
        {hasItems && (
          <button
            type="button"
            onClick={onClearCart}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Reset Cart"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
