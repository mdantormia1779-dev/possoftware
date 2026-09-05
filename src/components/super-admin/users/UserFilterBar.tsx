"use client";

import React from "react";
import { Search } from "lucide-react";

interface UserFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  roleFilter: string;
  onRoleFilterChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
}

export function UserFilterBar({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
}: UserFilterBarProps) {
  return (
    <div className="p-4 rounded-2xl border border-border bg-card flex flex-col md:flex-row items-center justify-between gap-3">
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by user, email, phone or company..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-9 pl-9 pr-3 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <select
          value={roleFilter}
          onChange={(e) => onRoleFilterChange(e.target.value)}
          className="h-9 px-3 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Roles</option>
          <option value="owner">Company Owners</option>
          <option value="manager">Branch Managers</option>
          <option value="cashier">Cashiers / Staff</option>
          <option value="accountant">Accountants</option>
          <option value="super_admin">Super Admins</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="h-9 px-3 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>
    </div>
  );
}
