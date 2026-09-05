import React from "react";
import { Search } from "lucide-react";

interface CoaFilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;
}

export function CoaFilterBar({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
}: CoaFilterBarProps) {
  return (
    <div className="p-4 rounded-xl border border-border bg-card shadow-subtle-xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
      <div className="relative sm:col-span-2">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search account name (e.g. Cash, bKash, Salary, COGS) or ledger code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
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
  );
}
