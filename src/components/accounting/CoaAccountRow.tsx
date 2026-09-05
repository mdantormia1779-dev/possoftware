import React from "react";
import { ChartOfAccount } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface CoaAccountRowProps {
  acc: ChartOfAccount;
}

const typeStyles: Record<string, string> = {
  asset: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  liability: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
  equity: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
  revenue: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  expense: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
};

export function CoaAccountRow({ acc }: CoaAccountRowProps) {
  const isAssetOrExpense = acc.type === "asset" || acc.type === "expense";

  return (
    <tr className="h-[52px] hover:bg-muted/30 transition-colors">
      <td className="px-4 py-3 font-mono font-bold text-primary">
        {acc.code}
      </td>
      <td className="px-4 py-3">
        <span className="font-semibold text-foreground">{acc.name}</span>
        {acc.isSystem && (
          <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-semibold">
            System Auto
          </span>
        )}
      </td>
      <td className="px-4 py-3 uppercase font-semibold text-[10px]">
        <span className={`px-2 py-0.5 rounded-full ${typeStyles[acc.type] || ""}`}>
          {acc.type}
        </span>
      </td>
      <td className="px-4 py-3 text-muted-foreground">{acc.description || "-"}</td>
      <td className="px-4 py-3 text-right font-mono font-bold text-foreground">
        {formatCurrency(acc.balance)}
      </td>
      <td className="px-4 py-3 text-right text-[10px] text-muted-foreground font-semibold">
        {isAssetOrExpense ? "Normal Debit" : "Normal Credit"}
      </td>
    </tr>
  );
}
