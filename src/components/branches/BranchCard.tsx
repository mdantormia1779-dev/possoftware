import React from "react";
import { MapPin, Phone, Users, Eye } from "lucide-react";
import { Branch } from "@/types";
import { Button } from "@/components/ui/Button";
import { BranchCardMetrics } from "./BranchCardMetrics";

interface BranchCardProps {
  branch: Branch;
  isCurrent: boolean;
  onSelectDetails: (branch: Branch) => void;
  onSwitchWorkspace: (branch: Branch) => void;
}

export function BranchCard({
  branch,
  isCurrent,
  onSelectDetails,
  onSwitchWorkspace,
}: BranchCardProps) {
  return (
    <div
      className={`rounded-2xl border p-5 bg-card shadow-subtle-xs transition-all flex flex-col justify-between ${
        isCurrent
          ? "border-indigo-600 ring-2 ring-indigo-500/20 shadow-subtle-sm"
          : "border-border hover:border-indigo-400"
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-foreground">{branch.name}</h3>
              {branch.isMainBranch && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  HQ
                </span>
              )}
            </div>
            <span className="text-xs font-mono text-muted-foreground">{branch.code}</span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
            Active
          </span>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="truncate">{branch.address}, {branch.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="font-mono">{branch.phone || "+880 1711-000000"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span>Manager: {branch.managerName || "Unassigned"}</span>
          </div>
        </div>

        <BranchCardMetrics branch={branch} />
      </div>

      <div className="pt-5 space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectDetails(branch)}
          className="w-full text-xs font-bold gap-1.5"
        >
          <Eye className="h-3.5 w-3.5" /> Branch 360 Detail
        </Button>

        {isCurrent ? (
          <div className="w-full py-2 text-center text-xs font-bold text-indigo-600 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            ✓ Currently Active Workspace
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs font-semibold text-muted-foreground hover:text-foreground"
            onClick={() => onSwitchWorkspace(branch)}
          >
            Switch Workspace to This Branch
          </Button>
        )}
      </div>
    </div>
  );
}
