"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building,
  CreditCard,
  Layers,
  BarChart,
  Settings,
  ShieldCheck,
  ArrowLeft,
  Sun,
  Moon,
  Menu,
  X,
  DollarSign,
  Activity,
} from "lucide-react";
import { useTheme } from "next-themes";

const ADMIN_NAV = [
  { title: "Platform Overview", href: "/super-admin", icon: LayoutDashboard },
  {
    title: "Organizations (Tenants)",
    href: "/super-admin/organizations",
    icon: Building,
  },
  {
    title: "Subscriptions",
    href: "/super-admin/subscriptions",
    icon: CreditCard,
  },
  { title: "SaaS Plans", href: "/super-admin/plans", icon: Layers },
  {
    title: "Billing & Revenue",
    href: "/super-admin/billing",
    icon: DollarSign,
  },
  {
    title: "Platform Analytics",
    href: "/super-admin/analytics",
    icon: BarChart,
  },
  { title: "System Settings", href: "/super-admin/settings", icon: Settings },
];

export function SuperAdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-purple-500/20 selection:text-purple-600">
      {/* Super Admin Topbar */}
      <header className="sticky top-0 z-40 h-15 border-b border-border/80 bg-card/85 backdrop-blur-md px-3 sm:px-4 flex items-center justify-between shadow-subtle-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="h-8.5 w-8.5 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-purple-500/30">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm tracking-tight text-foreground flex items-center gap-1.5">
                Super Admin Console
                <span className="px-1.5 py-0.2 rounded-md text-[10px] font-extrabold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                  ROOT
                </span>
              </span>
              <span className="text-[10px] text-muted-foreground block leading-none font-medium">
                XYZ Business OS Platform Management
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/app/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-muted/60 hover:bg-muted text-foreground border border-border/80 transition-colors shadow-subtle-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to App</span>
          </Link>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
            title="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Admin Sidebar */}
        <aside
          className={`w-64 border-r border-border/80 bg-card shrink-0 flex flex-col justify-between overflow-y-auto transition-all duration-200 md:flex ${
            mobileOpen
              ? "fixed inset-y-0 left-0 z-50 shadow-2xl flex bg-card"
              : "hidden md:flex"
          }`}
        >
          <div className="p-3.5 space-y-1">
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
                  onClick={() => setMobileOpen(false)}
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

          <div className="p-3.5 border-t border-border/80 bg-muted/20 text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <Activity className="h-3.5 w-3.5 text-emerald-500" /> Multi-Tenant
              Platform
            </div>
            <div className="text-[11px]">Next.js 15 & Dexie.js Engine</div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
