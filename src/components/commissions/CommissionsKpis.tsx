import React from "react";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Users, Award } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

interface CommissionsKpisProps {
  totalCommissionsEarned: number;
  activeStaffCount: number;
}

export function CommissionsKpis({
  totalCommissionsEarned,
  activeStaffCount,
}: CommissionsKpisProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        title="Total Commission Disbursed"
        value={formatCurrency(totalCommissionsEarned)}
        change="Paid in Feb Payroll"
        isPositive={true}
        icon={Award}
        iconBgColor="bg-emerald-50 dark:bg-emerald-950/50"
        iconTextColor="text-emerald-600 dark:text-emerald-400"
      />

      <StatCard
        title="Top Performing Sales Rep"
        value="Sharmin Sultana"
        description="Dhanmondi Branch (৳46,200 Sales)"
        icon={TrendingUp}
        iconBgColor="bg-indigo-50 dark:bg-indigo-950/50"
        iconTextColor="text-indigo-600 dark:text-indigo-400"
      />

      <StatCard
        title="Active Eligible Staff"
        value={`${activeStaffCount} Staff`}
        description="Earning 1.0% to 1.5% commission"
        icon={Users}
        iconBgColor="bg-purple-50 dark:bg-purple-950/50"
        iconTextColor="text-purple-600 dark:text-purple-400"
      />
    </div>
  );
}
