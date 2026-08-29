"use client";

import React, { useState } from "react";
import Link from "next/link";
import { storageService } from "@/lib/services/storage";
import { Organization } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Building2, Search, ArrowLeft, Plus, ExternalLink, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";

export default function SuperAdminOrganizationsPage() {
  const [orgs, setOrgs] = useState<Organization[]>(() => storageService.getOrganizations());
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrgs = orgs.filter((o) => {
    return (
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.businessType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.email && o.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/super-admin" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Building2 className="h-6 w-6 text-purple-600" />
              <span>SaaS Tenant Organizations</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              All 312 tenant companies running on XYZ Business OS with multi-tenant isolation
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tenant company name, industry, or admin email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Orgs Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-3.5 font-semibold text-foreground">Organization</th>
                <th className="p-3.5 font-semibold text-foreground">Industry</th>
                <th className="p-3.5 font-semibold text-foreground">Plan Tier</th>
                <th className="p-3.5 font-semibold text-foreground">Branches Allowed</th>
                <th className="p-3.5 font-semibold text-foreground">Staff Limit</th>
                <th className="p-3.5 font-semibold text-foreground">Expires On</th>
                <th className="p-3.5 font-semibold text-foreground">Status</th>
                <th className="p-3.5 text-right font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrgs.map((org) => (
                <tr key={org.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 font-bold text-foreground">
                    <div>{org.name}</div>
                    <span className="text-[10px] text-muted-foreground font-mono">{org.email || org.phone}</span>
                  </td>
                  <td className="p-3.5 text-muted-foreground">{org.businessType}</td>
                  <td className="p-3.5 uppercase font-bold text-[10px] text-purple-600 dark:text-purple-400">
                    {org.subscriptionPlan}
                  </td>
                  <td className="p-3.5 text-muted-foreground">{org.maxBranches} Outlets</td>
                  <td className="p-3.5 text-muted-foreground">{org.maxStaff} Users</td>
                  <td className="p-3.5 text-muted-foreground">{formatDate(org.subscriptionEndsAt)}</td>
                  <td className="p-3.5">
                    <StatusBadge status={org.subscriptionStatus} />
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      href="/app/dashboard"
                      className="px-2.5 py-1 rounded bg-purple-50 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-semibold text-[11px]"
                    >
                      Impersonate
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
