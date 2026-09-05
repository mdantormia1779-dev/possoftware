import React from "react";
import { Search } from "lucide-react";
import { PurchaseOrder } from "@/types";
import { PurchasesTableRow } from "./PurchasesTableRow";

interface PurchasesTableProps {
  purchases: PurchaseOrder[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectDetails: (po: PurchaseOrder) => void;
}

export function PurchasesTable({
  purchases,
  searchQuery,
  onSearchChange,
  onSelectDetails,
}: PurchasesTableProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl border border-border bg-card shadow-subtle-xs">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search PO number (e.g. PO-2026...) or supplier name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-10 pr-3 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-subtle-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-[10px] font-bold text-muted-foreground uppercase tracking-wider h-11">
                <th className="px-4 py-3">PO Number</th>
                <th className="px-4 py-3">Supplier Name</th>
                <th className="px-4 py-3">Created Date</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total Bill</th>
                <th className="px-4 py-3">Paid Amount</th>
                <th className="px-4 py-3">Balance Due</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {purchases.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-muted-foreground">
                    No purchase orders found matching search criteria.
                  </td>
                </tr>
              ) : (
                purchases.map((po) => (
                  <PurchasesTableRow
                    key={po.id}
                    purchase={po}
                    onSelectDetails={onSelectDetails}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
