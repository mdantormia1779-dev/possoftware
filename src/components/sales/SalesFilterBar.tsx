import React from "react";
import { Search } from "lucide-react";
import { Branch } from "@/types";

interface SalesFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedBranch: string;
  onBranchChange: (val: string) => void;
  selectedPayment: string;
  onPaymentChange: (val: string) => void;
  branches: Branch[];
}

export function SalesFilterBar({
  searchQuery,
  onSearchChange,
  selectedBranch,
  onBranchChange,
  selectedPayment,
  onPaymentChange,
  branches,
}: SalesFilterBarProps) {
  return (
    <div className="p-3 sm:p-4 rounded-xl border border-border bg-card shadow-subtle-xs grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
      <div className="relative sm:col-span-2">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search invoice (INV-2026...), customer name, phone..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-10 pl-10 pr-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
      </div>

      <div>
        <select
          value={selectedBranch}
          onChange={(e) => onBranchChange(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs cursor-pointer"
        >
          <option value="all">All Outlets / Branches</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          value={selectedPayment}
          onChange={(e) => onPaymentChange(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs cursor-pointer"
        >
          <option value="all">All Payment Methods</option>
          <option value="cash">Cash in Till</option>
          <option value="bkash">bKash Merchant</option>
          <option value="nagad">Nagad / Rocket</option>
          <option value="card">Card (POS)</option>
          <option value="due">Customer Due / Credit</option>
        </select>
      </div>
    </div>
  );
}
