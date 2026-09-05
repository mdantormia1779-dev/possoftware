import React from "react";
import Link from "next/link";
import { Layers, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CoaHeaderProps {
  onAddClick: () => void;
}

export function CoaHeader({ onAddClick }: CoaHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Link href="/app/accounting" className="p-2 rounded-lg border border-border hover:bg-muted">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Layers className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Chart of Accounts (COA)</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Standard 5-category financial ledger structure (Assets, Liabilities, Equity, Revenue, Expenses)
          </p>
        </div>
      </div>

      <Button variant="primary" size="sm" onClick={onAddClick}>
        <Plus className="h-4 w-4 mr-1" /> Add New Ledger Account
      </Button>
    </div>
  );
}
