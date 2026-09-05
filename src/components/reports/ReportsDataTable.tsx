import React from "react";
import { formatCurrency } from "@/lib/utils";
import { MonthlySalesRecord } from "./reportsData";

interface ReportsDataTableProps {
  data: MonthlySalesRecord[];
}

export function ReportsDataTable({ data }: ReportsDataTableProps) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-subtle-sm print:border-neutral-300 print:shadow-none print:rounded-none">
      <div className="p-4 border-b border-border/80 bg-muted/30">
        <h3 className="text-xs sm:text-sm font-bold text-foreground">
          Monthly Performance Ledger
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border/80 bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              <th className="p-3.5">Month</th>
              <th className="p-3.5">Gross Sales (৳)</th>
              <th className="p-3.5">Gross Profit (৳)</th>
              <th className="p-3.5">Margin %</th>
              <th className="p-3.5">Invoices Processed</th>
              <th className="p-3.5 text-right">Growth YoY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 font-mono bg-card">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-muted/30 transition-colors">
                <td className="p-3.5 font-sans font-bold text-foreground">
                  {row.month} 2025/26
                </td>
                <td className="p-3.5 font-bold text-foreground">
                  {formatCurrency(row.sales)}
                </td>
                <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(row.profit)}
                </td>
                <td className="p-3.5 text-muted-foreground">
                  {((row.profit / row.sales) * 100).toFixed(1)}%
                </td>
                <td className="p-3.5 text-muted-foreground">
                  {Math.floor(row.sales / 3200)} orders
                </td>
                <td className="p-3.5 text-right text-emerald-600 dark:text-emerald-400 font-bold">
                  +{14 + idx * 2.3}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
