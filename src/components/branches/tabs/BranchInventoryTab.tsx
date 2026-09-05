import React from "react";
import { Product, Category, Branch } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface BranchInventoryTabProps {
  products: Product[];
  categories: Category[];
  selectedBranch: Branch;
}

export function BranchInventoryTab({
  products,
  categories,
  selectedBranch,
}: BranchInventoryTabProps) {
  return (
    <div className="space-y-3 text-xs">
      <h4 className="font-bold text-foreground">Assigned Inventory Items</h4>
      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-muted/40 border-b border-border text-[10px] font-bold text-muted-foreground uppercase">
              <th className="p-3">Item / SKU</th>
              <th className="p-3">Category</th>
              <th className="p-3">Available Stock</th>
              <th className="p-3 text-right">Selling Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.slice(0, 5).map((p) => (
              <tr key={p.id}>
                <td className="p-3">
                  <p className="font-bold text-foreground">{p.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{p.sku}</p>
                </td>
                <td className="p-3">
                  {p.categoryName || categories.find((c) => c.id === p.categoryId)?.name || "General"}
                </td>
                <td className="p-3 font-mono font-bold text-emerald-600">
                  {selectedBranch && p.branchStocks && p.branchStocks[selectedBranch.id] !== undefined
                    ? p.branchStocks[selectedBranch.id]
                    : p.totalStock}{" "}
                  {p.unit || "units"}
                </td>
                <td className="p-3 font-mono font-bold text-right">{formatCurrency(p.sellingPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
