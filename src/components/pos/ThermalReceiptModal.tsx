"use client";

import React, { useRef } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { X, Printer, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { ThermalReceiptSheet } from "./receipt/ThermalReceiptSheet";
import { printReceipt } from "@/utils/printReceipt";

export function ThermalReceiptModal() {
  const { activeReceiptSale, setActiveReceiptSale, currentOrg } = useTenant();
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!activeReceiptSale) return null;

  const handlePrint = () => {
    printReceipt(receiptRef.current);
  };

  const handleClose = () => {
    setActiveReceiptSale(null);
  };

  const sale = activeReceiptSale;

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md max-h-[90vh] flex flex-col rounded-2xl border border-border bg-card shadow-subtle-lg overflow-hidden animate-fade-slide">
        {/* Modal Topbar */}
        <div className="no-print flex items-center justify-between border-b border-border px-5 py-4 bg-muted/30">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">Sale Completed Successfully</h3>
              <p className="text-[11px] text-muted-foreground font-sans tabular-nums font-medium">{sale.invoiceNumber}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Thermal Receipt Paper Simulation */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex justify-center bg-muted/30">
          <ThermalReceiptSheet
            ref={receiptRef}
            organization={currentOrg}
            sale={sale}
          />
        </div>

        {/* Modal Actions */}
        <div className="no-print flex items-center justify-between border-t border-border px-5 py-4 bg-muted/30">
          <Button variant="outline" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handlePrint} className="shadow-subtle-sm font-bold">
            <Printer className="h-4 w-4 mr-1.5" />
            Print Receipt (80mm)
          </Button>
        </div>
      </div>
    </div>
  );
}
