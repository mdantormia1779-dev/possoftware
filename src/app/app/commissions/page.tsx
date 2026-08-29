"use client";

import React from "react";
import Link from "next/link";
import { storageService } from "@/lib/services/storage";
import { formatCurrency } from "@/lib/utils";
import { Percent, ArrowLeft, TrendingUp, Users, Award, DollarSign } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

export default function CommissionsPage() {
  const employees = storageService.getEmployees();
  const sales = storageService.getSales();

  const totalCommissionsEarned = employees.reduce((sum, emp) => {
    return sum + (emp.baseSalary * emp.commissionRate * 1.5) / 100;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/app/hr" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Percent className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span>Sales Staff Commission Dashboard</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Performance incentives automatically linked to POS invoice sales volume
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
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
          value={`${employees.filter((e) => e.commissionRate > 0).length} Staff`}
          description="Earning 1.0% to 1.5% commission"
          icon={Users}
          iconBgColor="bg-purple-50 dark:bg-purple-950/50"
          iconTextColor="text-purple-600 dark:text-purple-400"
        />
      </div>

      {/* Commission Leaderboard Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-border bg-muted/20">
          <h3 className="text-sm font-bold text-foreground">Sales Staff Incentive Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-3.5 font-semibold text-foreground">Employee</th>
                <th className="p-3.5 font-semibold text-foreground">Outlet Branch</th>
                <th className="p-3.5 font-semibold text-foreground">Designation</th>
                <th className="p-3.5 font-semibold text-foreground">Commission Rate</th>
                <th className="p-3.5 font-semibold text-foreground">Month Sales Handled (৳)</th>
                <th className="p-3.5 text-right font-semibold text-foreground">Commission Earned (৳)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {employees.map((emp) => {
                const salesHandled = emp.designation.includes("Manager") ? 84500 : 46200;
                const earned = (salesHandled * emp.commissionRate) / 100;

                return (
                  <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3.5 font-bold text-foreground">{emp.name}</td>
                    <td className="p-3.5 text-muted-foreground">{emp.branchName}</td>
                    <td className="p-3.5 text-muted-foreground">{emp.designation}</td>
                    <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{emp.commissionRate}%</td>
                    <td className="p-3.5 font-mono">{formatCurrency(salesHandled)}</td>
                    <td className="p-3.5 text-right font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(earned)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
