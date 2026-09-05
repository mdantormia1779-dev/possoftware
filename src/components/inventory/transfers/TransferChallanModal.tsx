import React, { useRef } from "react";
import { X, Printer, Truck } from "lucide-react";
import { StockTransfer } from "@/types";
import { Button } from "@/components/ui/Button";
import { formatDateTime } from "@/lib/utils";
import { printDocument } from "@/utils/printDocument";

interface TransferChallanModalProps {
  transfer: StockTransfer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TransferChallanModal({ transfer, isOpen, onClose }: TransferChallanModalProps) {
  const challanRef = useRef<HTMLDivElement>(null);
  if (!isOpen || !transfer) return null;

  const handlePrint = () => {
    printDocument(challanRef.current, {
      title: `Stock-Transfer-${transfer.transferNumber}`,
      size: "a4",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-xl bg-card border border-border rounded-3xl shadow-2xl p-6 space-y-4 max-h-[92vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-2 border-b border-border no-print">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-indigo-600" />
            <h3 className="font-bold text-sm text-foreground">Stock Transfer Delivery Challan</h3>
          </div>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>

        <div ref={challanRef} className="p-6 bg-white text-slate-900 border border-neutral-200 rounded-xl space-y-4 text-xs font-sans">
          <div className="text-center border-b pb-2 border-slate-300">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Official Stock Movement Delivery Challan</span>
            <h2 className="text-base font-black uppercase text-slate-900 mt-0.5">Inter-Branch Gate Pass &amp; Challan</h2>
            <p className="text-slate-600 font-mono text-[11px]">Challan Ref: {transfer.transferNumber}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pb-2 border-b border-slate-200 text-[11px]">
            <div>
              <p><span className="text-slate-500">Source Outlet:</span> <strong>{transfer.sourceBranchName}</strong></p>
              <p><span className="text-slate-500">Date:</span> {formatDateTime(transfer.createdAt)}</p>
            </div>
            <div className="text-right">
              <p><span className="text-slate-500">Destination:</span> <strong>{transfer.destinationBranchName}</strong></p>
              <p><span className="text-slate-500">Status:</span> <span className="uppercase font-bold text-indigo-600">{transfer.status}</span></p>
            </div>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-800 text-[11px] font-bold text-slate-700">
                <th className="py-1.5">#</th>
                <th className="py-1.5">Item Description</th>
                <th className="py-1.5">SKU</th>
                <th className="py-1.5 text-right">Transfer Qty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {transfer.items.map((it, idx) => (
                <tr key={idx}>
                  <td className="py-1.5 text-slate-400 font-mono">{idx + 1}</td>
                  <td className="py-1.5 font-medium">{it.productName}</td>
                  <td className="py-1.5 font-mono text-slate-500">{it.sku}</td>
                  <td className="py-1.5 text-right font-mono font-bold">{it.quantity} units</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pt-6 grid grid-cols-3 gap-3 text-center text-[10px] text-slate-500">
            <div><div className="border-t border-dashed border-slate-400 pt-1 font-semibold">Dispatched By</div></div>
            <div><div className="border-t border-dashed border-slate-400 pt-1 font-semibold">Carrier / Driver</div></div>
            <div><div className="border-t border-dashed border-slate-400 pt-1 font-semibold">Received By</div></div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-1 no-print">
          <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
          <Button variant="primary" size="sm" onClick={handlePrint} className="gap-1.5 font-bold">
            <Printer className="h-4 w-4" /> Print Challan
          </Button>
        </div>
      </div>
    </div>
  );
}
