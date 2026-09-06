import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV } from "./SuperAdminNav";
import { SuperAdminUserFooter } from "./SuperAdminUserFooter";

interface SuperAdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function SuperAdminSidebar({ mobileOpen, onClose }: SuperAdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`w-64 border-r border-border/80 bg-card shrink-0 flex flex-col justify-between overflow-y-auto transition-all duration-200 md:flex ${
        mobileOpen
          ? "fixed inset-y-0 left-0 z-50 shadow-2xl flex bg-card"
          : "hidden md:flex"
      }`}
    >
      <div className="p-3.5 space-y-1 flex-1">
        <h4 className="px-2.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
          Platform Administration
        </h4>
        {ADMIN_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[#EEF2FF] dark:bg-indigo-950/40 text-[#4F46E5] dark:text-[#818CF8] font-bold border border-indigo-200/50 dark:border-indigo-800/40 shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-[#F8FAFC] dark:hover:bg-slate-800/60"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#4F46E5] dark:bg-[#818CF8] rounded-r-full" />
              )}
              <Icon
                className={`h-4 w-4 ${
                  isActive ? "text-[#4F46E5] dark:text-[#818CF8]" : "text-slate-400"
                }`}
              />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      <SuperAdminUserFooter />
    </aside>
  );
}
