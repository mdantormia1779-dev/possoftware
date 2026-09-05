"use client";

import React from "react";
import { Organization } from "@/lib/types";
import { OrgTableRow } from "./OrgTableRow";

interface OrgTableProps {
  orgs: Organization[];
  onTakeControl: (org: Organization) => void;
  onEdit: (org: Organization) => void;
  onToggleStatus: (org: Organization) => void;
  onPurgeData: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}

export function OrgTable({
  orgs,
  onTakeControl,
  onEdit,
  onToggleStatus,
  onPurgeData,
  onDelete,
}: OrgTableProps) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-subtle-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border/80 bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              <th className="p-4">Organization &amp; Details</th>
              <th className="p-4">Industry &amp; City</th>
              <th className="p-4">Plan &amp; Limits</th>
              <th className="p-4">Status</th>
              <th className="p-4">Valid Until</th>
              <th className="p-4 text-right">Super Admin Control Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-card">
            {orgs.map((org) => (
              <OrgTableRow
                key={org.id}
                org={org}
                onTakeControl={onTakeControl}
                onEdit={onEdit}
                onToggleStatus={onToggleStatus}
                onPurgeData={onPurgeData}
                onDelete={onDelete}
              />
            ))}

            {orgs.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground text-xs">
                  No organizations match your query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
