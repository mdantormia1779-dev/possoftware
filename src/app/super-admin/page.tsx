"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Organization } from "@/lib/types";
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
  ChevronRight,
  ExternalLink,
  Plus,
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
  const router = useRouter();
  const { setCurrentOrg, setCurrentBranch, setCurrentRole } = useTenant();
  const orgs = storageService.getOrganizations();

  const handleTakeControl = (org: Organization) => {
    setCurrentOrg(org);
    const branches = storageService.getBranches().filter((b) => b.organizationId === org.id);
    if (branches.length > 0) {
      setCurrentBranch(branches[0]);
    }
    setCurrentRole("company_owner");
    if (typeof window !== "undefined") {
      localStorage.setItem("xyz_user_role", "company_owner");
      localStorage.setItem("super_admin_controlling", org.id);
      localStorage.setItem("super_admin_controlling_name", org.name);
    }
    router.push("/app/dashboard");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <span>SaaS Platform Control Center</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Platform-wide tenant metrics, Monthly Recurring Revenue (MRR), and system infrastructure
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/super-admin/organizations"
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-md shadow-purple-500/25 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Manage &amp; Add Companies</span>
          </Link>

          <div className="px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/60 text-purple-900 dark:text-purple-300 text-xs font-black shadow-subtle-xs flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Online</span>
          </div>
        </div>
      </div>

      {/* 4 Super Admin KPI Cards */}
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
          value="312 Companies"
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

      {/* MRR Growth Chart & Plan Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
                MRR Trajectory (Bangladeshi Taka)
              </h3>
              <p className="text-xs text-muted-foreground">
                Monthly subscription revenue from 312 SMBs
              </p>
            </div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1 font-mono">
              <TrendingUp className="h-4 w-4" /> ৳1.42M / Month
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={MRR_GROWTH_DATA}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  stroke="#888888"
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="#888888"
                  tickFormatter={(val) => `৳${val / 100000}L`}
                />
                <Tooltip
                  formatter={(val: any) => formatCurrency(Number(val))}
                  contentStyle={{
                    borderRadius: "12px",
                    fontSize: "12px",
                    background: "var(--card)",
                    borderColor: "var(--border)",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="mrr"
                  stroke="#9333ea"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#mrrGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plan Breakdown */}
        <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
              Subscription Tier Mix
            </h3>
            <p className="text-xs text-muted-foreground">
              Distribution across 312 tenant companies
            </p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PLAN_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {PLAN_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {PLAN_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground font-sans text-xs">
                    {item.name}
                  </span>
                </div>
                <span className="font-bold text-foreground">
                  {item.value} Orgs
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tenant Directory Ledger */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-subtle-sm">
        <div className="p-4 border-b border-border/80 bg-muted/30 flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground">
              Active Tenant Organizations
            </h3>
            <p className="text-xs text-muted-foreground">
              Recently onboarded multi-tenant businesses
            </p>
          </div>
          <Link
            href="/super-admin/organizations"
            className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-0.5"
          >
            Manage All <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="p-3.5">Organization</th>
                <th className="p-3.5">Subdomain Slug</th>
                <th className="p-3.5">Subscription Plan</th>
                <th className="p-3.5">Business Type</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Created</th>
                <th className="p-3.5 text-right">Super Admin Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-card">
              {orgs.map((org) => (
                <tr
                  key={org.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="p-3.5">
                    <span className="font-bold text-foreground">{org.name}</span>
                    <span className="text-[10px] text-muted-foreground block font-mono">
                      {org.phone}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-purple-600 dark:text-purple-400 font-bold">
                    {org.slug}.xyzbusiness.os
                  </td>
                  <td className="p-3.5 font-bold uppercase text-[11px] text-foreground">
                    {org.subscriptionPlan}
                  </td>
                  <td className="p-3.5 uppercase text-muted-foreground text-[11px]">
                    {org.businessType}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={org.subscriptionStatus || "active"} />
                  </td>
                  <td className="p-3.5 font-mono text-muted-foreground text-[11px]">
                    {formatDate(org.createdAt || org.trialEndsAt || new Date().toISOString())}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleTakeControl(org)}
                      className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] inline-flex items-center gap-1 shadow-sm transition-all active:scale-95"
                      title="Take over and manage this company"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Control</span>
                    </button>
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
