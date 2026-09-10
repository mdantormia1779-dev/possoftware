import React from "react";
import { DollarSign, Building2, CreditCard, Activity } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { formatCurrency } from "@/lib/utils";
import { SuperAdminAnalytics } from "@/services/superAdmin.service";

interface SuperAdminKpisProps {
  tenantsCount: number;
  analytics?: SuperAdminAnalytics | null;
}

export function SuperAdminKpis({ tenantsCount, analytics }: SuperAdminKpisProps) {
  const mrrVal = analytics?.monthlyRecurringRevenue ?? 0;
  const totalOrgs = analytics?.totalOrganizations ?? tenantsCount;
  const activeSubs = analytics?.activeSubscriptions ?? 0;
  const gmv = analytics?.totalSystemRevenue ?? 0;
  const salesCount = analytics?.totalSystemSalesCount ?? 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title="Monthly Recurring Revenue (MRR)"
        value={formatCurrency(mrrVal)}
        description="Calculated from active subscriptions"
        isPositive={true}
        icon={DollarSign}
        iconBgColor="bg-purple-50 dark:bg-purple-950/60"
        iconTextColor="text-purple-600 dark:text-purple-400"
      />

      <StatCard
        title="Registered Tenants"
        value={`${totalOrgs} Companies`}
        description="Total onboarding businesses"
        isPositive={true}
        icon={Building2}
        iconBgColor="bg-indigo-50 dark:bg-indigo-950/60"
        iconTextColor="text-indigo-600 dark:text-indigo-400"
      />

      <StatCard
        title="Active Paid Subscriptions"
        value={`${activeSubs} Active`}
        description="Live paying tenant plans"
        isPositive={true}
        icon={CreditCard}
        iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
        iconTextColor="text-emerald-600 dark:text-emerald-400"
      />

      <StatCard
        title="Platform GMV (Total)"
        value={formatCurrency(gmv)}
        description={`${salesCount} sales processed across POS`}
        icon={Activity}
        iconBgColor="bg-blue-50 dark:bg-blue-950/60"
        iconTextColor="text-blue-600 dark:text-blue-400"
      />
    </div>
  );
}
