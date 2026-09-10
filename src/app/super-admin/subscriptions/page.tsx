"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CreditCard, ArrowLeft } from "lucide-react";
import { superAdminService } from "@/services/superAdmin.service";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";

export default function SuperAdminSubscriptionsPage() {
  const [orgs, setOrgs] = useState<any[]>([]);

  useEffect(() => {
    superAdminService.getOrganizations().then((res) => {
      if (res.success && res.data) setOrgs(res.data);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/super-admin" className="p-2 rounded-lg border border-border hover:bg-muted">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-purple-600" />
            <span>Active Subscriptions &amp; Renewals</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitor renewal dates, recurring gateway payments, and live tenant subscriptions
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-3.5 font-semibold text-foreground">Organization</th>
                <th className="p-3.5 font-semibold text-foreground">Plan Tier</th>
                <th className="p-3.5 font-semibold text-foreground">Monthly Fee (৳)</th>
                <th className="p-3.5 font-semibold text-foreground">Renewal Date</th>
                <th className="p-3.5 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orgs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground font-medium">
                    No active subscriptions found in database.
                  </td>
                </tr>
              ) : (
                orgs.map((org) => {
                  const plan = (org.subscriptionPlan || "STARTER").toUpperCase();
                  const price = plan === "ENTERPRISE" ? 14999 : plan === "BUSINESS" ? 6999 : 2999;
                  return (
                    <tr key={org.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3.5 font-bold text-foreground">{org.name}</td>
                      <td className="p-3.5 uppercase font-bold text-[10px] text-purple-600">{plan}</td>
                      <td className="p-3.5 font-bold text-foreground">{formatCurrency(price)}</td>
                      <td className="p-3.5 text-muted-foreground">{formatDate(org.createdAt || new Date().toISOString())}</td>
                      <td className="p-3.5">
                        <StatusBadge status={(org.subscriptionStatus || "ACTIVE").toLowerCase()} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
