"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  badge?: string | number;
}

interface TabsProps {
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
      <div className={cn("flex border-b border-border/80 gap-6 overflow-x-auto", className)}>
        {items.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "pb-3 text-xs sm:text-sm font-semibold transition-all relative flex items-center gap-2 select-none shrink-0",
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                    isActive
                      ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex p-1 rounded-xl bg-muted/60 border border-border/60 gap-1 overflow-x-auto",
        className
      )}
    >
      {items.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 select-none shrink-0",
              isActive
                ? "bg-card text-foreground shadow-subtle-xs font-bold"
                : "text-muted-foreground hover:text-foreground hover:bg-card/40"
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded-md font-bold",
                  isActive
                    ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
