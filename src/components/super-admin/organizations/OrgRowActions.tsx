"use client";

import React from "react";
import { Organization } from "@/lib/types";
import { ExternalLink, Edit3, Power, RotateCcw, Trash2 } from "lucide-react";

interface OrgRowActionsProps {
  org: Organization;
  onTakeControl: (org: Organization) => void;
  onEdit: (org: Organization) => void;
  onToggleStatus: (org: Organization) => void;
  onPurgeData: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}

export function OrgRowActions({
  org,
  onTakeControl,
  onEdit,
  onToggleStatus,
  onPurgeData,
  onDelete,
}: OrgRowActionsProps) {
  const isSuspended =
    org.subscriptionStatus === "cancelled" || org.subscriptionStatus === "past_due";

  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        onClick={() => onTakeControl(org)}
        className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all active:scale-95"
        title={`Take full owner control of ${org.name}`}
      >
        <ExternalLink className="h-3.5 w-3.5" />
        <span>Enter &amp; Control</span>
      </button>

      <button
        onClick={() => onEdit(org)}
        className="p-1.5 rounded-xl border border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        title="Edit Company Configuration"
      >
        <Edit3 className="h-4 w-4" />
      </button>

      <button
        onClick={() => onToggleStatus(org)}
        className={`p-1.5 rounded-xl border transition-colors ${
          isSuspended
            ? "border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
            : "border-amber-300 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950"
        }`}
        title={isSuspended ? "Reactivate Company" : "Suspend Company"}
      >
        <Power className="h-4 w-4" />
      </button>

      <button
        onClick={() => onPurgeData(org)}
        className="p-1.5 rounded-xl border border-border/80 hover:bg-amber-50 text-muted-foreground hover:text-amber-600 transition-colors"
        title="Purge Sales & Test Transactions"
      >
        <RotateCcw className="h-4 w-4" />
      </button>

      <button
        onClick={() => onDelete(org)}
        className="p-1.5 rounded-xl border border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 transition-colors"
        title="Delete Company and All Data Permanently"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
