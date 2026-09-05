import React from "react";
import { Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SuppliersHeaderProps {
  onAddClick: () => void;
}

export function SuppliersHeader({ onAddClick }: SuppliersHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Building2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Supplier Master Directory</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage vendors, textile mills, wholesalers, and outstanding payable balances
        </p>
      </div>

      <Button variant="primary" size="sm" onClick={onAddClick}>
        <Plus className="h-4 w-4 mr-1" /> Add New Supplier
      </Button>
    </div>
  );
}
