import React from "react";
import { Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BranchHeaderProps {
  onAddClick: () => void;
}

export function BranchHeader({ onAddClick }: BranchHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <Building2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Multi-Branch Directory</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage your retail outlets, showroom floors, and regional inventory hubs
        </p>
      </div>

      <Button variant="primary" size="sm" onClick={onAddClick} className="font-bold shadow-xs">
        <Plus className="h-4 w-4 mr-1" /> Add New Branch Outlet
      </Button>
    </div>
  );
}
