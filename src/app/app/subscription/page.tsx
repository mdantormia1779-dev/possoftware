"use client";

import React from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { RiShieldCheckFill, RiFlashlightFill, RiVipCrownFill } from "react-icons/ri";
import { formatDate } from "@/lib/utils";
import { SubscriptionUsageMeters } from "@/components/subscription/SubscriptionUsageMeters";

export default function TenantSubscriptionPage() {
  const { currentOrg } = useTenant();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400">
            <RiShieldCheckFill className="h-6 w-6" />
          </div>
          <span>SaaS Subscription &amp; Plan Quotas</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Manage your enterprise subscription tier, active resource meters, branch limits, and renewal
        </p>
      </div>

      <div className="p-8 rounded-3xl border-2 border-indigo-600 bg-card shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-foreground capitalize flex items-center gap-2">
                <RiVipCrownFill className="h-6 w-6 text-amber-500" />
                {currentOrg.subscriptionPlan} Plan
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Active Subscription
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Auto-renewing on <strong>{formatDate(currentOrg.subscriptionEndsAt)}</strong> via bKash / Card
            </p>
          </div>

          <div className="text-right">
            <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
              ৳6,999<span className="text-xs text-muted-foreground font-normal"> / month</span>
            </div>
          </div>
        </div>

        <SubscriptionUsageMeters currentOrg={currentOrg} />

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">
            Need more than 3 branches or custom multi-warehouse API integrations?
          </div>
          <Link
            href="/super-admin/plans"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 active:scale-95 transition-transform"
          >
            <RiFlashlightFill className="h-4 w-4" />
            <span>Upgrade to Enterprise (৳14,999/mo)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
