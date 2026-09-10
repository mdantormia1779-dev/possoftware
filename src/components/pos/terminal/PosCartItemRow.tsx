import React from "react";
import { Minus, Plus, X } from "lucide-react";
import { CartItem } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface PosCartItemRowProps {
  item: CartItem;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function PosCartItemRow({ item, onUpdateQty, onRemoveItem }: PosCartItemRowProps) {
  const lineTotal = item.quantity * item.unitPrice;

  return (
    <div className="group relative p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-slate-900 shadow-2xs hover:border-indigo-200 dark:hover:border-indigo-800 transition-all flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="relative h-11 w-11 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
          {item.product.imageUrl ? (
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-[10px] font-bold text-slate-400 font-mono">
              {item.product.sku.slice(0, 3)}
            </span>
          )}
          <span className="absolute bottom-0 right-0 px-1 py-0.2 rounded-tl-md bg-indigo-600 text-white text-[9px] font-bold font-mono">
            x{item.quantity}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h5 className="font-semibold text-slate-800 dark:text-slate-100 truncate text-xs leading-snug">
            {item.product.name}
          </h5>
          <span className="text-[11px] text-slate-400 font-mono">
            {formatCurrency(item.unitPrice)} / {item.product.unit}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700 shrink-0">
        <button
          type="button"
          onClick={() => onUpdateQty(item.product.id, -1)}
          className="h-6 w-6 rounded-md bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 text-xs shadow-2xs transition-colors"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="w-5 text-center font-bold text-slate-900 dark:text-white text-xs font-mono">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={() => onUpdateQty(item.product.id, 1)}
          className="h-6 w-6 rounded-md bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 text-xs shadow-2xs transition-colors"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      <div className="text-right shrink-0 min-w-[65px] flex items-center gap-2 justify-end">
        <span className="font-bold text-slate-900 dark:text-slate-100 block font-mono text-xs">
          {formatCurrency(lineTotal)}
        </span>
        <button
          type="button"
          onClick={() => onRemoveItem(item.product.id)}
          className="h-6 w-6 rounded-md text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center transition-colors"
          title="Remove item"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
