import React from "react";
import { Category, Product } from "@/types";
import { AddProductPricingFields } from "./AddProductPricingFields";

interface AddProductFormFieldsProps {
  formData: Partial<Product>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  categories: Category[];
}

export function AddProductFormFields({
  formData,
  setFormData,
  categories,
}: AddProductFormFieldsProps) {
  const update = (key: keyof Product, val: any) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Product Name (English)</label>
          <input
            type="text"
            required
            placeholder="e.g. Slim Fit Formal Shirt"
            value={formData.name || ""}
            onChange={(e) => update("name", e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Secondary Name (Optional)</label>
          <input
            type="text"
            placeholder="e.g. Formal Oxford Shirt"
            value={formData.nameBn || ""}
            onChange={(e) => update("nameBn", e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="font-semibold text-foreground">SKU Code</label>
          <input
            type="text"
            required
            placeholder="SHIRT-SLIM-01"
            value={formData.sku || ""}
            onChange={(e) => update("sku", e.target.value.toUpperCase())}
            className="w-full h-9 px-3 rounded-lg border border-border bg-card font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Barcode (Code128)</label>
          <input
            type="text"
            placeholder="890123456789"
            value={formData.barcode || ""}
            onChange={(e) => update("barcode", e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-border bg-card font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Category</label>
          <select
            value={formData.categoryId || "cat-1"}
            onChange={(e) => update("categoryId", e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <AddProductPricingFields formData={formData} update={update} />
    </>
  );
}
