import React from "react";
import { Organization } from "@/types";

interface SubscriptionUsageMetersProps {
  currentOrg: Organization;
}

export function SubscriptionUsageMeters({ currentOrg }: SubscriptionUsageMetersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-6 border-t border-border">
      {/* Branches Meter */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold">
          <span>Branch Outlets</span>
          <span className="text-indigo-600">3 of {currentOrg.maxBranches}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div className="bg-indigo-600 h-full w-full rounded-full" />
        </div>
        <span className="text-[10px] text-muted-foreground block">100% quota utilized</span>
      </div>

      {/* Staff Meter */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold">
          <span>Staff Accounts</span>
          <span className="text-indigo-600">4 of {currentOrg.maxStaff}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div className="bg-indigo-600 h-full w-1/5 rounded-full" />
        </div>
        <span className="text-[10px] text-muted-foreground block">16 seats remaining</span>
      </div>

      {/* Products Meter */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold">
          <span>SKU Capacity</span>
          <span className="text-indigo-600">10 of {currentOrg.maxProducts}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div className="bg-indigo-600 h-full w-[2%] rounded-full" />
        </div>
        <span className="text-[10px] text-muted-foreground block">Unlimited capacity</span>
      </div>
    </div>
  );
}
