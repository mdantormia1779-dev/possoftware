import React from "react";
import { Branch, Product } from "@/types";
import { TransferBranchSelectPair } from "./TransferBranchSelectPair";

interface CreateTransferFormFieldsProps {
  branches: Branch[];
  products: Product[];
  sourceBranchId: string;
  setSourceBranchId: (id: string) => void;
  destBranchId: string;
  setDestBranchId: (id: string) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  transferQty: number;
  setTransferQty: (qty: number) => void;
  transferNotes: string;
  setTransferNotes: (notes: string) => void;
}

export function CreateTransferFormFields({
  branches,
  products,
  sourceBranchId,
  setSourceBranchId,
  destBranchId,
  setDestBranchId,
  selectedProductId,
  setSelectedProductId,
  transferQty,
  setTransferQty,
  transferNotes,
  setTransferNotes,
}: CreateTransferFormFieldsProps) {
  return (
    <>
      <TransferBranchSelectPair
        branches={branches}
        sourceBranchId={sourceBranchId}
        setSourceBranchId={setSourceBranchId}
        destBranchId={destBranchId}
        setDestBranchId={setDestBranchId}
      />

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 space-y-1.5">
          <label className="font-semibold text-foreground">Select Product SKU</label>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name} (SKU: {p.sku})</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Quantity</label>
          <input
            type="number"
            min={1}
            value={transferQty}
            onChange={(e) => setTransferQty(parseInt(e.target.value) || 1)}
            className="w-full h-10 px-3 rounded-lg border border-border bg-background font-bold font-mono text-center text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Transfer Notes</label>
        <textarea
          rows={2}
          value={transferNotes}
          onChange={(e) => setTransferNotes(e.target.value)}
          placeholder="e.g. Stock replenishing for campaign"
          className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>
    </>
  );
}
