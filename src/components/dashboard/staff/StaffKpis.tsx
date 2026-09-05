import React from "react";
import { Clock, CheckCircle2, Package, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

interface StaffKpisProps {
  completedTasksCount: number;
  totalTasksCount: number;
  skusCount: number;
}

export function StaffKpis({
  completedTasksCount,
  totalTasksCount,
  skusCount,
}: StaffKpisProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title="Shift Time Elapsed"
        value="4h 35m"
        change="Ends at 06:00 PM"
        isPositive={true}
        icon={Clock}
        description="Standard 8-hour roster"
        iconBgColor="bg-purple-50 dark:bg-purple-950/60"
        iconTextColor="text-purple-600 dark:text-purple-400"
      />

      <StatCard
        title="Floor Tasks"
        value={`${completedTasksCount} / ${totalTasksCount}`}
        change="50% Completed"
        isPositive={true}
        icon={CheckCircle2}
        description="Daily store checklist"
        iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
        iconTextColor="text-emerald-600 dark:text-emerald-400"
      />

      <StatCard
        title="Catalog SKUs"
        value={skusCount}
        change="Live In Stock"
        isPositive={true}
        icon={Package}
        description="Searchable at counter"
        iconBgColor="bg-blue-50 dark:bg-blue-950/60"
        iconTextColor="text-blue-600 dark:text-blue-400"
      />

      <StatCard
        title="Sales Assisted"
        value="18 Orders"
        change="Top Floor Associate"
        isPositive={true}
        icon={TrendingUp}
        description="Customer assistance"
        iconBgColor="bg-amber-50 dark:bg-amber-950/60"
        iconTextColor="text-amber-600 dark:text-amber-400"
      />
    </div>
  );
}
