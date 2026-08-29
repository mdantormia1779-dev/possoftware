"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { ChartOfAccount, AccountType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Layers, Plus, ArrowLeft, Search, Filter, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ChartOfAccountsPage() {
  const { currentOrg } = useTenant();
  const [accounts, setAccounts] = useState<ChartOfAccount[]>(() => storageService.getAccounts());
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newAcc, setNewAcc] = useState({
    code: "",
    name: "",
    type: "asset" as AccountType,
    balance: 0,
    description: "",
  });

  const filteredAccounts = accounts.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.code.includes(searchQuery);
    const matchesType = selectedType === "all" || a.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAcc.code || !newAcc.name) return;

    const created: ChartOfAccount = {
      id: `acc-${Date.now()}`,
      organizationId: currentOrg.id,
      code: newAcc.code,
      name: newAcc.name,
      type: newAcc.type,
      balance: Number(newAcc.balance) || 0,
      isSystem: false,
      description: newAcc.description,
    };

    storageService.addAccount(created);
    setAccounts(storageService.getAccounts());
    setShowAddModal(false);
  };

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
              <Layers className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span>Chart of Accounts (COA)</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Standard 5-category financial ledger structure (Assets, Liabilities, Equity, Revenue, Expenses)
            </p>
          </div>
        </div>

        <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-1" /> Add New Ledger Account
        </Button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search account name (e.g. Cash, bKash, Salary, COGS) or ledger code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-foreground uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All 5 Account Types</option>
            <option value="asset">1000 - Assets</option>
            <option value="liability">2000 - Liabilities</option>
            <option value="equity">3000 - Equity</option>
            <option value="revenue">4000 - Revenue</option>
            <option value="expense">5000 - Expenses</option>
          </select>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-3.5 font-semibold text-foreground">Code</th>
                <th className="p-3.5 font-semibold text-foreground">Account Name</th>
                <th className="p-3.5 font-semibold text-foreground">Account Type</th>
                <th className="p-3.5 font-semibold text-foreground">Description</th>
                <th className="p-3.5 text-right font-semibold text-foreground">Current Balance (৳)</th>
                <th className="p-3.5 text-right font-semibold text-foreground">Nature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAccounts.map((acc) => {
                const isAssetOrExpense = acc.type === "asset" || acc.type === "expense";

                return (
                  <tr key={acc.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {acc.code}
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-foreground">{acc.name}</span>
                      {acc.isSystem && (
                        <span className="ml-2 text-[9px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground font-semibold">
                          System Auto
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 uppercase font-bold text-[10px] text-muted-foreground">
                      <span
                        className={`px-2 py-0.5 rounded-full ${
                          acc.type === "asset"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                            : acc.type === "liability"
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                            : acc.type === "equity"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                            : acc.type === "revenue"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        }`}
                      >
                        {acc.type}
                      </span>
                    </td>
                    <td className="p-3.5 text-muted-foreground">{acc.description || "-"}</td>
                    <td className="p-3.5 text-right font-mono font-bold text-foreground">
                      {formatCurrency(acc.balance)}
                    </td>
                    <td className="p-3.5 text-right text-[10px] text-muted-foreground font-semibold">
                      {isAssetOrExpense ? "Normal Debit" : "Normal Credit"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h3 className="text-base font-bold text-foreground">Add General Ledger Account</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddAccount} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Account Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5070"
                    value={newAcc.code}
                    onChange={(e) => setNewAcc({ ...newAcc, code: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Account Type</label>
                  <select
                    value={newAcc.type}
                    onChange={(e) => setNewAcc({ ...newAcc, type: e.target.value as AccountType })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  >
                    <option value="asset">Asset</option>
                    <option value="liability">Liability</option>
                    <option value="equity">Equity</option>
                    <option value="revenue">Revenue</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Account Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Generator Fuel & Maintenance"
                  value={newAcc.name}
                  onChange={(e) => setNewAcc({ ...newAcc, name: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Opening Balance (৳)</label>
                <input
                  type="number"
                  value={newAcc.balance}
                  onChange={(e) => setNewAcc({ ...newAcc, balance: parseFloat(e.target.value) || 0 })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Description / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Outlets backup power generator expenses"
                  value={newAcc.description}
                  onChange={(e) => setNewAcc({ ...newAcc, description: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
