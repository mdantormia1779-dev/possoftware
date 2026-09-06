"use client";

import React, { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { accountingService } from "@/services/accounting.service";
import { JournalEntry } from "@/lib/types";
import { Search } from "lucide-react";
import { JournalHeader } from "@/components/accounting/JournalHeader";
import { JournalInfoBanner } from "@/components/accounting/JournalInfoBanner";
import { JournalEntryCard } from "@/components/accounting/JournalEntryCard";

export default function JournalEntriesPage() {
  const { currentOrg } = useTenant();
  const [journals, setJournals] = useState<JournalEntry[]>(() => storageService.getJournalEntries());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    accountingService.getJournals(currentOrg?.id).then((res) => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setJournals(res.data);
      }
    });
  }, [currentOrg?.id]);

  const filteredJournals = journals.filter((j) => {
    const q = searchQuery.toLowerCase();
    return j.entryNumber.toLowerCase().includes(q) ||
      j.description.toLowerCase().includes(q) ||
      (j.referenceId && j.referenceId.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      <JournalHeader />
      <JournalInfoBanner />

      <div className="p-4 rounded-xl border border-border bg-card shadow-subtle-xs">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search entry number (JE-...), reference (INV-...), or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredJournals.map((entry) => (
          <JournalEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
