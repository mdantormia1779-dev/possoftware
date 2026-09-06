"use client";

import React from "react";
import { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { formatDate } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardUserBar } from "@/components/dashboard/DashboardUserBar";
import { OwnerDashboard } from "@/components/dashboard/OwnerDashboard";
import { BranchManagerDashboard } from "@/components/dashboard/BranchManagerDashboard";
import { AccountantDashboard } from "@/components/dashboard/AccountantDashboard";
import { CashierDashboard } from "@/components/dashboard/CashierDashboard";
import { StaffDashboard } from "@/components/dashboard/StaffDashboard";

export default function DashboardPage() {
  const { currentRole, currentBranch } = useTenant();
  const [dateRange] = useState("Today, " + formatDate(new Date()));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <DashboardHeader
        currentRole={currentRole}
        branchName={currentBranch.name}
        dateRange={dateRange}
      />

      <DashboardUserBar />

      {/* Render Exclusively the Logged-in User's Role Dashboard */}
      <div>
        {currentRole === "company_owner" && <OwnerDashboard />}
        {currentRole === "branch_manager" && <BranchManagerDashboard />}
        {currentRole === "accountant" && <AccountantDashboard />}
        {currentRole === "cashier" && <CashierDashboard />}
        {currentRole === "staff" && <StaffDashboard />}
        {currentRole === "super_admin" && <OwnerDashboard />}
      </div>
    </div>
  );
}
