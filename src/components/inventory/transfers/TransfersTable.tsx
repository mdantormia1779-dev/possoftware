import React from "react";
import { StockTransfer } from "@/types";
import { TransfersTableRow } from "./TransfersTableRow";

interface TransfersTableProps {
  transfers: StockTransfer[];
  onUpdateStatus: (id: string, status: StockTransfer["status"]) => void;
}

export function TransfersTable({ transfers, onUpdateStatus }: TransfersTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-subtle-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40 h-11 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3">Transfer No</th>
              <th className="px-4 py-3">Source Outlet</th>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Items Transferred</th>
              <th className="px-4 py-3">Created Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {transfers.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted-foreground">
                  No stock transfers found.
                </td>
              </tr>
            ) : (
              transfers.map((tr) => (
                <TransfersTableRow
                  key={tr.id}
                  transfer={tr}
                  onUpdateStatus={onUpdateStatus}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
