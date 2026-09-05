"use client";

import React from "react";
import { Organization } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";
import { OrgRowActions } from "./OrgRowActions";

interface OrgTableRowProps {
  org: Organization;
  onTakeControl: (org: Organization) => void;
  onEdit: (org: Organization) => void;
  onToggleStatus: (org: Organization) => void;
  onPurgeData: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}

export function OrgTableRow({
  org,
  onTakeControl,
  onEdit,
  onToggleStatus,
  onPurgeData,
  onDelete,
}: OrgTableRowProps) {
  return (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center font-black text-sm shrink-0">
            {org.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <span>{org.name}</span>
              {org.taxNumber && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground font-mono">
                  BIN
                </span>
              )}
            </div>
            <span className="text-[11px] text-muted-foreground font-mono block">
              {org.email || "No email"} • {org.phone || "No phone"}
            </span>
          </div>
        </div>
      </td>

      <td className="p-4">
        <span className="font-medium text-foreground">{org.businessType}</span>
        <span className="text-[10px] text-muted-foreground block">{org.address || "Dhaka"}</span>
      </td>

      <td className="p-4">
        <span className="font-black text-xs uppercase text-purple-600 dark:text-purple-400 font-mono">
          {org.subscriptionPlan}
        </span>
        <span className="text-[10px] text-muted-foreground block">
          {org.maxBranches} Branches • {org.maxStaff} Staff
        </span>
      </td>

      <td className="p-4">
        <StatusBadge status={org.subscriptionStatus} />
      </td>

      <td className="p-4 text-muted-foreground font-mono">
        {formatDate(org.subscriptionEndsAt || new Date().toISOString())}
      </td>

      <td className="p-4 text-right">
        <OrgRowActions
          org={org}
          onTakeControl={onTakeControl}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
          onPurgeData={onPurgeData}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}
