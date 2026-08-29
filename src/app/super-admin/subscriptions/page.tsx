"use client";

import React from "react";
import Link from "next/link";
import { CreditCard, ArrowLeft, CheckCircle2, Download, Search } from "lucide-react";
import { storageService } from "@/lib/services/storage";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";

export default function SuperAdminSubscriptionsPage() {
  const orgs = storageService.getOrganizations();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/super-admin" className="p-2 rounded-lg border border-border hover:bg-muted">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-purple-600" />
            <span>Active Subscriptions & Renewals</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitor renewal dates, recurring gateway payments, and churn
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
                <th className="p-3.5 font-semibold text-foreground">Billing Gateway</th>
                <th className="p-3.5 font-semibold text-foreground">Renewal Date</th>
                <th className="p-3.5 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orgs.map((org) => {
                const price = org.subscriptionPlan === "enterprise" ? 14999 : org.subscriptionPlan === "business" ? 6999 : 2999;
                return (
                  <tr key={org.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3.5 font-bold text-foreground">{org.name}</td>
                    <td className="p-3.5 uppercase font-bold text-[10px] text-purple-600">{org.subscriptionPlan}</td>
                    <td className="p-3.5 font-bold text-foreground">{formatCurrency(price)}</td>
                    <td className="p-3.5 text-muted-foreground">bKash Corporate Auto-Debit</td>
                    <td className="p-3.5 text-muted-foreground">{formatDate(org.subscriptionEndsAt)}</td>
                    <td className="p-3.5">
                      <StatusBadge status={org.subscriptionStatus} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
