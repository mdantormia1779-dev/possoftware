import React from "react";
import Link from "next/link";
import { Customer } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface TopReceivablesCardProps {
  dueCustomers: Customer[];
}

export function TopReceivablesCard({ dueCustomers }: TopReceivablesCardProps) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            Top Accounts Receivable
          </h3>
          <p className="text-xs text-muted-foreground">Highest outstanding customer credit balances</p>
        </div>
        <Link
          href="/app/customers"
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          All Customers
        </Link>
      </div>

      <div className="space-y-2 text-xs">
        {dueCustomers.slice(0, 4).map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/60 shadow-subtle-xs"
          >
            <div>
              <span className="font-bold text-foreground">{c.name}</span>
              <span className="text-[10px] text-muted-foreground font-mono block">
                Phone: {c.phone} • Limit: {formatCurrency(c.creditLimit)}
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400 block">
                {formatCurrency(c.dueBalance)}
              </span>
              <span className="text-[10px] text-muted-foreground">Overdue</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
