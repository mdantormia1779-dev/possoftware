import React from "react";
import { StockTransfer } from "@/types";

interface BranchTransfersTabProps {
  branchName: string;
  transfers: StockTransfer[];
}

export function BranchTransfersTab({
  branchName,
  transfers,
}: BranchTransfersTabProps) {
  return (
    <div className="space-y-3 text-xs">
      <h4 className="font-bold text-foreground">Stock Transfers to / from {branchName}</h4>
      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-muted/40 border-b border-border text-[10px] font-bold text-muted-foreground uppercase">
              <th className="p-3">Transfer Code</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Quantity</th>
              <th className="p-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transfers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                  No stock transfers recorded for this outlet.
                </td>
              </tr>
            ) : (
              transfers.map((t) => (
                <tr key={t.id}>
                  <td className="p-3 font-mono font-bold text-indigo-600">{t.transferNumber}</td>
                  <td className="p-3">{t.sourceBranchName}</td>
                  <td className="p-3">{t.destinationBranchName}</td>
                  <td className="p-3 font-mono">{t.items?.reduce((acc, it) => acc + it.quantity, 0) || 0} items</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-600 uppercase">
                      {t.status}
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
