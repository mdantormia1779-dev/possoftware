import React, { useState } from "react";
import { X, Send } from "lucide-react";
import { Branch, Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { CreateTransferFormFields } from "./CreateTransferFormFields";

interface CreateTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  branches: Branch[];
  products: Product[];
  onCreate: (data: {
    sourceBranchId: string;
    destBranchId: string;
    selectedProductId: string;
    transferQty: number;
    transferNotes: string;
  }) => void;
}

export function CreateTransferModal({
  isOpen,
  onClose,
  branches,
  products,
  onCreate,
}: CreateTransferModalProps) {
  const [sourceBranchId, setSourceBranchId] = useState(branches[0]?.id || "br-1");
  const [destBranchId, setDestBranchId] = useState(branches[1]?.id || "br-2");
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || "");
  const [transferQty, setTransferQty] = useState(5);
  const [transferNotes, setTransferNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sourceBranchId === destBranchId) {
      alert("Source and destination branch cannot be the same!");
      return;
    }
    onCreate({
      sourceBranchId,
      destBranchId,
      selectedProductId,
      transferQty,
      transferNotes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4 animate-fade-slide">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h3 className="text-base font-semibold text-foreground">Initiate Stock Transfer</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <CreateTransferFormFields
            branches={branches}
            products={products}
            sourceBranchId={sourceBranchId}
            setSourceBranchId={setSourceBranchId}
            destBranchId={destBranchId}
            setDestBranchId={setDestBranchId}
            selectedProductId={selectedProductId}
            setSelectedProductId={setSelectedProductId}
            transferQty={transferQty}
            setTransferQty={setTransferQty}
            transferNotes={transferNotes}
            setTransferNotes={setTransferNotes}
          />

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              <Send className="h-3.5 w-3.5 mr-1.5" /> Dispatch Shipment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
