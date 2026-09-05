import React from "react";
import { Sale } from "@/types";
import { SalesTableRow } from "./SalesTableRow";

interface SalesTableProps {
  sales: Sale[];
  onViewDetails: (sale: Sale) => void;
  onPrintReceipt: (sale: Sale) => void;
}

export function SalesTable({
  sales,
  onViewDetails,
  onPrintReceipt,
}: SalesTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-subtle-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider h-11">
              <th className="px-4 py-3">Invoice No</th>
              <th className="px-4 py-3">Date &amp; Time</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Branch</th>
              <th className="px-4 py-3">Cashier</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {sales.length === 0 ? (
              <tr>
                <td colSpan={10} className="p-8 text-center text-muted-foreground">
                  No sales invoices found matching filter criteria.
                </td>
              </tr>
            ) : (
              sales.map((sale) => (
                <SalesTableRow
                  key={sale.id}
                  sale={sale}
                  onViewDetails={onViewDetails}
                  onPrintReceipt={onPrintReceipt}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
