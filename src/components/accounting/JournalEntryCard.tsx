import React from "react";
import { JournalEntry } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";

interface JournalEntryCardProps {
  entry: JournalEntry;
}

export function JournalEntryCard({ entry }: JournalEntryCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-subtle-xs overflow-hidden">
      {/* Entry Header */}
      <div className="p-4 bg-muted/30 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-primary text-sm">
            {entry.entryNumber}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-muted font-bold text-[10px] text-muted-foreground uppercase">
            {entry.referenceType}
          </span>
          {entry.referenceId && (
            <span className="font-mono text-muted-foreground">
              Ref: <strong className="text-foreground">{entry.referenceId}</strong>
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <span>Date: {formatDate(entry.date)}</span>
          <span>•</span>
          <span>By: {entry.createdByName}</span>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-2 text-xs font-medium text-foreground bg-card">
        {entry.description}
      </div>

      {/* Double-Entry Lines Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-t border-b border-border bg-muted/10 text-[11px] text-muted-foreground">
              <th className="p-3">Account Code &amp; Name</th>
              <th className="p-3">Type</th>
              <th className="p-3 text-right">Debit (৳)</th>
              <th className="p-3 text-right">Credit (৳)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {entry.lines.map((line) => (
              <tr key={line.id} className="hover:bg-muted/20">
                <td className="p-3">
                  <span className="font-mono font-semibold text-muted-foreground mr-2">
                    {line.accountCode}
                  </span>
                  <span className="font-medium text-foreground">{line.accountName}</span>
                </td>
                <td className="p-3 uppercase text-[10px] text-muted-foreground font-semibold">
                  {line.accountType}
                </td>
                <td className="p-3 text-right font-mono font-semibold text-foreground">
                  {line.debit > 0 ? formatCurrency(line.debit) : "-"}
                </td>
                <td className="p-3 text-right font-mono font-semibold text-foreground">
                  {line.credit > 0 ? formatCurrency(line.credit) : "-"}
                </td>
              </tr>
            ))}
            {/* Total Balanced Row */}
            <tr className="bg-muted/30 font-bold border-t border-border">
              <td colSpan={2} className="p-3 text-right text-xs">
                Entry Totals (Balanced):
              </td>
              <td className="p-3 text-right font-mono text-emerald-600 dark:text-emerald-400">
                {formatCurrency(entry.totalDebit)}
              </td>
              <td className="p-3 text-right font-mono text-emerald-600 dark:text-emerald-400">
                {formatCurrency(entry.totalCredit)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
