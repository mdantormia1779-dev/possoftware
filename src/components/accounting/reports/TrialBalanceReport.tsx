import React from "react";
import { ChartOfAccount } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface TrialBalanceReportProps {
  accounts: ChartOfAccount[];
}

export function TrialBalanceReport({ accounts }: TrialBalanceReportProps) {
  return (
    <div className="space-y-4">
      <table className="w-full text-left">
        <thead className="border-b border-border bg-muted/30">
          <tr>
            <th className="p-2">Code</th>
            <th className="p-2">Account Title</th>
            <th className="p-2 text-right">Debit Balance (৳)</th>
            <th className="p-2 text-right">Credit Balance (৳)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border font-mono">
          {accounts.map((acc) => {
            const isDebit = acc.type === "asset" || acc.type === "expense";
            return (
              <tr key={acc.id}>
                <td className="p-2 text-muted-foreground">{acc.code}</td>
                <td className="p-2 font-sans font-medium text-foreground">{acc.name}</td>
                <td className="p-2 text-right">{isDebit ? formatCurrency(Math.abs(acc.balance)) : "-"}</td>
                <td className="p-2 text-right">{!isDebit ? formatCurrency(Math.abs(acc.balance)) : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
