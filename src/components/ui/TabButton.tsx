import React from "react";
import { cn } from "@/lib/utils";
import { TabItem } from "./Tabs";

interface TabButtonProps {
  tab: TabItem;
  isActive: boolean;
  variant: "pill" | "underline" | "bordered";
  onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({ tab, isActive, variant, onClick }) => {
  const Icon = tab.icon;

  if (variant === "underline") {
    return (
      <button
        onClick={onClick}
        className={cn(
          "pb-3 text-xs sm:text-sm font-medium transition-all relative flex items-center gap-2 select-none shrink-0",
          isActive
            ? "text-[#4F46E5] dark:text-[#818CF8] font-semibold"
            : "text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]"
        )}
      >
        {Icon && <Icon className="h-4 w-4" />}
        <span>{tab.label}</span>
        {tab.badge !== undefined && (
          <span
            className={cn(
              "text-[10px] px-1.5 py-0.2 rounded-md font-bold",
              isActive
                ? "bg-[#EEF2FF] text-[#4F46E5] dark:bg-indigo-950 dark:text-[#818CF8]"
                : "bg-[#F1F5F9] dark:bg-[#1E293B] text-[#475569] dark:text-[#94A3B8]"
            )}
          >
            {tab.badge}
          </span>
        )}
        {isActive && (
          <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#4F46E5] dark:bg-[#818CF8] rounded-full" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 select-none shrink-0",
        isActive
          ? "bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] shadow-subtle-xs font-semibold"
          : "text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]"
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      <span>{tab.label}</span>
      {tab.badge !== undefined && (
        <span
          className={cn(
            "text-[10px] px-1.5 py-0.2 rounded-md font-bold",
            isActive
              ? "bg-[#EEF2FF] text-[#4F46E5] dark:bg-indigo-950 dark:text-[#818CF8]"
              : "bg-[#E2E8F0] dark:bg-[#334155] text-[#475569] dark:text-[#94A3B8]"
          )}
        >
          {tab.badge}
        </span>
      )}
    </button>
  );
};
