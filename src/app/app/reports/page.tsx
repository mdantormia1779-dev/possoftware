"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { ReportsHeader } from "@/components/reports/ReportsHeader";
import { ReportsFilterBar } from "@/components/reports/ReportsFilterBar";
import { ReportsSalesChart } from "@/components/reports/ReportsSalesChart";
import { ReportsDataTable } from "@/components/reports/ReportsDataTable";
import { MONTHLY_SALES_REPORT } from "@/components/reports/reportsData";

export default function ReportsCenterPage() {
  const { branches } = useTenant();
  const [selectedReportType, setSelectedReportType] = useState("sales");
  const [selectedBranch, setSelectedBranch] = useState("all");

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <ReportsHeader />

      <ReportsFilterBar
        selectedReportType={selectedReportType}
        setSelectedReportType={setSelectedReportType}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        branches={branches}
      />

      <ReportsSalesChart data={MONTHLY_SALES_REPORT} />

      <ReportsDataTable data={MONTHLY_SALES_REPORT} />
    </div>
  );
}
