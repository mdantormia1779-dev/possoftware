import React from "react";
import { Building2, Store, BookOpen, Clock } from "lucide-react";
import { Branch, UserRole } from "@/types";

interface AppHeaderBranchControlProps {
  currentRole: UserRole;
  currentBranch: Branch;
  branches: Branch[];
  onSelectBranch: (branch: Branch) => void;
}

export function AppHeaderBranchControl({
  currentRole,
  currentBranch,
  branches,
  onSelectBranch,
}: AppHeaderBranchControlProps) {
  if (currentRole === "company_owner") {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-muted/40 hover:bg-muted/80 border border-border/60 transition-colors">
        <Building2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
        <select
          value={currentBranch.id}
          onChange={(e) => {
            const found = branches.find((b) => b.id === e.target.value);
            if (found) onSelectBranch(found);
          }}
          className="bg-transparent text-xs font-bold text-foreground focus:outline-none cursor-pointer pr-2"
        >
          {branches.map((b) => (
            <option key={b.id} value={b.id} className="bg-card text-foreground">
              {b.name} {b.isMainBranch ? "(HQ)" : ""}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (currentRole === "branch_manager") {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs font-bold text-amber-800 dark:text-amber-300">
        <Store className="h-3.5 w-3.5 text-amber-600" />
        <span>{currentBranch.name}</span>
      </div>
    );
  }

  if (currentRole === "accountant") {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-xs font-bold text-blue-800 dark:text-blue-300">
        <BookOpen className="h-3.5 w-3.5 text-blue-600" />
        <span>NBR Mushak 6.3 Tax Ready</span>
      </div>
    );
  }

  if (currentRole === "cashier") {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-xs font-bold text-emerald-800 dark:text-emerald-300">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{currentBranch.name} • Till #1</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/60 text-xs font-bold text-purple-800 dark:text-purple-300">
      <Clock className="h-3.5 w-3.5 text-purple-600" />
      <span>Shift Active</span>
    </div>
  );
}
