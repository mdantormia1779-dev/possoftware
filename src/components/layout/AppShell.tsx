"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTenant } from "@/lib/context/TenantContext";
import { UserRole } from "@/lib/types";
import {
  LayoutDashboard,
  ShoppingCart,
  Receipt,
  Package,
  Boxes,
  Truck,
  Building2,
  BookOpen,
  Users,
  CalendarCheck,
  CreditCard,
  Percent,
  Contact,
  Gift,
  Tag,
  Megaphone,
  BarChart3,
  Settings,
  Shield,
  Search,
  Wifi,
  WifiOff,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  X,
  RefreshCw,
  Sliders,
  LogOut,
  Sparkles,
  Layers,
} from "lucide-react";
import { useTheme } from "next-themes";
import { GlobalSearchModal } from "../ui/GlobalSearchModal";
import { SyncStatusModal } from "../ui/SyncStatusModal";
import { NotificationsDrawer } from "../ui/NotificationsDrawer";
import { ThermalReceiptModal } from "../pos/ThermalReceiptModal";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles?: UserRole[];
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Sales & POS",
    items: [
      { title: "POS Terminal", href: "/app/pos", icon: ShoppingCart, badge: "Offline" },
      { title: "Sales Invoices", href: "/app/sales", icon: Receipt },
      { title: "Customers", href: "/app/customers", icon: Contact },
    ],
  },
  {
    title: "Inventory & Stock",
    items: [
      { title: "Products & SKUs", href: "/app/products", icon: Package },
      { title: "Stock & Warehouses", href: "/app/inventory", icon: Boxes, roles: ["company_owner", "branch_manager", "accountant"] },
      { title: "Stock Transfers", href: "/app/inventory/transfers", icon: Truck, roles: ["company_owner", "branch_manager"] },
    ],
  },
  {
    title: "Purchases",
    items: [
      { title: "Purchase Orders", href: "/app/purchases", icon: Boxes, roles: ["company_owner", "branch_manager", "accountant"] },
      { title: "Suppliers", href: "/app/suppliers", icon: Building2, roles: ["company_owner", "accountant"] },
    ],
  },
  {
    title: "Accounting & Finance",
    items: [
      { title: "Accounting Overview", href: "/app/accounting", icon: BookOpen, roles: ["company_owner", "accountant"] },
      { title: "Chart of Accounts", href: "/app/accounting/chart-of-accounts", icon: Layers, roles: ["company_owner", "accountant"] },
      { title: "Journal Entries", href: "/app/accounting/journal", icon: Receipt, roles: ["company_owner", "accountant"], badge: "Auto" },
      { title: "Cash & Banks", href: "/app/accounting/banks", icon: CreditCard, roles: ["company_owner", "accountant"] },
      { title: "Financial Reports", href: "/app/accounting/reports", icon: BarChart3, roles: ["company_owner", "accountant"] },
    ],
  },
  {
    title: "HR & Payroll",
    items: [
      { title: "Employees", href: "/app/hr", icon: Users, roles: ["company_owner", "branch_manager"] },
      { title: "Daily Attendance", href: "/app/attendance", icon: CalendarCheck, roles: ["company_owner", "branch_manager"] },
      { title: "Payroll Runs", href: "/app/payroll", icon: CreditCard, roles: ["company_owner", "accountant"] },
      { title: "Commissions", href: "/app/commissions", icon: Percent, roles: ["company_owner", "branch_manager", "accountant"] },
    ],
  },
  {
    title: "CRM & Marketing",
    items: [
      { title: "Loyalty Program", href: "/app/loyalty", icon: Gift, roles: ["company_owner", "branch_manager"] },
      { title: "Coupons & Discounts", href: "/app/coupons", icon: Tag, roles: ["company_owner", "branch_manager"] },
      { title: "Broadcast Campaigns", href: "/app/campaigns", icon: Megaphone, roles: ["company_owner"] },
    ],
  },
  {
    title: "Analytics",
    items: [
      { title: "Reports Center", href: "/app/reports", icon: BarChart3, roles: ["company_owner", "branch_manager", "accountant"] },
    ],
  },
  {
    title: "Administration",
    items: [
      { title: "Branches", href: "/app/branches", icon: Building2, roles: ["company_owner"] },
      { title: "Settings & Branding", href: "/app/settings", icon: Settings, roles: ["company_owner"] },
      { title: "Subscription & Billing", href: "/app/subscription", icon: Shield, roles: ["company_owner"] },
    ],
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    currentOrg,
    currentBranch,
    setCurrentBranch,
    branches,
    currentRole,
    setCurrentRole,
    isOnline,
    setIsOnline,
    syncQueue,
    isSyncing,
    setIsSearchModalOpen,
    setIsSyncModalOpen,
    unreadNotificationCount,
  } = useTenant();

  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  // Filter items based on current role permissions
  const filterSectionItems = (items: NavItem[]) => {
    return items.filter((item) => {
      if (!item.roles) return true;
      if (currentRole === "super_admin" || currentRole === "company_owner") return true;
      return item.roles.includes(currentRole);
    });
  };

  const isPosPage = pathname === "/app/pos";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      {/* Modals & Drawers */}
      <GlobalSearchModal />
      <SyncStatusModal />
      <NotificationsDrawer isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <ThermalReceiptModal />

      {/* Topbar */}
      <header className="sticky top-0 z-40 h-16 border-b border-border bg-card/95 backdrop-blur-md px-4 flex items-center justify-between shadow-xs">
        {/* Left Side: Brand Logo & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/app/dashboard" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-indigo-500/30">
              X
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-sm tracking-tight text-foreground flex items-center gap-1">
                {currentOrg.name}
              </span>
              <span className="text-[10px] text-muted-foreground block leading-none font-medium">
                XYZ Business OS
              </span>
            </div>
          </Link>

          {/* Branch Selector Dropdown */}
          <div className="hidden lg:flex items-center ml-4 pl-4 border-l border-border">
            <Building2 className="h-4 w-4 text-muted-foreground mr-1.5" />
            <select
              value={currentBranch.id}
              onChange={(e) => {
                const b = branches.find((item) => item.id === e.target.value);
                if (b) setCurrentBranch(b);
              }}
              className="bg-transparent text-xs font-semibold text-foreground focus:outline-none cursor-pointer py-1 pr-2 rounded-md hover:bg-muted"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id} className="bg-card text-foreground">
                  {b.name} {b.isMainBranch ? "(HQ)" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Global Search Bar Button */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-muted-foreground bg-muted/50 hover:bg-muted border border-border rounded-lg transition-colors group"
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 group-hover:text-foreground" />
              <span>Search products, customers, invoices...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] font-mono">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right Side Tools & User Persona */}
        <div className="flex items-center gap-2">
          {/* Quick RBAC Role Switcher (For testing permissions) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span className="capitalize">{currentRole.replace("_", " ")}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card p-1 shadow-xl z-50 animate-in fade-in">
                <div className="px-2 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Switch Persona Role
                </div>
                {(
                  [
                    "company_owner",
                    "branch_manager",
                    "accountant",
                    "cashier",
                    "super_admin",
                  ] as UserRole[]
                ).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setCurrentRole(role);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium capitalize flex items-center justify-between ${
                      currentRole === role
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <span>{role.replace("_", " ")}</span>
                    {currentRole === role && <Sparkles className="h-3 w-3" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Online / Offline Status Button */}
          <button
            onClick={() => setIsSyncModalOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
              isOnline
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
                : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800"
            }`}
            title="Click to view offline queue & sync status"
          >
            {isOnline ? (
              <>
                <Wifi className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span className="font-bold">Offline ({syncQueue.length})</span>
              </>
            )}
            {syncQueue.length > 0 && isOnline && (
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </button>

          {/* Quick POS Button if not on POS */}
          {!isPosPage && (
            <Link
              href="/app/pos"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-transform active:scale-95"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>POS Terminal</span>
            </Link>
          )}

          {/* Notifications Bell */}
          <button
            onClick={() => setNotificationsOpen(true)}
            className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Bell className="h-4 w-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-card" />
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          {/* Super Admin Switcher Link */}
          {currentRole === "super_admin" && (
            <Link
              href="/super-admin"
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-300 dark:border-purple-800"
            >
              Super Admin Portal
            </Link>
          )}
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Desktop) */}
        <aside
          className={`w-64 border-r border-border bg-card shrink-0 flex flex-col justify-between overflow-y-auto transition-all md:flex ${
            mobileMenuOpen
              ? "fixed inset-y-0 left-0 z-50 shadow-2xl flex"
              : "hidden md:flex"
          }`}
        >
          {/* Top of Sidebar (Logo if mobile) */}
          <div className="p-4 space-y-6">
            {mobileMenuOpen && (
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="font-bold text-sm">{currentOrg.name}</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Navigation Groups */}
            {NAV_SECTIONS.map((section, idx) => {
              const visibleItems = filterSectionItems(section.items);
              if (visibleItems.length === 0) return null;

              return (
                <div key={idx} className="space-y-1">
                  <h4 className="px-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                    {section.title}
                  </h4>
                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          isActive
                            ? "bg-indigo-600 text-white shadow-xs font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-muted text-muted-foreground border border-border"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Bottom Sidebar: Subscription badge & Logout */}
          <div className="p-4 border-t border-border bg-muted/20 space-y-3">
            <div className="p-3 rounded-xl bg-card border border-border space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground capitalize">
                  {currentOrg.subscriptionPlan} Plan
                </span>
                <span className="text-[10px] text-emerald-600 font-bold uppercase">Active</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                3 of {currentOrg.maxBranches} Branches Used
              </p>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden mt-1.5">
                <div className="bg-indigo-600 h-full w-full rounded-full" />
              </div>
            </div>

            <Link
              href="/login"
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-rose-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </Link>
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
