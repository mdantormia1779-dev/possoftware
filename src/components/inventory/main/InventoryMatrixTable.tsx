import React from "react";
import { Search } from "lucide-react";
import { Product } from "@/types";
import { InventoryMatrixRow } from "./InventoryMatrixRow";

interface InventoryMatrixTableProps {
  products: Product[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function InventoryMatrixTable({
  products,
  searchQuery,
  onSearchChange,
}: InventoryMatrixTableProps) {
  return (
    <div className="space-y-4">
      <div className="p-3 sm:p-4 rounded-xl border border-border bg-card shadow-subtle-xs">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search stock by SKU, product name, or barcode..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-10 pr-3 rounded-lg border border-border bg-card text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-subtle-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider h-11">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Banani Flagship</th>
                <th className="px-4 py-3">Dhanmondi</th>
                <th className="px-4 py-3">Chittagong GEC</th>
                <th className="px-4 py-3">Total In-Stock</th>
                <th className="px-4 py-3">Stock Value</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                products.map((p) => <InventoryMatrixRow key={p.id} product={p} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
