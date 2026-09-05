"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TabButton } from "./TabButton";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  badge?: string | number;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "pill" | "underline" | "bordered";
}

export function Tabs({
  items,
  activeId,
  onChange,
  className,
  variant = "pill",
}: TabsProps) {
  if (variant === "underline") {
    return (
      <div className={cn("flex border-b border-[#E2E8F0] dark:border-[#1E293B] gap-6 overflow-x-auto", className)}>
        {items.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={tab.id === activeId}
            variant="underline"
            onClick={() => onChange(tab.id)}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex p-1 rounded-lg bg-[#F1F5F9] dark:bg-[#1E293B]/70 border border-[#E2E8F0] dark:border-[#1E293B] gap-1 overflow-x-auto",
        className
      )}
    >
      {items.map((tab) => (
        <TabButton
          key={tab.id}
          tab={tab}
          isActive={tab.id === activeId}
          variant={variant}
          onClick={() => onChange(tab.id)}
        />
      ))}
    </div>
  );
}
