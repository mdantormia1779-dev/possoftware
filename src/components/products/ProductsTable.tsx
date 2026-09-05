import React from "react";
import { Product } from "@/types";
import { ProductsTableRow } from "./ProductsTableRow";

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-subtle-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider h-11">
              <th className="px-4 py-3">Product Details</th>
              <th className="px-4 py-3">SKU / Barcode</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Purchase Cost</th>
              <th className="px-4 py-3">Selling Price</th>
              <th className="px-4 py-3">Margin</th>
              <th className="px-4 py-3">Total Stock</th>
              <th className="px-4 py-3">Alert Level</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {products.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-muted-foreground">
                  No products found matching your filters.
                </td>
              </tr>
            ) : (
              products.map((p) => <ProductsTableRow key={p.id} product={p} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
