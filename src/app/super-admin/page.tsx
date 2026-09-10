"use client";

import React from "react";
import { SuperAdminHeader } from "@/components/super-admin/SuperAdminHeader";
import { SuperAdminKpis } from "@/components/super-admin/SuperAdminKpis";
import { SuperAdminMrrChart } from "@/components/super-admin/SuperAdminMrrChart";
import { SuperAdminPlanMix } from "@/components/super-admin/SuperAdminPlanMix";
import { SuperAdminTenantTable } from "@/components/super-admin/SuperAdminTenantTable";
import { useSuperAdminDashboard } from "@/components/super-admin/useSuperAdminDashboard";

export default function SuperAdminDashboardPage() {
  const { analytics, orgs, handleTakeControl } = useSuperAdminDashboard();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <SuperAdminHeader />

      <SuperAdminKpis
        tenantsCount={orgs.length}
        analytics={analytics}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <SuperAdminMrrChart
          growthData={analytics?.mrrGrowth}
          monthlyMrr={analytics?.monthlyRecurringRevenue}
        />
        <SuperAdminPlanMix
          planData={analytics?.planDistribution}
          totalTenants={analytics?.totalOrganizations ?? orgs.length}
        />
      </div>

      <SuperAdminTenantTable
        orgs={orgs}
        onTakeControl={handleTakeControl}
      />
    </div>
  );
}
