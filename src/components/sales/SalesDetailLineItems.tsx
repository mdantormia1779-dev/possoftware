import React from "react";
import { SaleItem } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface SalesDetailLineItemsProps {
  items: SaleItem[];
}

export function SalesDetailLineItems({ items }: SalesDetailLineItemsProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
        Line Items
      </h4>
      <div className="divide-y divide-border border border-border rounded-lg p-3.5 bg-card space-y-2 shadow-subtle-xs">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="pt-2 first:pt-0 flex justify-between items-center text-xs"
          >
            <div>
              <div className="font-semibold text-foreground">
                {item.productName}
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">
                {item.quantity} x {formatCurrency(item.unitPrice)} (SKU: {item.sku})
              </div>
            </div>
            <span className="font-bold text-foreground font-mono">
              {formatCurrency(item.quantity * item.unitPrice)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
