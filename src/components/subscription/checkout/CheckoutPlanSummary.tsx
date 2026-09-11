"use client";

import React from "react";
import { CheckCircle2, Sparkles, Building2, Users, Package } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { PlanDetails } from "./checkoutTypes";

interface CheckoutPlanSummaryProps {
  plan: PlanDetails;
  billingCycle: "MONTHLY" | "YEARLY";
  onCycleChange: (c: "MONTHLY" | "YEARLY") => void;
  payableAmount: number;
}

export function CheckoutPlanSummary({
  plan,
  billingCycle,
  onCycleChange,
  payableAmount,
}: CheckoutPlanSummaryProps) {
  return (
    <div className="p-6 rounded-3xl border border-border bg-card shadow-subtle-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-foreground">{plan.name} Tier</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              Selected Package
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Enterprise Cloud POS &amp; Multi-Branch Quota</p>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-muted border border-border/80 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onCycleChange("MONTHLY")}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              billingCycle === "MONTHLY" ? "bg-card text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => onCycleChange("YEARLY")}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
              billingCycle === "YEARLY" ? "bg-indigo-600 text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Annual</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-amber-400 text-amber-950 font-black">Save 16%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-2xl bg-muted/40 border border-border/60">
          <Building2 className="h-4 w-4 mx-auto text-indigo-600 mb-1" />
          <div className="text-sm font-black text-foreground">{plan.maxBranches}</div>
          <div className="text-[10px] text-muted-foreground font-semibold">Max Branches</div>
        </div>
        <div className="p-3 rounded-2xl bg-muted/40 border border-border/60">
          <Users className="h-4 w-4 mx-auto text-emerald-600 mb-1" />
          <div className="text-sm font-black text-foreground">{plan.maxStaff}</div>
          <div className="text-[10px] text-muted-foreground font-semibold">Staff Accounts</div>
        </div>
        <div className="p-3 rounded-2xl bg-muted/40 border border-border/60">
          <Package className="h-4 w-4 mx-auto text-purple-600 mb-1" />
          <div className="text-sm font-black text-foreground">{plan.maxProducts.toLocaleString()}</div>
          <div className="text-[10px] text-muted-foreground font-semibold">Products Limit</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-xs text-muted-foreground font-semibold">Total Payable for {billingCycle === "MONTHLY" ? "1 Month" : "1 Year"}:</span>
        <span className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
          {formatCurrency(payableAmount)}
        </span>
      </div>
    </div>
  );
}
