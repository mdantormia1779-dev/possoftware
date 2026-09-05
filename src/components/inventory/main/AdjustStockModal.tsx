import React, { useState } from "react";
import { X } from "lucide-react";
import { Branch, Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { AdjustStockFormFields } from "./AdjustStockFormFields";

interface AdjustStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  branches: Branch[];
  currentBranchId: string;
  onAdjust: (data: {
    productId: string;
    branchId: string;
    delta: number;
    reason: string;
  }) => void;
}

export function AdjustStockModal({
  isOpen,
  onClose,
  products,
  branches,
  currentBranchId,
  onAdjust,
}: AdjustStockModalProps) {
  const [productId, setProductId] = useState(products[0]?.id || "");
  const [branchId, setBranchId] = useState(currentBranchId);
  const [delta, setDelta] = useState(0);
  const [reason, setReason] = useState("Damaged during handling");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || delta === 0) return;
    onAdjust({ productId, branchId, delta, reason });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-subtle-lg p-6 space-y-4 animate-fade-slide">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h3 className="text-base font-bold text-foreground">Stock Adjustment / Correction</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <AdjustStockFormFields
            products={products}
            branches={branches}
            productId={productId}
            setProductId={setProductId}
            branchId={branchId}
            setBranchId={setBranchId}
            delta={delta}
            setDelta={setDelta}
            reason={reason}
            setReason={setReason}
          />

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="shadow-subtle-xs">
              Save Stock Adjustment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
