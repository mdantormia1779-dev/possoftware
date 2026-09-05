import React from "react";
import Link from "next/link";
import { Contact, Gift, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CustomersHeaderProps {
  onAddClick: () => void;
}

export function CustomersHeader({ onAddClick }: CustomersHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
      <div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <Contact className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Customer 360 &amp; Credit Terms</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Profiles, loyalty reward balances, lifetime spend, and authorized credit limits
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/app/loyalty"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shadow-subtle-xs hover:bg-indigo-100 transition-colors"
        >
          <Gift className="h-3.5 w-3.5" />
          <span>Loyalty Hub</span>
        </Link>
        <Button
          variant="primary"
          size="sm"
          onClick={onAddClick}
          className="shadow-sm shadow-indigo-500/25"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Customer
        </Button>
      </div>
    </div>
  );
}
