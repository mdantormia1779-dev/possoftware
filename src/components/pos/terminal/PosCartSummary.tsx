import React from "react";
import { PauseCircle, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PosCartSummaryProps {
  cartLength: number;
  subtotal: number;
  discount: number;
  taxRate: number;
  totalTax: number;
  grandTotal: number;
  onHoldSale: () => void;
  onOpenPayment: () => void;
}

export function PosCartSummary({
  cartLength,
  subtotal,
  discount,
  taxRate,
  totalTax,
  grandTotal,
  onHoldSale,
  onOpenPayment,
}: PosCartSummaryProps) {
  const hasItems = cartLength > 0;

  return (
    <div className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3.5 shadow-sm">
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between text-slate-500 dark:text-slate-400">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
            <span>Discount (Promo)</span>
            <span className="font-bold font-mono">-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-500 dark:text-slate-400">
          <span>VAT / Tax ({taxRate}%)</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
            {formatCurrency(totalTax)}
          </span>
        </div>

        <div className="flex justify-between items-baseline pt-2.5 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Total</span>
            <span className="text-[10px] text-slate-400">Incl. all taxes</span>
          </div>
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono tracking-tight">
            {formatCurrency(grandTotal)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          type="button"
          disabled={!hasItems}
          onClick={onHoldSale}
          className="h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
        >
          <PauseCircle className="h-4 w-4 text-slate-500" />
          <span>Hold Order</span>
        </button>

        <button
          type="button"
          disabled={!hasItems}
          onClick={onOpenPayment}
          className="h-11 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer active:scale-[0.98]"
        >
          <span>Process</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
