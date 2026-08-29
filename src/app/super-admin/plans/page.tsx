"use client";

import React from "react";
import Link from "next/link";
import { Layers, ArrowLeft, Plus, CheckCircle2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

const SAAS_PLANS = [
  {
    name: "Starter",
    price: 2999,
    tenantsCount: 118,
    features: ["1 Branch", "5 Staff Accounts", "5,000 Products", "Offline POS & Receipts"],
  },
  {
    name: "Business",
    price: 6999,
    tenantsCount: 168,
    features: ["3 Branches", "20 Staff Accounts", "Unlimited Products", "Auto Double-Entry Accounting", "HR & Payroll", "Stock Transfers"],
  },
  {
    name: "Enterprise",
    price: 14999,
    tenantsCount: 26,
    features: ["Unlimited Branches", "Unlimited Staff", "Multi-Company Holdings", "REST API", "24/7 Dedicated Support"],
  },
];

export default function SuperAdminPlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/super-admin" className="p-2 rounded-lg border border-border hover:bg-muted">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Layers className="h-6 w-6 text-purple-600" />
            <span>SaaS Subscription Plans & Tier Pricing</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure subscription tiers, monthly prices, feature access flags, and quotas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SAAS_PLANS.map((plan) => (
          <div key={plan.name} className="p-6 rounded-3xl border border-border bg-card shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                  {plan.tenantsCount} Active Orgs
                </span>
              </div>
              <div className="text-3xl font-extrabold text-foreground">
                {formatCurrency(plan.price)}<span className="text-xs font-normal text-muted-foreground"> / mo</span>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="w-full">
                <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit Plan Tier
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
