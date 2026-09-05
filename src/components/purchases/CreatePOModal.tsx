import React, { useState } from "react";
import { X, Boxes } from "lucide-react";
import { Branch, Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { CreatePOFormFields } from "./CreatePOFormFields";

interface CreatePOModalProps {
  isOpen: boolean;
  onClose: () => void;
  branches: Branch[];
  products: Product[];
  onCreate: (data: {
    supplier: string;
    branchId: string;
    productName: string;
    qty: number;
    unitCost: number;
    paidAmount: number;
    batchNo: string;
  }) => void;
}

export function CreatePOModal({
  isOpen,
  onClose,
  branches,
  products,
  onCreate,
}: CreatePOModalProps) {
  const [supplier, setSupplier] = useState("Beximco Textiles Ltd.");
  const [branchId, setBranchId] = useState(branches[0]?.id || "branch-1");
  const [productName, setProductName] = useState(products[0]?.name || "Premium Oxford Cotton Shirt");
  const [qty, setQty] = useState(50);
  const [unitCost, setUnitCost] = useState(1200);
  const [paidAmount, setPaidAmount] = useState(30000);
  const [batchNo, setBatchNo] = useState("LOT-2026-09A");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ supplier, branchId, productName, qty, unitCost, paidAmount, batchNo });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-card border border-border rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Boxes className="h-5 w-5 text-indigo-600" />
            <h3 className="font-extrabold text-base text-foreground">Create Purchase Order (PO)</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <CreatePOFormFields
            branches={branches}
            supplier={supplier}
            setSupplier={setSupplier}
            branchId={branchId}
            setBranchId={setBranchId}
            productName={productName}
            setProductName={setProductName}
            qty={qty}
            setQty={setQty}
            unitCost={unitCost}
            setUnitCost={setUnitCost}
            paidAmount={paidAmount}
            setPaidAmount={setPaidAmount}
            batchNo={batchNo}
            setBatchNo={setBatchNo}
          />

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="font-bold">
              Confirm & Dispatch PO
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
