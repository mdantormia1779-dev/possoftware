import React from "react";
import { Customer } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

interface CustomerStatsGridProps {
  customer: Customer;
}

export function CustomerStatsGrid({ customer }: CustomerStatsGridProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-lg bg-muted/20 border border-border shadow-subtle-xs">
          <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">
            Lifetime Purchases
          </span>
          <strong className="text-foreground text-sm font-bold font-mono">
            {formatCurrency(customer.totalSpent)}
          </strong>
        </div>
        <div className="p-3.5 rounded-lg bg-muted/20 border border-border shadow-subtle-xs">
          <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">
            Reward Points
          </span>
          <strong className="text-primary text-sm font-bold font-mono">
            {customer.loyaltyPoints} Points
          </strong>
        </div>
      </div>

      <div className="p-4 rounded-lg border border-border bg-card space-y-2 text-xs font-mono shadow-subtle-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground font-sans">Credit Limit Authorized:</span>
          <strong className="text-foreground font-bold">
            {formatCurrency(customer.creditLimit)}
          </strong>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground font-sans">Outstanding Due Balance:</span>
          <strong
            className={
              customer.dueBalance > 0
                ? "text-rose-600 dark:text-rose-400 font-bold"
                : "text-emerald-600 dark:text-emerald-400 font-medium"
            }
          >
            {formatCurrency(customer.dueBalance)}
          </strong>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground font-sans">Last Transaction:</span>
          <span className="text-foreground font-bold">
            {formatDate(customer.lastPurchaseDate)}
          </span>
        </div>
      </div>
    </>
  );
}
