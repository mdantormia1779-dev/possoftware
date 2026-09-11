import React from "react";
import { RiCopperCoinLine, RiBuilding4Fill, RiVipCrownFill, RiStockLine } from "react-icons/ri";
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
        icon={RiCopperCoinLine}
        iconBgColor="bg-purple-100 dark:bg-purple-950/70"
        iconTextColor="text-purple-600 dark:text-purple-400"
      />

      <StatCard
        title="Registered Tenants"
        value={`${totalOrgs} Companies`}
        description="Total onboarding businesses"
        isPositive={true}
        icon={RiBuilding4Fill}
        iconBgColor="bg-indigo-100 dark:bg-indigo-950/70"
        iconTextColor="text-indigo-600 dark:text-indigo-400"
      />

      <StatCard
        title="Active Paid Subscriptions"
        value={`${activeSubs} Active`}
        description="Live paying tenant plans"
        isPositive={true}
        icon={RiVipCrownFill}
        iconBgColor="bg-amber-100 dark:bg-amber-950/70"
        iconTextColor="text-amber-600 dark:text-amber-400"
      />

      <StatCard
        title="Platform GMV (Total)"
        value={formatCurrency(gmv)}
        description={`${salesCount} sales processed across POS`}
        icon={RiStockLine}
        iconBgColor="bg-emerald-100 dark:bg-emerald-950/70"
        iconTextColor="text-emerald-600 dark:text-emerald-400"
      />
    </div>
  );
}
