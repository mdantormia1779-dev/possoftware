"use client";

import React from "react";
import { storageService } from "@/lib/services/storage";
import { AccountingHeader } from "@/components/accounting/AccountingHeader";
import { AccountingKpis } from "@/components/accounting/AccountingKpis";
import { LiquidAccountsGrid } from "@/components/accounting/LiquidAccountsGrid";
import { AccountingQuickLinks } from "@/components/accounting/AccountingQuickLinks";

export default function AccountingOverviewPage() {
  const accounts = storageService.getAccounts();
  const journals = storageService.getJournalEntries();

  // Aggregate balance by Account Types
  const totalAssets = accounts
    .filter((a) => a.type === "asset")
    .reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilities = accounts
    .filter((a) => a.type === "liability")
    .reduce((sum, a) => sum + a.balance, 0);
  const totalRevenue = accounts
    .filter((a) => a.type === "revenue")
    .reduce((sum, a) => sum + a.balance, 0);
  const totalExpenses = accounts
    .filter((a) => a.type === "expense")
    .reduce((sum, a) => sum + a.balance, 0);
  const netOperatingProfit = totalRevenue - totalExpenses;

  // Specific cash & bank liquid balances
  const cashInHand = accounts.find((a) => a.code === "1010")?.balance || 0;
  const bkashMerchant = accounts.find((a) => a.code === "1020")?.balance || 0;
  const cityBankCurrent = accounts.find((a) => a.code === "1040")?.balance || 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <AccountingHeader journalsCount={journals.length} />

      <AccountingKpis
        totalRevenue={totalRevenue}
        totalExpenses={totalExpenses}
        netOperatingProfit={netOperatingProfit}
        totalAssets={totalAssets}
      />

      <LiquidAccountsGrid
        cashInHand={cashInHand}
        bkashMerchant={bkashMerchant}
        cityBankCurrent={cityBankCurrent}
      />

      <AccountingQuickLinks accountsCount={accounts.length} />
    </div>
  );
}
