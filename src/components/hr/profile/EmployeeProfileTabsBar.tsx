import React from "react";
import { Users, CalendarCheck, Calendar, FileText, Award } from "lucide-react";

export type EmployeeProfileTab = "profile" | "attendance" | "leave" | "payroll" | "commissions";

const TABS = [
  { id: "profile" as EmployeeProfileTab, label: "Profile & Bank", icon: Users },
  { id: "attendance" as EmployeeProfileTab, label: "Attendance Record", icon: CalendarCheck },
  { id: "leave" as EmployeeProfileTab, label: "Leave Balance", icon: Calendar },
  { id: "payroll" as EmployeeProfileTab, label: "Monthly Payslip", icon: FileText },
  { id: "commissions" as EmployeeProfileTab, label: "Sales Commission", icon: Award },
];

interface EmployeeProfileTabsBarProps {
  activeTab: EmployeeProfileTab;
  onTabChange: (tab: EmployeeProfileTab) => void;
}

export function EmployeeProfileTabsBar({
  activeTab,
  onTabChange,
}: EmployeeProfileTabsBarProps) {
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
              isActive
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
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
