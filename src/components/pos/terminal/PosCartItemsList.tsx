import React from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { CartItem } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface PosCartItemsListProps {
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function PosCartItemsList({
  cart,
  onUpdateQty,
  onRemoveItem,
}: PosCartItemsListProps) {
  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center text-[#94A3B8] space-y-3">
        <div className="p-4 rounded-xl bg-[#F1F5F9] dark:bg-[#1E293B]/60 border border-[#E2E8F0] dark:border-[#1E293B] shadow-subtle-xs">
          <ShoppingCart className="h-6 w-6 text-[#94A3B8]" />
        </div>
        <div className="space-y-1 max-w-[210px]">
          <p className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC]">Cart is empty</p>
          <p className="text-[11px] text-[#94A3B8] leading-relaxed">
            Scan a barcode or click any product card on the left to add items.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
      {cart.map((item) => (
        <div
          key={item.product.id}
          className="p-3 rounded-[10px] border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] shadow-subtle-xs flex items-center justify-between gap-2.5 text-xs"
        >
          <div className="min-w-0 flex-1">
            <h5 className="font-semibold text-[#0F172A] dark:text-[#F8FAFC] truncate text-xs">
              {item.product.name}
            </h5>
            <span className="text-[11px] text-[#94A3B8] font-mono">
              {formatCurrency(item.unitPrice)} / {item.product.unit}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-[#F1F5F9] dark:bg-[#1E293B] p-0.5 rounded-lg border border-[#E2E8F0] dark:border-[#1E293B]">
            <button
              type="button"
              onClick={() => onUpdateQty(item.product.id, -1)}
              className="h-6 w-6 rounded-md bg-white dark:bg-[#111827] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] flex items-center justify-center font-bold text-[#0F172A] dark:text-[#F8FAFC] text-xs shadow-2xs transition-colors"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center font-semibold text-[#0F172A] dark:text-[#F8FAFC] text-xs font-mono">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQty(item.product.id, 1)}
              className="h-6 w-6 rounded-md bg-white dark:bg-[#111827] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] flex items-center justify-center font-bold text-[#0F172A] dark:text-[#F8FAFC] text-xs shadow-2xs transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <div className="text-right shrink-0 min-w-[70px]">
            <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC] block font-mono text-xs">
              {formatCurrency(item.quantity * item.unitPrice)}
            </span>
            <button
              type="button"
              onClick={() => onRemoveItem(item.product.id)}
              className="text-[10px] text-[#94A3B8] hover:text-[#EF4444] transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
