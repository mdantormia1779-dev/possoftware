"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BarChart, ArrowLeft, Activity, Server, Building2, Users } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { formatCurrency } from "@/lib/utils";
import { superAdminService, SuperAdminAnalytics } from "@/services/superAdmin.service";

export default function SuperAdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<SuperAdminAnalytics | null>(null);

  useEffect(() => {
    superAdminService.getAnalytics().then((res) => {
      if (res.success && res.data) setAnalytics(res.data);
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
            <BarChart className="h-6 w-6 text-purple-600" />
            <span>Platform Infrastructure &amp; Growth Analytics</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Live database metrics loaded from PostgreSQL
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Businesses"
          value={`${analytics?.totalOrganizations ?? 0} Companies`}
          description={`${analytics?.activeSubscriptions ?? 0} active subscriptions`}
          isPositive={true}
          icon={Building2}
          iconBgColor="bg-indigo-50 dark:bg-indigo-950/50"
          iconTextColor="text-indigo-600 dark:text-indigo-400"
        />

        <StatCard
          title="Registered Users"
          value={`${analytics?.totalUsers ?? 0} Accounts`}
          description="Cashiers, managers &amp; owners"
          isPositive={true}
          icon={Users}
          iconBgColor="bg-purple-50 dark:bg-purple-950/50"
          iconTextColor="text-purple-600 dark:text-purple-400"
        />

        <StatCard
          title="Total POS Sales"
          value={formatCurrency(analytics?.totalSystemRevenue ?? 0)}
          description={`${analytics?.totalSystemSalesCount ?? 0} completed receipts`}
          isPositive={true}
          icon={Activity}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/50"
          iconTextColor="text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          title="Server SLA Uptime"
          value="99.98%"
          description="Neon Cloud PostgreSQL"
          icon={Server}
          iconBgColor="bg-blue-50 dark:bg-blue-950/50"
          iconTextColor="text-blue-600 dark:text-blue-400"
        />
      </div>
    </div>
  );
}
