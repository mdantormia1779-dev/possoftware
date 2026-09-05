import React from "react";
import { formatCurrency } from "@/lib/utils";

interface CreatePOItemFieldsProps {
  productName: string;
  setProductName: (p: string) => void;
  qty: number;
  setQty: (q: number) => void;
  unitCost: number;
  setUnitCost: (c: number) => void;
}

export function CreatePOItemFields({
  productName,
  setProductName,
  qty,
  setQty,
  unitCost,
  setUnitCost,
}: CreatePOItemFieldsProps) {
  return (
    <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-3">
      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Product Item</label>
        <input
          type="text"
          required
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Item title or SKU"
          className="w-full h-9 px-3 rounded-xl border border-border bg-background"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Order Quantity</label>
          <input
            type="number"
            min={1}
            required
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-full h-9 px-3 rounded-xl border border-border bg-background font-mono"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Unit Cost (৳)</label>
          <input
            type="number"
            min={1}
            required
            value={unitCost}
            onChange={(e) => setUnitCost(Number(e.target.value))}
            className="w-full h-9 px-3 rounded-xl border border-border bg-background font-mono"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
        <span className="font-semibold text-muted-foreground">Estimated Total Bill:</span>
        <span className="font-black text-sm font-mono text-foreground">
          {formatCurrency(qty * unitCost)}
        </span>
      </div>
    </div>
  );
}
