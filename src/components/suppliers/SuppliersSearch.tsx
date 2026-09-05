import React from "react";
import { Search } from "lucide-react";

interface SuppliersSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SuppliersSearch({
  searchQuery,
  onSearchChange,
}: SuppliersSearchProps) {
  return (
    <div className="p-3 sm:p-4 rounded-xl border border-border bg-card shadow-subtle-xs">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search suppliers by contact person or company name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-10 pl-10 pr-3 rounded-lg border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>
    </div>
  );
}
