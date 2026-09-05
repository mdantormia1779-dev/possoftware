"use client";

import React, { useState } from "react";
import { storageService } from "@/lib/services/storage";
import { JournalEntry } from "@/lib/types";
import { Search } from "lucide-react";
import { JournalHeader } from "@/components/accounting/JournalHeader";
import { JournalInfoBanner } from "@/components/accounting/JournalInfoBanner";
import { JournalEntryCard } from "@/components/accounting/JournalEntryCard";

export default function JournalEntriesPage() {
  const [journals] = useState<JournalEntry[]>(() => storageService.getJournalEntries());
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
      <JournalHeader />
      <JournalInfoBanner />

      <div className="p-4 rounded-xl border border-border bg-card shadow-subtle-xs">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search entry number (JE-...), reference (INV-..., PAY-...), or description..."
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
