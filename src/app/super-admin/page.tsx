"use client";

import React from "react";
import Link from "next/link";
import { storageService } from "@/lib/services/storage";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  ShieldCheck,
  DollarSign,
  Activity,
  Layers,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/Badge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const MRR_GROWTH_DATA = [
  { month: "Sep", mrr: 820000, tenants: 140 },
  { month: "Oct", mrr: 980000, tenants: 175 },
  { month: "Nov", mrr: 1150000, tenants: 210 },
  { month: "Dec", mrr: 1320000, tenants: 255 },
  { month: "Jan", mrr: 1410000, tenants: 280 },
  { month: "Feb", mrr: 1420000, tenants: 312 },
];

const PLAN_DISTRIBUTION = [
  { name: "Business (৳6,999/mo)", value: 168, color: "#6366f1" },
  { name: "Starter (৳2,999/mo)", value: 118, color: "#10b981" },
  { name: "Enterprise (৳14,999/mo)", value: 26, color: "#a855f7" },
];

export default function SuperAdminDashboardPage() {
  const orgs = storageService.getOrganizations();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-purple-600" />
            <span>SaaS Platform Control Center</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Platform-wide tenant metrics, Monthly Recurring Revenue (MRR), and system infrastructure
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-bold">
          Platform Health: 99.99% Online
        </div>
      </div>

      {/* 4 Super Admin KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monthly Recurring Revenue (MRR)"
          value="৳1,420,000"
          change="+18.5% YoY"
          isPositive={true}
          icon={DollarSign}
          iconBgColor="bg-purple-50 dark:bg-purple-950/50"
          iconTextColor="text-purple-600 dark:text-purple-400"
        />

        <StatCard
          title="Total Registered Tenants"
          value="312 Companies"
          change="+32 this month"
          isPositive={true}
          icon={Building2}
          iconBgColor="bg-indigo-50 dark:bg-indigo-950/50"
          iconTextColor="text-indigo-600 dark:text-indigo-400"
        />

        <StatCard
          title="Active Paid Subscriptions"
          value="294 Active"
          change="94.2% Retention"
          isPositive={true}
          icon={CreditCard}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/50"
          iconTextColor="text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          title="Platform Sales GMV (MTD)"
          value="৳28.4M"
          description="Processed across all tenant POS"
          icon={Activity}
          iconBgColor="bg-blue-50 dark:bg-blue-950/50"
          iconTextColor="text-blue-600 dark:text-blue-400"
        />
      </div>

      {/* MRR Growth Chart & Plan Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-foreground">MRR Trajectory (Bangladeshi Taka)</h3>
              <p className="text-xs text-muted-foreground">Monthly subscription revenue from 312 SMBs</p>
            </div>
            <span className="text-xs font-bold text-purple-600 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> ৳1.42M / Month
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MRR_GROWTH_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#888888" />
                <YAxis tick={{ fontSize: 11 }} stroke="#888888" tickFormatter={(val) => `৳${val / 100000}L`} />
                <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                <Area type="monotone" dataKey="mrr" stroke="#9333ea" strokeWidth={2.5} fillOpacity={1} fill="url(#mrrGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plan Breakdown */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-foreground">Subscription Tier Mix</h3>
            <p className="text-xs text-muted-foreground">Distribution across 312 tenant companies</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={PLAN_DISTRIBUTION} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                  {PLAN_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {PLAN_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-bold text-foreground">{item.value} Orgs</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Organizations Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs space-y-3 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-foreground">Recent SaaS Tenants</h3>
            <p className="text-xs text-muted-foreground">Companies running on XYZ Business OS</p>
          </div>
          <Link href="/super-admin/organizations" className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline">
            View All 312 Orgs
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-3 font-semibold text-foreground">Organization</th>
                <th className="p-3 font-semibold text-foreground">Industry</th>
                <th className="p-3 font-semibold text-foreground">Plan</th>
                <th className="p-3 font-semibold text-foreground">Max Branches</th>
                <th className="p-3 font-semibold text-foreground">Subscription Status</th>
                <th className="p-3 text-right font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orgs.map((org) => (
                <tr key={org.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-bold text-foreground">{org.name}</td>
                  <td className="p-3 text-muted-foreground">{org.businessType}</td>
                  <td className="p-3 uppercase font-bold text-[10px] text-purple-600 dark:text-purple-400">
                    {org.subscriptionPlan}
                  </td>
                  <td className="p-3 text-muted-foreground">{org.maxBranches} Branches</td>
                  <td className="p-3">
                    <StatusBadge status={org.subscriptionStatus} />
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href="/app/dashboard"
                      className="px-2.5 py-1 rounded bg-purple-50 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-semibold text-[11px]"
                    >
                      Impersonate / Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
