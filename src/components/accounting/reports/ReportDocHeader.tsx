import React from "react";
import { Organization } from "@/types";

interface ReportDocHeaderProps {
  currentOrg: Organization;
  activeTab: "pnl" | "balance_sheet" | "trial_balance";
}

export function ReportDocHeader({ currentOrg, activeTab }: ReportDocHeaderProps) {
  return (
    <div className="text-center border-b border-border pb-6 space-y-1">
      <h2 className="text-xl font-bold text-foreground uppercase tracking-wide">{currentOrg.name}</h2>
      <p className="text-xs text-muted-foreground">{currentOrg.address} • BIN: {currentOrg.taxNumber}</p>
      <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 pt-2 uppercase">
        {activeTab === "pnl" && "Statement of Profit and Loss (P&L)"}
        {activeTab === "balance_sheet" && "Statement of Financial Position (Balance Sheet)"}
        {activeTab === "trial_balance" && "General Ledger Trial Balance"}
      </div>
      <p className="text-[11px] text-muted-foreground">For the period ended 28 February 2026 • Currency in BDT (৳)</p>
    </div>
  );
}

export function ReportDocFooter() {
  return (
    <div className="pt-8 border-t border-border flex justify-between items-center text-[10px] text-muted-foreground">
      <div>Prepared by: Kazi Mahfuzur Rahman (Chief Accountant)</div>
      <div>Authorized Signature: _______________________</div>
    </div>
  );
}
