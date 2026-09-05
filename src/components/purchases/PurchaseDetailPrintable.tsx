import React, { forwardRef } from "react";
import { FileText } from "lucide-react";
import { PurchaseOrder } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";
import { PurchaseDetailItemsTable } from "./PurchaseDetailItemsTable";

interface PurchaseDetailPrintableProps {
  po: PurchaseOrder;
}

export const PurchaseDetailPrintable = forwardRef<HTMLDivElement, PurchaseDetailPrintableProps>(
  ({ po }, ref) => {
    return (
      <div ref={ref} className="space-y-5 bg-card p-1 text-foreground">
        <div className="flex items-center gap-3 pb-3 border-b border-border">
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

        <div className="pt-8 border-t border-border grid grid-cols-2 gap-8 text-xs">
          <div className="text-center">
            <div className="border-t border-dashed border-border pt-1 font-semibold text-muted-foreground">
              Received By (Store Keeper)
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-dashed border-border pt-1 font-semibold text-muted-foreground">
              Quality Inspected & Approved By
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PurchaseDetailPrintable.displayName = "PurchaseDetailPrintable";
