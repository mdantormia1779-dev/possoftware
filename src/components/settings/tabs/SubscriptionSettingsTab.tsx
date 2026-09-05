import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function SubscriptionSettingsTab() {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-subtle-xs space-y-6">
      <div className="border-b border-border pb-3">
        <h3 className="text-base font-extrabold text-foreground">Your SaaS Subscription Tier</h3>
        <p className="text-xs text-muted-foreground">
          Current resource usage against package allocation
        </p>
      </div>

      <div className="p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-foreground">Business Plan</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
              Active
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Billed monthly at <strong>৳6,999/month</strong>. Next renewal: <strong>15 Oct 2026</strong>.
          </p>
        </div>

        <Link href="/pricing">
          <Button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs">
            Upgrade to Enterprise
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-1">
          <span className="text-muted-foreground font-medium">Branches</span>
          <p className="text-xl font-black text-foreground">2 / 3</p>
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full w-[66%]" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-1">
          <span className="text-muted-foreground font-medium">Staff Accounts</span>
          <p className="text-xl font-black text-foreground">8 / 20</p>
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full w-[40%]" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-1">
          <span className="text-muted-foreground font-medium">Catalog Products</span>
          <p className="text-xl font-black text-foreground">1,240 / Unlimited</p>
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full w-[15%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
