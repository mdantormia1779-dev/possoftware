import React, { useState } from "react";
import { X, RotateCcw, Printer, FileText } from "lucide-react";
import { Sale } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useTenant } from "@/lib/context/TenantContext";
import { SalesDetailLineItems } from "./SalesDetailLineItems";
import { SalesDetailFinancials } from "./SalesDetailFinancials";
import { SalesTaxInvoiceModal } from "./SalesTaxInvoiceModal";

interface SalesDetailModalProps {
  sale: Sale | null;
  onClose: () => void;
  onRefund: (saleId: string) => void;
  onPrintReceipt: (sale: Sale) => void;
}

export function SalesDetailModal({
  sale,
  onClose,
  onRefund,
  onPrintReceipt,
}: SalesDetailModalProps) {
  const { currentOrg } = useTenant();
  const [showTaxInvoice, setShowTaxInvoice] = useState(false);

  if (!sale) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="w-full max-w-lg bg-card border-l border-border p-6 flex flex-col justify-between shadow-subtle-lg overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h3 className="text-base font-bold text-foreground font-mono">
                  Invoice #{sale.invoiceNumber}
                </h3>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  {formatDateTime(sale.createdAt)}
                </p>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-muted/20 border border-border text-xs">
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">Outlet Branch</span>
                <strong className="text-foreground">{sale.branchName}</strong>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">Payment Status</span>
                <StatusBadge status={sale.status} />
              </div>
            </div>

            <SalesDetailLineItems items={sale.items} />
            <SalesDetailFinancials sale={sale} />
          </div>

          <div className="pt-6 border-t border-border flex items-center justify-between gap-2">
            {sale.status !== "returned" ? (
              <Button variant="destructive" size="sm" onClick={() => onRefund(sale.id)}>
                <RotateCcw className="h-3.5 w-3.5 mr-1" /> Refund
              </Button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowTaxInvoice(true)}>
                <FileText className="h-3.5 w-3.5 mr-1" /> A4 Invoice
              </Button>
              <Button variant="primary" size="sm" onClick={() => onPrintReceipt(sale)}>
                <Printer className="h-3.5 w-3.5 mr-1" /> Thermal Receipt
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SalesTaxInvoiceModal
        sale={sale}
        organization={currentOrg}
        isOpen={showTaxInvoice}
        onClose={() => setShowTaxInvoice(false)}
      />
    </>
  );
}
