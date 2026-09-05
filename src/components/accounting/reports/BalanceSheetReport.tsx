import React from "react";
import { formatCurrency } from "@/lib/utils";

interface BalanceSheetReportProps {
  cashAndBanks: number;
  accountsReceivable: number;
  inventoryAsset: number;
  totalCurrentAssets: number;
  accountsPayable: number;
  taxPayable: number;
  accruedSalaries: number;
  ownerEquity: number;
  retainedEarnings: number;
  totalLiabilitiesAndEquity: number;
}

export function BalanceSheetReport({
  cashAndBanks,
  accountsReceivable,
  inventoryAsset,
  totalCurrentAssets,
  accountsPayable,
  taxPayable,
  accruedSalaries,
  ownerEquity,
  retainedEarnings,
  totalLiabilitiesAndEquity,
}: BalanceSheetReportProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-bold text-foreground uppercase tracking-wider text-xs border-b border-border pb-1">
          ASSETS (Current &amp; Non-Current)
        </h4>
        <div className="flex justify-between py-1">
          <span>Liquid Cash &amp; Corporate Bank Balances</span>
          <span className="font-mono">{formatCurrency(cashAndBanks)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span>Customer Accounts Receivable (Due)</span>
          <span className="font-mono">{formatCurrency(accountsReceivable)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span>Merchandise Inventory Valuation (Asset)</span>
          <span className="font-mono">{formatCurrency(inventoryAsset)}</span>
        </div>
        <div className="flex justify-between py-2 font-extrabold border-t-2 border-border text-indigo-600 dark:text-indigo-400">
          <span>TOTAL ASSETS:</span>
          <span className="font-mono text-sm">{formatCurrency(totalCurrentAssets)}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-bold text-foreground uppercase tracking-wider text-xs border-b border-border pb-1">
          LIABILITIES &amp; OWNER EQUITY
        </h4>
        <div className="flex justify-between py-1">
          <span>Supplier Accounts Payable</span>
          <span className="font-mono">{formatCurrency(accountsPayable)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span>NBR VAT / Tax Payable</span>
          <span className="font-mono">{formatCurrency(taxPayable)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span>Accrued Month-End Salaries</span>
          <span className="font-mono">{formatCurrency(accruedSalaries)}</span>
        </div>
        <div className="flex justify-between py-1.5 font-bold border-t border-border">
          <span>Owner Capital &amp; Equity</span>
          <span className="font-mono">{formatCurrency(ownerEquity)}</span>
        </div>
        <div className="flex justify-between py-1 text-muted-foreground">
          <span>Retained Earnings &amp; Accumulated Surplus</span>
          <span className="font-mono">{formatCurrency(retainedEarnings)}</span>
        </div>
        <div className="flex justify-between py-2 font-extrabold border-t-2 border-border text-indigo-600 dark:text-indigo-400">
          <span>TOTAL LIABILITIES &amp; EQUITY:</span>
          <span className="font-mono text-sm">{formatCurrency(totalLiabilitiesAndEquity)}</span>
        </div>
      </div>
    </div>
  );
}
