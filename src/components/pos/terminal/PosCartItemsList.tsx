import React from "react";
import { ShoppingBag, PlusCircle } from "lucide-react";
import { CartItem } from "@/types";
import { PosCartItemRow } from "./PosCartItemRow";

interface PosCartItemsListProps {
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function PosCartItemsList({ cart, onUpdateQty, onRemoveItem }: PosCartItemsListProps) {
  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-3">
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <ShoppingBag className="h-7 w-7 text-indigo-400" />
        </div>
        <div className="space-y-1 max-w-[220px]">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Order is empty</p>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Click any product card from the left catalog or scan a barcode to begin order.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-3.5 space-y-2">
      {cart.map((item) => (
        <PosCartItemRow
          key={item.product.id}
          item={item}
          onUpdateQty={onUpdateQty}
          onRemoveItem={onRemoveItem}
        />
      ))}

      <button
        type="button"
        className="w-full py-2 px-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-indigo-400 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-all bg-slate-50/40 dark:bg-slate-900/40"
      >
        <PlusCircle className="h-3.5 w-3.5" />
        <span>Add Special Note or Custom Item</span>
      </button>
    </div>
  );
}
