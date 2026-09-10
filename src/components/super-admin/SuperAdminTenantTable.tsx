import React from "react";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Organization } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";

interface SuperAdminTenantTableProps {
  orgs: Organization[];
  onTakeControl: (org: Organization) => void;
}

export function SuperAdminTenantTable({
  orgs,
  onTakeControl,
}: SuperAdminTenantTableProps) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-subtle-sm">
      <div className="p-4 border-b border-border/80 bg-muted/30 flex items-center justify-between">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-foreground">
            Active Tenant Organizations (Database)
          </h3>
          <p className="text-xs text-muted-foreground">
            Live multi-tenant businesses registered in PostgreSQL
          </p>
        </div>
        <Link
          href="/super-admin/organizations"
          className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-0.5"
        >
          Manage All <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border/80 bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              <th className="p-3.5">Organization</th>
              <th className="p-3.5">Subdomain</th>
              <th className="p-3.5">Plan</th>
              <th className="p-3.5">Type</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Created</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-card">
            {orgs.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground font-medium">
                  No tenant organizations registered yet.
                </td>
              </tr>
            ) : (
              orgs.map((org) => (
                <tr key={org.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5">
                    <span className="font-bold text-foreground block">{org.name}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{org.phone || org.email || "No contact"}</span>
                  </td>
                  <td className="p-3.5 font-mono text-purple-600 dark:text-purple-400 font-bold">
                    {org.slug}.xyzpos.com
                  </td>
                  <td className="p-3.5 font-bold uppercase text-[11px] text-foreground">
                    {org.subscriptionPlan || "STARTER"}
                  </td>
                  <td className="p-3.5 uppercase text-muted-foreground text-[11px]">
                    {org.businessType || "Retail"}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={(org.subscriptionStatus || "ACTIVE").toLowerCase()} />
                  </td>
                  <td className="p-3.5 font-mono text-muted-foreground text-[11px]">
                    {formatDate(org.createdAt || new Date().toISOString())}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onTakeControl(org)}
                      className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] inline-flex items-center gap-1 shadow-sm transition-all active:scale-95 cursor-pointer"
                      title="Take over and manage this company"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Control</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
