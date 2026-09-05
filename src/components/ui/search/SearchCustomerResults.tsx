import React from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Customer } from "@/types";

interface SearchCustomerResultsProps {
  customers: Customer[];
  onSelect: () => void;
}

export function SearchCustomerResults({ customers, onSelect }: SearchCustomerResultsProps) {
  if (customers.length === 0) return null;

  return (
    <div>
      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5 px-1">
        <User className="h-3.5 w-3.5" /> Customers ({customers.length})
      </div>
      <div className="space-y-1.5">
        {customers.map((c) => (
          <Link
            key={c.id}
            href="/app/customers"
            onClick={onSelect}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all group"
          >
            <div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                {c.name}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {c.phone} | Points: {c.loyaltyPoints}
              </div>
            </div>
            <div className="text-right text-xs">
              {c.dueBalance > 0 ? (
                <span className="text-rose-600 font-bold font-mono">
                  Due: {formatCurrency(c.dueBalance)}
                </span>
              ) : (
                <span className="text-emerald-600 font-semibold">No Due</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
