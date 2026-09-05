import React from "react";
import {
  Building2,
  ShoppingBag,
  Boxes,
  Users,
  ArrowRightLeft,
  FileBarChart,
} from "lucide-react";

export type BranchTabType = "overview" | "sales" | "inventory" | "employees" | "transfers" | "reports";

const TABS = [
  { id: "overview" as BranchTabType, label: "Overview", icon: Building2 },
  { id: "sales" as BranchTabType, label: "Recent Sales", icon: ShoppingBag },
  { id: "inventory" as BranchTabType, label: "Stock & Shelf", icon: Boxes },
  { id: "employees" as BranchTabType, label: "Staff & Attendance", icon: Users },
  { id: "transfers" as BranchTabType, label: "Stock Transfers", icon: ArrowRightLeft },
  { id: "reports" as BranchTabType, label: "P&L Summary", icon: FileBarChart },
];

interface BranchDetailTabsBarProps {
  activeTab: BranchTabType;
  onTabChange: (tab: BranchTabType) => void;
}

export function BranchDetailTabsBar({
  activeTab,
  onTabChange,
}: BranchDetailTabsBarProps) {
  return (
    <div className="flex items-center gap-1 border-b border-border overflow-x-auto pb-1 text-xs">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              isActive ? "bg-indigo-600 text-white shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
