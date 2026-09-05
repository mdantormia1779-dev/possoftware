"use client";

import React from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { Shield, Zap } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { SubscriptionUsageMeters } from "@/components/subscription/SubscriptionUsageMeters";

export default function TenantSubscriptionPage() {
  const { currentOrg } = useTenant();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>SaaS Subscription &amp; Plan Usage</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage your subscription tier, resource meters, branch limits, and billing renewal
        </p>
      </div>

      <div className="p-8 rounded-3xl border-2 border-indigo-600 bg-card shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-foreground capitalize">
                {currentOrg.subscriptionPlan} Plan
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Active Subscription
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Renewing automatically on <strong>{formatDate(currentOrg.subscriptionEndsAt)}</strong> via bKash / Card
            </p>
          </div>

          <div className="text-right">
            <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              ৳6,999<span className="text-xs text-muted-foreground font-normal"> / month</span>
            </div>
          </div>
        </div>

        <SubscriptionUsageMeters currentOrg={currentOrg} />

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">
            Need more than 3 branches or dedicated API access?
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md"
          >
            <Zap className="h-4 w-4" />
            <span>Upgrade to Enterprise (৳14,999/mo)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
