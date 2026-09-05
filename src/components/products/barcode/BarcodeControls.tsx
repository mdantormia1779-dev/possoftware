import React from "react";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface BarcodeControlsProps {
  products: Product[];
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  copies: number;
  setCopies: (copies: number) => void;
  includePrice: boolean;
  setIncludePrice: (inc: boolean) => void;
}

export function BarcodeControls({
  products,
  selectedProductId,
  setSelectedProductId,
  copies,
  setCopies,
  includePrice,
  setIncludePrice,
}: BarcodeControlsProps) {
  return (
    <div className="p-5 rounded-2xl border border-border bg-card shadow-2xs grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs no-print">
      <div className="sm:col-span-2 space-y-1.5">
        <label className="font-semibold text-foreground">Select Product SKU</label>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="w-full h-9 px-3 rounded-lg border border-border bg-background text-foreground"
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (SKU: {p.sku} | {formatCurrency(p.sellingPrice)})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Number of Labels</label>
        <input
          type="number"
          min={1}
          max={100}
          value={copies}
          onChange={(e) => setCopies(parseInt(e.target.value) || 1)}
          className="w-full h-9 px-3 rounded-lg border border-border bg-background"
        />
      </div>

      <div className="space-y-2 pt-5">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includePrice}
            onChange={(e) => setIncludePrice(e.target.checked)}
            className="h-3.5 w-3.5 rounded text-indigo-600"
          />
          <span>Show MRP Price (৳)</span>
        </label>
      </div>
    </div>
  );
}
