import React from "react";
import { DollarSign, Building2, CreditCard, Activity } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

interface SuperAdminKpisProps {
  tenantsCount: number;
}

export function SuperAdminKpis({ tenantsCount }: SuperAdminKpisProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title="Monthly Recurring Revenue (MRR)"
        value="৳1,420,000"
        change="+18.5% YoY"
        isPositive={true}
        icon={DollarSign}
        iconBgColor="bg-purple-50 dark:bg-purple-950/60"
        iconTextColor="text-purple-600 dark:text-purple-400"
      />

      <StatCard
        title="Registered Tenants"
        value={`${tenantsCount} Companies`}
        change="+32 this month"
        isPositive={true}
        icon={Building2}
        iconBgColor="bg-indigo-50 dark:bg-indigo-950/60"
        iconTextColor="text-indigo-600 dark:text-indigo-400"
      />

      <StatCard
        title="Active Paid Subscriptions"
        value="294 Active"
        change="94.2% Retention"
        isPositive={true}
        icon={CreditCard}
        iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
        iconTextColor="text-emerald-600 dark:text-emerald-400"
      />

      <StatCard
        title="Platform GMV (MTD)"
        value="৳28.4M"
        description="Processed across all tenant POS"
        icon={Activity}
        iconBgColor="bg-blue-50 dark:bg-blue-950/60"
        iconTextColor="text-blue-600 dark:text-blue-400"
      />
    </div>
  );
}
