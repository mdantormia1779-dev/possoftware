"use client";

import React from "react";
import { storageService } from "@/lib/services/storage";
import { AccountantHeader } from "./accountant/AccountantHeader";
import { AccountantKpis } from "./accountant/AccountantKpis";
import { LiquidTreasuryCard, LiquidAccountItem } from "./accountant/LiquidTreasuryCard";
import { TopReceivablesCard } from "./accountant/TopReceivablesCard";
import { RecentJournalPostings } from "./accountant/RecentJournalPostings";

export function AccountantDashboard() {
  const sales = storageService.getSales();
  const customers = storageService.getCustomers();
  const journals = storageService.getJournalEntries();

  // Metrics
  const todaySalesTotal = sales.reduce((sum, s) => sum + s.grandTotal, 0);
  const totalVATCollected = sales.reduce((sum, s) => sum + (s.taxAmount || 0), 0);
  const totalCustomerDue = customers.reduce((sum, c) => sum + c.dueBalance, 0);

  // Bank & Liquid Accounts
  const liquidAccounts: LiquidAccountItem[] = [
    { name: "City Bank (Corporate Current)", number: "A/C: 1102948291001", balance: 842000, type: "Bank" },
    { name: "bKash Merchant Account", number: "Wallet: 01700-000000", balance: 285400, type: "MFS" },
    { name: "Main Cash Till (Counter Drawers)", number: "All Branches", balance: 45200, type: "Cash" },
  ];
  const totalLiquidCash = liquidAccounts.reduce((sum, a) => sum + a.balance, 0);

  // Customers with outstanding dues
  const dueCustomers = customers.filter((c) => c.dueBalance > 0).sort((a, b) => b.dueBalance - a.dueBalance);

  return (
    <div className="space-y-6">
      <AccountantHeader />

      <AccountantKpis
        todaySalesTotal={todaySalesTotal}
        totalVATCollected={totalVATCollected}
        totalLiquidCash={totalLiquidCash}
        totalCustomerDue={totalCustomerDue}
        debtorsCount={dueCustomers.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <LiquidTreasuryCard accounts={liquidAccounts} />
        <TopReceivablesCard dueCustomers={dueCustomers} />
      </div>

      <RecentJournalPostings journals={journals} />
    </div>
  );
}
