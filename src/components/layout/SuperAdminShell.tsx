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
  Users,
  DollarSign,
} from "lucide-react";
import { useTheme } from "next-themes";

const ADMIN_NAV = [
  { title: "Platform Overview", href: "/super-admin", icon: LayoutDashboard },
  { title: "Organizations (Tenants)", href: "/super-admin/organizations", icon: Building },
  { title: "Subscriptions", href: "/super-admin/subscriptions", icon: CreditCard },
  { title: "SaaS Plans", href: "/super-admin/plans", icon: Layers },
  { title: "Billing & Revenue", href: "/super-admin/billing", icon: DollarSign },
  { title: "Platform Analytics", href: "/super-admin/analytics", icon: BarChart },
  { title: "System Settings", href: "/super-admin/settings", icon: Settings },
];

export function SuperAdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      {/* Super Admin Topbar */}
      <header className="sticky top-0 z-40 h-16 border-b border-border bg-card/95 backdrop-blur-md px-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-purple-500/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-foreground flex items-center gap-1.5">
                Super Admin Console
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                  ROOT
                </span>
              </span>
              <span className="text-[10px] text-muted-foreground block leading-none font-medium">
                XYZ Business OS Platform Management
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Tenant App</span>
          </Link>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
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
          className={`w-64 border-r border-border bg-card shrink-0 flex flex-col justify-between overflow-y-auto transition-all md:flex ${
            mobileOpen ? "fixed inset-y-0 left-0 z-50 shadow-2xl flex" : "hidden md:flex"
          }`}
        >
          <div className="p-4 space-y-1">
            <h4 className="px-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
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
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-purple-600 text-white shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-border bg-muted/20 text-xs text-muted-foreground">
            <div className="font-semibold text-foreground">Multi-Tenant Platform v2.4</div>
            <div className="text-[11px] mt-0.5">PostgreSQL & Dexie.js Enabled</div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
