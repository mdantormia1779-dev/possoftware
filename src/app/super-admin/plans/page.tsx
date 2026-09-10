"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Layers, ArrowLeft, CheckCircle2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { superAdminService } from "@/services/superAdmin.service";

const DEFAULT_PLANS = [
  { name: "Starter", monthlyPrice: 2999, maxBranches: 1, maxStaff: 5, features: ["1 Branch", "5 Staff Accounts", "5,000 Products"] },
  { name: "Business", monthlyPrice: 6999, maxBranches: 3, maxStaff: 20, features: ["3 Branches", "20 Staff Accounts", "Full POS & Accounting"] },
  { name: "Enterprise", monthlyPrice: 14999, maxBranches: 10, maxStaff: 100, features: ["Unlimited Branches", "Dedicated Support", "Custom Domain"] },
];

export default function SuperAdminPlansPage() {
  const [plans, setPlans] = useState<any[]>(DEFAULT_PLANS);

  useEffect(() => {
    superAdminService.getPlans().then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setPlans(res.data);
      }
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
            <Layers className="h-6 w-6 text-purple-600" />
            <span>SaaS Subscription Plans &amp; Tier Pricing</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configured subscription tiers loaded from PostgreSQL database
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => {
          const feats: string[] = Array.isArray(plan.features)
            ? plan.features
            : typeof plan.features === "string"
            ? JSON.parse(plan.features || "[]")
            : [`${plan.maxBranches || 1} Branches`, `${plan.maxStaff || 5} Staff`];

          return (
            <div key={plan.id || idx} className="p-6 rounded-3xl border border-border bg-card shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                    Active Tier
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-foreground">
                  {formatCurrency(plan.monthlyPrice)}<span className="text-xs font-normal text-muted-foreground"> / mo</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                  {feats.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="w-full">
                  <Edit2 className="h-3.5 w-3.5 mr-1" /> Plan Settings
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
