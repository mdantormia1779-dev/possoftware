"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { PLAN_CATALOG } from "./checkout/checkoutTypes";

export function SubscriptionUpgradeCards({ currentTier }: { currentTier?: string }) {
  const current = (currentTier || "STARTER").toUpperCase();

  return (
    <div className="space-y-4 pt-2">
      <h3 className="text-sm font-extrabold text-foreground">Available Upgrade Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(PLAN_CATALOG).map((plan) => {
          const isCurrent = plan.tier === current;
          const isEnterprise = plan.tier === "ENTERPRISE";

          return (
            <div
              key={plan.tier}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                isEnterprise
                  ? "border-indigo-600 bg-card shadow-sm ring-1 ring-indigo-600/30"
                  : "border-border bg-card shadow-subtle-xs"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-base text-foreground">{plan.name}</span>
                  {isEnterprise && (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                      <Sparkles className="h-3 w-3" /> Recommended
                    </span>
                  )}
                </div>

                <div className="font-mono">
                  <span className="text-2xl font-black text-foreground">৳{plan.monthlyPrice.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground font-sans"> / mo</span>
                </div>

                <ul className="space-y-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
                  {plan.features.slice(0, 4).map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5">
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-2 px-3 rounded-xl bg-muted text-muted-foreground font-bold text-xs cursor-default text-center"
                  >
                    Current Plan
                  </button>
                ) : (
                  <Link
                    href={`/app/subscription/checkout?plan=${plan.tier}`}
                    className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                      isEnterprise
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
                        : "bg-muted/80 hover:bg-muted text-foreground border border-border"
                    }`}
                  >
                    <span>Upgrade to {plan.name}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
