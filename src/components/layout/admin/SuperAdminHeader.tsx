import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Menu, X } from "lucide-react";
import { AppHeaderThemeToggle } from "../app/AppHeaderThemeToggle";
import { SuperAdminHeaderProfile } from "./SuperAdminHeaderProfile";

interface SuperAdminHeaderProps {
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

export function SuperAdminHeader({
  mobileOpen,
  onToggleMobile,
}: SuperAdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 h-16 shrink-0 border-b border-[#E2E8F0] dark:border-[#1E293B] bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md px-2.5 sm:px-4 lg:px-5 flex items-center justify-between shadow-subtle-xs gap-1.5 sm:gap-2">
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
        <button
          onClick={onToggleMobile}
          className="md:hidden p-1.5 sm:p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted shrink-0"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="h-8 w-8 sm:h-8.5 sm:w-8.5 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black text-sm sm:text-base shadow-sm shadow-purple-500/30 shrink-0">
            <ShieldCheck className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
          </div>
          <div className="min-w-0">
            <span className="font-bold text-xs sm:text-sm tracking-tight text-foreground flex items-center gap-1.5 truncate">
              <span className="truncate">Super Admin</span>
              <span className="px-1.5 py-0.2 rounded-md text-[10px] font-extrabold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 shrink-0">
                ROOT
              </span>
            </span>
            <span className="hidden sm:block text-[10px] text-muted-foreground leading-none font-medium truncate">
              XYZ Business OS Platform Management
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 flex-nowrap">
        <Link
          href="/app/dashboard"
          className="flex items-center gap-1.5 px-2 sm:px-2.5 md:px-3 py-1.5 text-xs font-bold rounded-xl bg-muted/60 hover:bg-muted text-foreground border border-border/80 transition-colors shadow-subtle-xs shrink-0"
        >
          <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">Back to App</span>
        </Link>

        <AppHeaderThemeToggle />

        <SuperAdminHeaderProfile />
      </div>
    </header>
  );
}
