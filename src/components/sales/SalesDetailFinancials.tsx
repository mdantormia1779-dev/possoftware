import React from "react";
import { Sale } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface SalesDetailFinancialsProps {
  sale: Sale;
}

export function SalesDetailFinancials({ sale }: SalesDetailFinancialsProps) {
  return (
    <div className="p-4 rounded-lg bg-muted/30 border border-border space-y-2 text-xs font-mono shadow-subtle-xs">
      <div className="flex justify-between text-muted-foreground">
        <span className="font-sans">Subtotal:</span>
        <span className="text-foreground font-bold">
          {formatCurrency(sale.subtotal)}
        </span>
      </div>
      <div className="flex justify-between text-muted-foreground">
        <span className="font-sans">VAT:</span>
        <span className="text-foreground font-bold">
          {formatCurrency(sale.taxAmount)}
        </span>
      </div>
      {sale.discountAmount > 0 && (
        <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
          <span className="font-sans">Discount:</span>
          <span className="font-bold">
            -{formatCurrency(sale.discountAmount)}
          </span>
        </div>
      )}
      <div className="flex justify-between text-base font-bold text-foreground pt-2.5 border-t border-border">
        <span className="font-sans text-sm font-bold">Net Total:</span>
        <span className="text-primary text-lg">
          {formatCurrency(sale.grandTotal)}
        </span>
      </div>
      <div className="flex justify-between text-muted-foreground pt-1">
        <span className="font-sans">Payment Method:</span>
        <span className="uppercase font-semibold text-foreground">
          {sale.paymentMethod}
        </span>
      </div>
    </div>
  );
}
