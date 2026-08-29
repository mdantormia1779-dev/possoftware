"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { JournalEntry } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Receipt,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Sparkles,
  Search,
  Filter,
  Plus,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function JournalEntriesPage() {
  const [journals, setJournals] = useState<JournalEntry[]>(() => storageService.getJournalEntries());
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJournals = journals.filter((j) => {
    return (
      j.entryNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (j.referenceId && j.referenceId.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

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
              <Receipt className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span>General Journal Entries</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Automated double-entry debit & credit postings generated directly from POS, Purchases & Payroll
            </p>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-2 text-xs font-bold">
          <CheckCircle2 className="h-4 w-4" />
          <span>All Ledgers Strictly Balanced (Debit = Credit)</span>
        </div>
      </div>

      {/* Auto-Journal Explainer Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-300">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          <span>Automated Accounting Engine Active</span>
        </div>
        <p className="text-muted-foreground">
          When cashiers ring sales, inventory is received, or salaries are paid, XYZ Business OS automatically writes compliant double-entry transactions with corresponding references.
        </p>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search entry number (JE-...), reference (INV-..., PAY-...), or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Journals List */}
      <div className="space-y-4">
        {filteredJournals.map((entry) => (
          <div
            key={entry.id}
            className="rounded-2xl border border-border bg-card shadow-2xs overflow-hidden"
          >
            {/* Entry Header */}
            <div className="p-4 bg-muted/30 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                  {entry.entryNumber}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-muted font-bold text-[10px] text-muted-foreground uppercase">
                  {entry.referenceType}
                </span>
                {entry.referenceId && (
                  <span className="font-mono text-muted-foreground">
                    Ref: <strong className="text-foreground">{entry.referenceId}</strong>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span>Date: {formatDate(entry.date)}</span>
                <span>•</span>
                <span>By: {entry.createdByName}</span>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 py-2 text-xs font-medium text-foreground bg-card">
              {entry.description}
            </div>

            {/* Double-Entry Lines Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-t border-b border-border bg-muted/10 text-[11px] text-muted-foreground">
                    <th className="p-3">Account Code & Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3 text-right">Debit (৳)</th>
                    <th className="p-3 text-right">Credit (৳)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {entry.lines.map((line) => (
                    <tr key={line.id} className="hover:bg-muted/20">
                      <td className="p-3">
                        <span className="font-mono font-semibold text-muted-foreground mr-2">
                          {line.accountCode}
                        </span>
                        <span className="font-medium text-foreground">{line.accountName}</span>
                      </td>
                      <td className="p-3 uppercase text-[10px] text-muted-foreground font-semibold">
                        {line.accountType}
                      </td>
                      <td className="p-3 text-right font-mono font-semibold text-foreground">
                        {line.debit > 0 ? formatCurrency(line.debit) : "-"}
                      </td>
                      <td className="p-3 text-right font-mono font-semibold text-foreground">
                        {line.credit > 0 ? formatCurrency(line.credit) : "-"}
                      </td>
                    </tr>
                  ))}
                  {/* Total Balanced Row */}
                  <tr className="bg-muted/30 font-bold border-t border-border">
                    <td colSpan={2} className="p-3 text-right text-xs">
                      Entry Totals (Balanced):
                    </td>
                    <td className="p-3 text-right font-mono text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(entry.totalDebit)}
                    </td>
                    <td className="p-3 text-right font-mono text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(entry.totalCredit)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
