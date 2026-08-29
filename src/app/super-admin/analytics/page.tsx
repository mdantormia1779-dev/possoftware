"use client";

import React from "react";
import Link from "next/link";
import { BarChart, ArrowLeft, TrendingUp, Activity, Server, Zap } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

export default function SuperAdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/super-admin" className="p-2 rounded-lg border border-border hover:bg-muted">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BarChart className="h-6 w-6 text-purple-600" />
            <span>Platform Infrastructure & Growth Analytics</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Cloud latency, database connections, and tenant API throughput
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Average API Latency"
          value="42ms"
          change="Fast (Bangladeshi Edge CDN)"
          isPositive={true}
          icon={Zap}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/50"
          iconTextColor="text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          title="Daily Active POS Terminals"
          value="482 Counters"
          change="Across 312 Outlets"
          isPositive={true}
          icon={Activity}
          iconBgColor="bg-purple-50 dark:bg-purple-950/50"
          iconTextColor="text-purple-600 dark:text-purple-400"
        />

        <StatCard
          title="Server Uptime SLA"
          value="99.99%"
          description="Zero unplanned downtime"
          icon={Server}
          iconBgColor="bg-blue-50 dark:bg-blue-950/50"
          iconTextColor="text-blue-600 dark:text-blue-400"
        />
      </div>
    </div>
  );
}
