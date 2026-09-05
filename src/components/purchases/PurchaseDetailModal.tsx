import React from "react";
import { FileText, X, ShieldCheck, Printer, Check } from "lucide-react";
import { PurchaseOrder } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PurchaseDetailItemsTable } from "./PurchaseDetailItemsTable";

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
  if (!po) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-foreground">
                Goods Received Note (GRN) — {po.poNumber}
              </h3>
              <p className="text-xs text-muted-foreground">
                Supplier: <strong className="text-foreground">{po.supplierName}</strong>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-muted/40 border border-border">
            <span className="text-[10px] uppercase font-bold text-muted-foreground">Order Date</span>
            <p className="font-semibold text-foreground mt-0.5">{formatDate(po.createdAt)}</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/40 border border-border">
            <span className="text-[10px] uppercase font-bold text-muted-foreground">Status</span>
            <div className="mt-0.5"><StatusBadge status={po.status} /></div>
          </div>
          <div className="p-3 rounded-xl bg-muted/40 border border-border">
            <span className="text-[10px] uppercase font-bold text-muted-foreground">Total Bill</span>
            <p className="font-bold font-mono text-foreground mt-0.5">{formatCurrency(po.totalAmount)}</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/40 border border-border">
            <span className="text-[10px] uppercase font-bold text-muted-foreground">Balance Due</span>
            <p className="font-bold font-mono text-rose-600 mt-0.5">{formatCurrency(po.dueAmount)}</p>
          </div>
        </div>

        <PurchaseDetailItemsTable po={po} />

        <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/50 text-[11px] text-indigo-900 dark:text-indigo-300 flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-600 mt-0.5" />
          <span>
            Automated Ledger Entry: Marking as &ldquo;Received&rdquo; automatically posts a Debit to <strong>Inventory (1050)</strong> and Credit to <strong>Accounts Payable (2010)</strong> in the General Ledger.
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <button
            type="button"
            onClick={() => window.print()}
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
