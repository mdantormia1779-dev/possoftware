import React, { useRef } from "react";
import { X, ShieldCheck, Printer, Check } from "lucide-react";
import { PurchaseOrder } from "@/types";
import { Button } from "@/components/ui/Button";
import { printDocument } from "@/utils/printDocument";
import { PurchaseDetailPrintable } from "./PurchaseDetailPrintable";

interface PurchaseDetailModalProps {
  po: PurchaseOrder | null;
  onClose: () => void;
  onMarkReceived: (po: PurchaseOrder) => void;
}

export function PurchaseDetailModal({
  po,
  onClose,
  onMarkReceived,
}: PurchaseDetailModalProps) {
  const printableRef = useRef<HTMLDivElement>(null);

  if (!po) return null;

  const handlePrint = () => {
    printDocument(printableRef.current, {
      title: `Goods-Received-Note-${po.poNumber}`,
      size: "a4",
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end no-print -mb-4">
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <PurchaseDetailPrintable ref={printableRef} po={po} />

        <div className="no-print p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/50 text-[11px] text-indigo-900 dark:text-indigo-300 flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-600 mt-0.5" />
          <span>
            Automated Ledger Entry: Marking as &ldquo;Received&rdquo; automatically posts a Debit to <strong>Inventory (1050)</strong> and Credit to <strong>Accounts Payable (2010)</strong> in the General Ledger.
          </span>
        </div>

        <div className="no-print flex items-center justify-between pt-2 border-t border-border">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground transition-colors"
          >
            <Printer className="h-4 w-4" /> Print GRN
          </button>

          <div className="flex items-center gap-2">
            {po.status !== "received" && (
              <Button
                onClick={() => onMarkReceived(po)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 shadow-sm"
              >
                <Check className="h-4 w-4" /> Verify & Receive Stock
              </Button>
            )}
            <Button variant="outline" onClick={onClose} className="text-xs">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
