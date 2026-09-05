import React, { useRef } from "react";
import { X, Printer, FileText } from "lucide-react";
import { Sale, Organization } from "@/types";
import { Button } from "@/components/ui/Button";
import { printDocument } from "@/utils/printDocument";
import { SalesTaxInvoicePrintable } from "./SalesTaxInvoicePrintable";

interface SalesTaxInvoiceModalProps {
  sale: Sale | null;
  organization: Organization;
  isOpen: boolean;
  onClose: () => void;
}

export function SalesTaxInvoiceModal({
  sale,
  organization,
  isOpen,
  onClose,
}: SalesTaxInvoiceModalProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !sale) return null;

  const handlePrint = () => {
    printDocument(invoiceRef.current, {
      title: `Tax-Invoice-${sale.invoiceNumber}`,
      size: "a4",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 max-h-[92vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-border no-print">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            <h3 className="font-bold text-base text-foreground">Official Sales Tax Invoice (A4)</h3>
          </div>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
          <SalesTaxInvoicePrintable
            ref={invoiceRef}
            sale={sale}
            organization={organization}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2 no-print">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handlePrint} className="gap-1.5 font-bold">
            <Printer className="h-4 w-4" /> Print A4 Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}
