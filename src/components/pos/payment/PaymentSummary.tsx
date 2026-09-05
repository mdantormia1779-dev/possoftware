import React from "react";
import { formatCurrency } from "@/lib/utils";

interface PaymentSummaryProps {
  itemCount: number;
  subtotal: number;
  discount: number;
  taxRate: number;
  totalTax: number;
  grandTotal: number;
}

export function PaymentSummary({
  itemCount,
  subtotal,
  discount,
  taxRate,
  totalTax,
  grandTotal,
}: PaymentSummaryProps) {
  return (
    <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2 text-xs font-mono shadow-subtle-xs">
      <div className="flex justify-between text-muted-foreground">
        <span className="font-sans">Subtotal ({itemCount} items):</span>
        <span className="text-foreground font-bold">{formatCurrency(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
          <span className="font-sans">Discount:</span>
          <span className="font-bold">-{formatCurrency(discount)}</span>
        </div>
      )}
      <div className="flex justify-between text-muted-foreground">
        <span className="font-sans">VAT ({taxRate}% included):</span>
        <span className="text-foreground font-bold">{formatCurrency(totalTax)}</span>
      </div>
      <div className="flex justify-between text-base font-black text-foreground pt-2.5 border-t border-border">
        <span className="font-sans text-sm font-bold">Payable Total:</span>
        <span className="text-primary text-lg font-bold">{formatCurrency(grandTotal)}</span>
      </div>
    </div>
  );
}
