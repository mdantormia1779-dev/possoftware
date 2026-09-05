import React from "react";
import { Branch, Product } from "@/types";

interface AdjustStockFormFieldsProps {
  products: Product[];
  branches: Branch[];
  productId: string;
  setProductId: (id: string) => void;
  branchId: string;
  setBranchId: (id: string) => void;
  delta: number;
  setDelta: (d: number) => void;
  reason: string;
  setReason: (r: string) => void;
}

export function AdjustStockFormFields({
  products,
  branches,
  productId,
  setProductId,
  branchId,
  setBranchId,
  delta,
  setDelta,
  reason,
  setReason,
}: AdjustStockFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Select Product</label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name} (Total: {p.totalStock} {p.unit})</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Branch Outlet</label>
        <select
          value={branchId}
          onChange={(e) => setBranchId(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        >
          {branches.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Quantity Change (+ to Add, - to Deduct)</label>
        <input
          type="number"
          required
          value={delta}
          onChange={(e) => setDelta(parseInt(e.target.value) || 0)}
          className="w-full h-10 px-3 rounded-lg border border-border bg-card font-mono font-bold text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Adjustment Reason</label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        >
          <option>Damaged during handling</option>
          <option>Physical inventory count correction</option>
          <option>Customer returned damaged item</option>
          <option>Sample / Promotional display write-off</option>
        </select>
      </div>
    </div>
  );
}
