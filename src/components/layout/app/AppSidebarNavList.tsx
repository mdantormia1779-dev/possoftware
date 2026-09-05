import React from "react";
import Link from "next/link";
import { NavSection } from "./nav/nav.types";

interface AppSidebarNavListProps {
  navSections: NavSection[];
  pathname: string;
  sidebarCollapsed: boolean;
  onItemClick: () => void;
}

export function AppSidebarNavList({
  navSections,
  pathname,
  sidebarCollapsed,
  onItemClick,
}: AppSidebarNavListProps) {
  return (
    <div className="space-y-4">
      {navSections.map((section, idx) => (
        <div key={idx} className="space-y-0.5">
          {!sidebarCollapsed && (
            <h4 className="px-2.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
              {section.title}
            </h4>
          )}
          {section.items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onItemClick}
                title={sidebarCollapsed ? item.title : undefined}
                className={`relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? "bg-[#EEF2FF] dark:bg-indigo-950/40 text-[#4F46E5] dark:text-[#818CF8] font-bold border border-indigo-200/50 dark:border-indigo-800/40 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-[#F8FAFC] dark:hover:bg-slate-800/60"
                } ${sidebarCollapsed ? "justify-center px-2" : ""}`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#4F46E5] dark:bg-[#818CF8] rounded-r-full" />
                )}
                <div className="flex items-center gap-2.5 truncate">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-105 ${
                      isActive
                        ? "text-[#4F46E5] dark:text-[#818CF8]"
                        : "text-slate-400 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200"
                    }`}
                  />
                  {!sidebarCollapsed && <span className="truncate">{item.title}</span>}
                </div>
                {!sidebarCollapsed && item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold shrink-0 ${
                      isActive
                        ? "bg-indigo-200/70 dark:bg-indigo-900/60 text-[#4F46E5] dark:text-[#818CF8]"
                        : "bg-muted text-muted-foreground border border-border/60"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
