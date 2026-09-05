import React from "react";
import { Truck, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TransfersHeaderProps {
  onCreateClick: () => void;
}

export function TransfersHeader({ onCreateClick }: TransfersHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
      <div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <Truck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Inter-Branch Stock Transfers</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Audit trail of goods dispatched, in-transit shipments, and received inventory
        </p>
      </div>

      <Button
        variant="primary"
        size="sm"
        onClick={onCreateClick}
        className="shadow-sm shadow-indigo-500/25"
      >
        <Plus className="h-4 w-4 mr-1" /> Create Transfer Request
      </Button>
    </div>
  );
}
