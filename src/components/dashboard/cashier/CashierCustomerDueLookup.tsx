import React from "react";
import { Search } from "lucide-react";
import { Customer } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface CashierCustomerDueLookupProps {
  customerSearch: string;
  setCustomerSearch: (val: string) => void;
  filteredCustomer: Customer | null | undefined;
}

export function CashierCustomerDueLookup({
  customerSearch,
  setCustomerSearch,
  filteredCustomer,
}: CashierCustomerDueLookupProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-subtle-xs">
      <div>
        <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
          Customer Due Lookup &amp; Payment
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Search by customer phone to verify credit balance or collect payment
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Enter phone number (e.g. 01711...)"
          value={customerSearch}
          onChange={(e) => setCustomerSearch(e.target.value)}
          className="w-full h-10 pl-10 pr-3 rounded-lg border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>

      {filteredCustomer ? (
        <div className="p-3.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-xs text-foreground">{filteredCustomer.name}</div>
              <div className="text-[10px] text-muted-foreground font-mono">{filteredCustomer.phone}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-muted-foreground">Due Balance</div>
              <div className="font-mono font-bold text-sm text-rose-600 dark:text-rose-400">
                {formatCurrency(filteredCustomer.dueBalance)}
              </div>
            </div>
          </div>
          <Button size="xs" variant="primary" className="w-full text-xs font-bold">
            Collect Payment at POS
          </Button>
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-muted/20 border border-border text-center space-y-1">
          <span className="text-sm">🔍</span>
          <p className="text-xs text-muted-foreground">
            Type customer phone number above to check outstanding dues instantly
          </p>
        </div>
      )}
    </div>
  );
}
