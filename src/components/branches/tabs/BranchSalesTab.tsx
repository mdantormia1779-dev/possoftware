import React from "react";
import { Sale } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface BranchSalesTabProps {
  branchName: string;
  sales: Sale[];
}

export function BranchSalesTab({ branchName, sales }: BranchSalesTabProps) {
  return (
    <div className="space-y-3 text-xs">
      <h4 className="font-bold text-foreground">Recent Invoices Generated at {branchName}</h4>
      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-muted/40 border-b border-border text-[10px] font-bold text-muted-foreground uppercase">
              <th className="p-3">Invoice</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Amount</th>
              <th className="p-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sales.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                  No recent sales logged for this branch.
                </td>
              </tr>
            ) : (
              sales.map((s) => (
                <tr key={s.id}>
                  <td className="p-3 font-mono font-bold text-indigo-600">{s.invoiceNumber}</td>
                  <td className="p-3">{s.customerName || "Walk-in"}</td>
                  <td className="p-3 capitalize">{s.paymentMethod}</td>
                  <td className="p-3 font-mono font-bold">{formatCurrency(s.grandTotal)}</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                      Completed
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
