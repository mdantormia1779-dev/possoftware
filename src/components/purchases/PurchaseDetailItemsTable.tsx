import React from "react";
import { PurchaseOrder } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface PurchaseDetailItemsTableProps {
  po: PurchaseOrder;
}

export function PurchaseDetailItemsTable({ po }: PurchaseDetailItemsTableProps) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-muted/40 border-b border-border text-[10px] font-bold text-muted-foreground uppercase">
            <th className="p-3">Product Name</th>
            <th className="p-3">Ordered Qty</th>
            <th className="p-3">Received Qty</th>
            <th className="p-3">Unit Cost</th>
            <th className="p-3 text-right">Line Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {po.items.map((item) => (
            <tr key={item.id}>
              <td className="p-3 font-semibold text-foreground">{item.productName}</td>
              <td className="p-3 font-mono">{item.quantity} units</td>
              <td className="p-3 font-mono text-emerald-600 font-bold">
                {item.receivedQty || (po.status === "received" ? item.quantity : 0)} units
              </td>
              <td className="p-3 font-mono">{formatCurrency(item.unitCost)}</td>
              <td className="p-3 font-mono font-bold text-right">{formatCurrency(item.totalCost)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
