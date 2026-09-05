import React from "react";
import Link from "next/link";
import { Store, ExternalLink } from "lucide-react";
import { Branch } from "@/types";
import { Button } from "@/components/ui/Button";

interface BranchesSettingsTabProps {
  branches: Branch[];
}

export function BranchesSettingsTab({ branches }: BranchesSettingsTabProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-subtle-xs space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <h3 className="text-base font-extrabold text-foreground">Branch Outlets Overview</h3>
          <p className="text-xs text-muted-foreground">
            Active outlets linked to your tenant database
          </p>
        </div>
        <Link href="/app/branches">
          <Button type="button" variant="outline" size="sm" className="gap-1 text-xs">
            <span>Manage All Branches</span>
            <ExternalLink className="h-3 w-3" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {branches.map((b) => (
          <div
            key={b.id}
            className="p-4 rounded-2xl border border-border bg-muted/30 space-y-2 hover:border-indigo-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-foreground flex items-center gap-1.5">
                <Store className="h-4 w-4 text-indigo-600" />
                <span>{b.name}</span>
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                Active
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">{b.address || b.city}</p>
            <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] font-medium text-foreground">
              <span>Manager: {b.managerName}</span>
              <span className="text-indigo-600">{b.employeeCount} Staff</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
