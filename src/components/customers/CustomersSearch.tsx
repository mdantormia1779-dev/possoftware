import React from "react";
import { Search } from "lucide-react";

interface CustomersSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CustomersSearch({
  searchQuery,
  onSearchChange,
}: CustomersSearchProps) {
  return (
    <div className="p-3 sm:p-4 rounded-xl border border-border bg-card shadow-subtle-xs">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search customers by name, phone (017...), or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-10 pl-10 pr-3 rounded-lg border border-border bg-card text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>
    </div>
  );
}
