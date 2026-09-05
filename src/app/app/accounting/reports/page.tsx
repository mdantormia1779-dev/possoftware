"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { FinancialReportsHeader } from "@/components/accounting/reports/FinancialReportsHeader";
import { ReportDocHeader, ReportDocFooter } from "@/components/accounting/reports/ReportDocHeader";
import { ProfitLossReport } from "@/components/accounting/reports/ProfitLossReport";
import { BalanceSheetReport } from "@/components/accounting/reports/BalanceSheetReport";
import { TrialBalanceReport } from "@/components/accounting/reports/TrialBalanceReport";
import { useAccountingReports } from "@/components/accounting/reports/useAccountingReports";

export default function FinancialReportsPage() {
  const { currentOrg } = useTenant();
  const [activeTab, setActiveTab] = useState<"pnl" | "balance_sheet" | "trial_balance">("pnl");
  const { accounts, pnl, balanceSheet } = useAccountingReports();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <FinancialReportsHeader
        orgName={currentOrg.name}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrint={() => window.print()}
      />

      <div className="p-8 sm:p-12 rounded-3xl border border-border bg-card shadow-sm text-xs space-y-8 font-sans">
        <ReportDocHeader currentOrg={currentOrg} activeTab={activeTab} />

        {activeTab === "pnl" && <ProfitLossReport {...pnl} />}

        {activeTab === "balance_sheet" && <BalanceSheetReport {...balanceSheet} />}

        {activeTab === "trial_balance" && <TrialBalanceReport accounts={accounts} />}

        <ReportDocFooter />
      </div>
    </div>
  );
}
