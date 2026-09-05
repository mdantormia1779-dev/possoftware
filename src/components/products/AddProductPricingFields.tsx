import React from "react";
import { Product } from "@/types";

interface AddProductPricingFieldsProps {
  formData: Partial<Product>;
  update: (key: keyof Product, val: any) => void;
}

export function AddProductPricingFields({
  formData,
  update,
}: AddProductPricingFieldsProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="space-y-1">
        <label className="font-semibold text-foreground">Cost Price (৳)</label>
        <input
          type="number"
          required
          value={formData.purchasePrice || 0}
          onChange={(e) => update("purchasePrice", parseFloat(e.target.value))}
          className="w-full h-9 px-3 rounded-lg border border-border bg-card font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>
      <div className="space-y-1">
        <label className="font-semibold text-foreground">Selling Price (৳)</label>
        <input
          type="number"
          required
          value={formData.sellingPrice || 0}
          onChange={(e) => update("sellingPrice", parseFloat(e.target.value))}
          className="w-full h-9 px-3 rounded-lg border border-border bg-card font-bold font-mono text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>
      <div className="space-y-1">
        <label className="font-semibold text-foreground">Initial Stock</label>
        <input
          type="number"
          value={formData.totalStock || 0}
          onChange={(e) => update("totalStock", parseInt(e.target.value))}
          className="w-full h-9 px-3 rounded-lg border border-border bg-card font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>
      <div className="space-y-1">
        <label className="font-semibold text-foreground">Min Alert</label>
        <input
          type="number"
          value={formData.minStockAlert || 5}
          onChange={(e) => update("minStockAlert", parseInt(e.target.value))}
          className="w-full h-9 px-3 rounded-lg border border-border bg-card font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>
    </div>
  );
}
