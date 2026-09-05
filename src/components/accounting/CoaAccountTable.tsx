import React from "react";
import { ChartOfAccount } from "@/lib/types";
import { CoaAccountRow } from "./CoaAccountRow";

interface CoaAccountTableProps {
  accounts: ChartOfAccount[];
}

export function CoaAccountTable({ accounts }: CoaAccountTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-subtle-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40 h-11">
              <th className="px-4 py-3 font-semibold text-foreground">Code</th>
              <th className="px-4 py-3 font-semibold text-foreground">Account Name</th>
              <th className="px-4 py-3 font-semibold text-foreground">Account Type</th>
              <th className="px-4 py-3 font-semibold text-foreground">Description</th>
              <th className="px-4 py-3 text-right font-semibold text-foreground">Current Balance (৳)</th>
              <th className="px-4 py-3 text-right font-semibold text-foreground">Nature</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {accounts.map((acc) => (
              <CoaAccountRow key={acc.id} acc={acc} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
