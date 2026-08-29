"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, ArrowLeft, RefreshCw, Plus, CheckCircle2, Building, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/Button";

const BANK_ACCOUNTS_LIST = [
  { id: "b-1", name: "City Bank Corporate Current", code: "1040", acNumber: "110293847001", branch: "Gulshan Avenue Branch", balance: 845000, type: "Bank", status: "reconciled" },
  { id: "b-2", name: "bKash Corporate Merchant", code: "1020", acNumber: "01711-223344 (Wallet)", branch: "Head Office", balance: 142800, type: "Mobile Banking", status: "reconciled" },
  { id: "b-3", name: "Nagad / Rocket Merchant Hub", code: "1030", acNumber: "01819-998877", branch: "Head Office", balance: 58500, type: "Mobile Banking", status: "reconciled" },
  { id: "b-4", name: "Daily Retail Register Cash in Till", code: "1010", acNumber: "POS-BANANI-01", branch: "Banani Flagship", balance: 64200, type: "Cash", status: "reconciled" },
];

export default function BanksReconciliationPage() {
  const [accounts, setAccounts] = useState(BANK_ACCOUNTS_LIST);
  const totalLiquidCash = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/app/accounting" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span>Cash & Bank Reconciliation</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live balances across corporate bank accounts, bKash, Nagad, and physical POS registers
            </p>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
          Total Liquid Capital: {formatCurrency(totalLiquidCash)}
        </div>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-foreground">{acc.name}</h3>
                  <span className="text-xs font-mono text-muted-foreground">
                    A/C: {acc.acNumber} | Ledger {acc.code}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {acc.type}
                </span>
              </div>

              <div className="text-2xl font-extrabold text-foreground">{formatCurrency(acc.balance)}</div>
              <p className="text-xs text-muted-foreground">Branch: {acc.branch}</p>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <CheckCircle2 className="h-4 w-4" /> Reconciled
              </span>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-3.5 w-3.5 mr-1" /> Match Statements
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
