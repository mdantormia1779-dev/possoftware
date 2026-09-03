"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  WifiOff,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  Layers,
  PanelLeftClose,
  PanelLeft,
  Store,
  Clock,
  Printer,
  CheckCircle2,
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
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

// 1. Company Owner Navigation (Full Executive Business OS Suite)
const OWNER_NAV: NavSection[] = [
  {
    title: "Executive",
    items: [
      { title: "Overview Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Sales & POS",
    items: [
      { title: "POS Terminal", href: "/app/pos", icon: ShoppingCart, badge: "Offline" },
      { title: "Sales Invoices", href: "/app/sales", icon: Receipt },
      { title: "Customers & Dues", href: "/app/customers", icon: Contact },
    ],
  },
  {
    title: "Inventory & Supply",
    items: [
      { title: "Products & SKUs", href: "/app/products", icon: Package },
      { title: "Stock & Warehouses", href: "/app/inventory", icon: Boxes },
      { title: "Stock Transfers", href: "/app/inventory/transfers", icon: Truck },
      { title: "Purchase Orders", href: "/app/purchases", icon: Boxes },
      { title: "Suppliers", href: "/app/suppliers", icon: Building2 },
    ],
  },
  {
    title: "Finance & Accounting",
    items: [
      { title: "Finance Overview", href: "/app/accounting", icon: BookOpen },
      { title: "Chart of Accounts", href: "/app/accounting/chart-of-accounts", icon: Layers },
      { title: "Journal Entries", href: "/app/accounting/journal", icon: Receipt, badge: "Auto" },
      { title: "Cash & Banks", href: "/app/accounting/banks", icon: CreditCard },
      { title: "Financial Statements", href: "/app/accounting/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Human Resources",
    items: [
      { title: "Staff Directory", href: "/app/hr", icon: Users },
      { title: "Daily Attendance", href: "/app/attendance", icon: CalendarCheck },
      { title: "Payroll Generator", href: "/app/payroll", icon: CreditCard },
      { title: "Staff Commissions", href: "/app/commissions", icon: Percent },
    ],
  },
  {
    title: "Growth & CRM",
    items: [
      { title: "Loyalty Club", href: "/app/loyalty", icon: Gift },
      { title: "Promo Coupons", href: "/app/coupons", icon: Tag },
      { title: "SMS Campaigns", href: "/app/campaigns", icon: Megaphone },
    ],
  },
  {
    title: "System & Settings",
    items: [
      { title: "Reports Center", href: "/app/reports", icon: BarChart3 },
      { title: "Branch Outlets", href: "/app/branches", icon: Building2 },
      { title: "Settings & NBR VAT", href: "/app/settings", icon: Settings },
      { title: "Subscription & Plan", href: "/app/subscription", icon: Shield },
    ],
  },
];

// 2. Branch Manager Navigation (Store Operations & Staff)
const BRANCH_MANAGER_NAV: NavSection[] = [
  {
    title: "Branch Hub",
    items: [
      { title: "Branch Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
      { title: "Counter POS", href: "/app/pos", icon: ShoppingCart, badge: "Fast" },
    ],
  },
  {
    title: "Counter Sales",
    items: [
      { title: "Branch Invoices", href: "/app/sales", icon: Receipt },
      { title: "Branch Customers", href: "/app/customers", icon: Contact },
    ],
  },
  {
    title: "Branch Inventory",
    items: [
      { title: "Products & SKUs", href: "/app/products", icon: Package },
      { title: "Branch Stock", href: "/app/inventory", icon: Boxes },
      { title: "Stock Transfers (HQ)", href: "/app/inventory/transfers", icon: Truck, badge: "Inter-Store" },
      { title: "Purchase Orders", href: "/app/purchases", icon: Boxes },
    ],
  },
  {
    title: "Branch Team",
    items: [
      { title: "Daily Attendance", href: "/app/attendance", icon: CalendarCheck },
      { title: "Staff Directory", href: "/app/hr", icon: Users },
      { title: "Staff Commissions", href: "/app/commissions", icon: Percent },
    ],
  },
  {
    title: "Performance",
    items: [
      { title: "Promo Coupons", href: "/app/coupons", icon: Tag },
      { title: "Branch Reports", href: "/app/reports", icon: BarChart3 },
    ],
  },
];

// 3. Financial Accountant Navigation (General Ledger & Fiscal Audit)
const ACCOUNTANT_NAV: NavSection[] = [
  {
    title: "Fiscal Control",
    items: [
      { title: "Fiscal Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
      { title: "Finance Overview", href: "/app/accounting", icon: BookOpen },
    ],
  },
  {
    title: "General Ledger",
    items: [
      { title: "Chart of Accounts", href: "/app/accounting/chart-of-accounts", icon: Layers },
      { title: "Journal Entries", href: "/app/accounting/journal", icon: Receipt, badge: "Double-Entry" },
      { title: "Cash & Banks", href: "/app/accounting/banks", icon: CreditCard },
      { title: "Financial Statements", href: "/app/accounting/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Receivables & Payables",
    items: [
      { title: "Sales Invoices", href: "/app/sales", icon: Receipt },
      { title: "Customers & Dues", href: "/app/customers", icon: Contact },
      { title: "Purchase Invoices", href: "/app/purchases", icon: Boxes },
      { title: "Suppliers Ledger", href: "/app/suppliers", icon: Building2 },
    ],
  },
  {
    title: "Payroll & Taxes",
    items: [
      { title: "Payroll Generator", href: "/app/payroll", icon: CreditCard },
      { title: "Staff Commissions", href: "/app/commissions", icon: Percent },
      { title: "Tax & NBR Reports", href: "/app/reports", icon: BarChart3 },
    ],
  },
];

// 4. Cashier Navigation (Counter Station)
const CASHIER_NAV: NavSection[] = [
  {
    title: "Counter Station",
    items: [
      { title: "Launch POS Terminal", href: "/app/pos", icon: ShoppingCart, badge: "F2 Active" },
      { title: "Till Shift Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Billing & Cash",
    items: [
      { title: "Sales Invoices", href: "/app/sales", icon: Receipt },
      { title: "Customer Due Lookup", href: "/app/customers", icon: Contact },
      { title: "Price & Stock Catalog", href: "/app/products", icon: Package },
      { title: "My Attendance", href: "/app/attendance", icon: CalendarCheck },
    ],
  },
];

// 5. Store Floor Staff Navigation (Floor Assistant)
const STAFF_NAV: NavSection[] = [
  {
    title: "Store Floor",
    items: [
      { title: "Floor Tasks & Shift", href: "/app/dashboard", icon: LayoutDashboard },
      { title: "Price & Stock Lookup", href: "/app/products", icon: Package },
      { title: "My Shift Attendance", href: "/app/attendance", icon: CalendarCheck },
      { title: "Customers Directory", href: "/app/customers", icon: Contact },
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
    isOnline,
    syncQueue,
    setIsSearchModalOpen,
    setIsSyncModalOpen,
    unreadNotificationCount,
  } = useTenant();

  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSuperAdminTakeover, setIsSuperAdminTakeover] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const controlling = localStorage.getItem("super_admin_controlling");
      setIsSuperAdminTakeover(!!controlling);
    }
  }, []);

  // Pick navigation sections strictly based on logged in user role
  const navSections = useMemo(() => {
    switch (currentRole) {
      case "company_owner":
        return OWNER_NAV;
      case "branch_manager":
        return BRANCH_MANAGER_NAV;
      case "accountant":
        return ACCOUNTANT_NAV;
      case "cashier":
        return CASHIER_NAV;
      case "staff":
        return STAFF_NAV;
      case "super_admin":
        return OWNER_NAV;
      default:
        return OWNER_NAV;
    }
  }, [currentRole]);

  const isPosPage = pathname === "/app/pos";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* Global Modals */}
      <GlobalSearchModal />
      <SyncStatusModal />
      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
      <ThermalReceiptModal />

      {/* Super Admin Takeover Control Banner */}
      {isSuperAdminTakeover && (
        <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-purple-950 text-white px-4 py-2 text-xs font-bold flex items-center justify-between border-b border-purple-700/60 shadow-md z-50">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">
              🛡️ Super Admin Control: Currently managing{" "}
              <strong className="text-white underline">{currentOrg.name}</strong> as Executive Owner.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/super-admin/organizations"
              className="px-3 py-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black shadow transition-all active:scale-95"
            >
              Console
            </Link>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("super_admin_controlling");
                  localStorage.removeItem("super_admin_controlling_name");
                  localStorage.setItem("xyz_user_role", "super_admin");
                }
                window.location.href = "/super-admin/organizations";
              }}
              className="px-2.5 py-1 rounded-xl border border-white/20 hover:bg-white/10 text-[11px] font-semibold text-purple-200 hover:text-white transition-colors"
            >
              Exit
            </button>
          </div>
        </div>
      )}

      {/* Top Header Navigation Bar (Tailored specifically per Role, without any switcher!) */}
      <header className="sticky top-0 z-40 h-15 border-b border-border/80 bg-card/85 backdrop-blur-md px-3 sm:px-4 flex items-center justify-between shadow-subtle-xs transition-colors">
        {/* Left Side of Header */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/70"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Brand Logo & Context Title */}
          <Link href="/app/dashboard" className="flex items-center gap-2.5 group select-none">
            <div
              className={`h-8.5 w-8.5 rounded-xl flex items-center justify-center text-white font-black text-base shadow-sm transition-transform duration-200 group-hover:scale-105 ${
                currentRole === "company_owner"
                  ? "bg-gradient-to-tr from-indigo-600 to-indigo-500 shadow-indigo-500/30"
                  : currentRole === "branch_manager"
                  ? "bg-gradient-to-tr from-amber-600 to-amber-500 shadow-amber-500/30"
                  : currentRole === "accountant"
                  ? "bg-gradient-to-tr from-blue-600 to-blue-500 shadow-blue-500/30"
                  : currentRole === "cashier"
                  ? "bg-gradient-to-tr from-emerald-600 to-emerald-500 shadow-emerald-500/30"
                  : "bg-gradient-to-tr from-purple-600 to-purple-500 shadow-purple-500/30"
              }`}
            >
              X
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-xs sm:text-sm tracking-tight text-foreground flex items-center gap-1">
                {currentOrg.name}
              </span>
              <span className="text-[10px] text-muted-foreground block leading-none font-medium">
                {currentRole === "company_owner" && "Enterprise OS"}
                {currentRole === "branch_manager" && `${currentBranch.name} Hub`}
                {currentRole === "accountant" && "General Ledger Desk"}
                {currentRole === "cashier" && "POS Counter Till"}
                {currentRole === "staff" && "Floor Station"}
                {currentRole === "super_admin" && "Super Admin"}
              </span>
            </div>
          </Link>

          {/* Desktop Sidebar Collapse Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors ml-1"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>

          {/* Role-Specific Branch Control */}
          <div className="hidden lg:flex items-center ml-2 pl-3 border-l border-border/80">
            {currentRole === "company_owner" ? (
              // Company Owner can switch any branch
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-muted/40 hover:bg-muted/80 border border-border/60 transition-colors">
                <Building2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <select
                  value={currentBranch.id}
                  onChange={(e) => {
                    const found = branches.find((b) => b.id === e.target.value);
                    if (found) setCurrentBranch(found);
                  }}
                  className="bg-transparent text-xs font-bold text-foreground focus:outline-none cursor-pointer pr-2"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id} className="bg-card text-foreground">
                      {b.name} {b.isMainBranch ? "(HQ)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            ) : currentRole === "branch_manager" ? (
              // Branch Manager locked to their branch
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs font-bold text-amber-800 dark:text-amber-300">
                <Store className="h-3.5 w-3.5 text-amber-600" />
                <span>{currentBranch.name}</span>
              </div>
            ) : currentRole === "accountant" ? (
              // Accountant fiscal indicator
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-xs font-bold text-blue-800 dark:text-blue-300">
                <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                <span>NBR Mushak 6.3 Tax Ready</span>
              </div>
            ) : currentRole === "cashier" ? (
              // Cashier active till indicator
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{currentBranch.name} • Till #1</span>
              </div>
            ) : (
              // Staff shift indicator
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/60 text-xs font-bold text-purple-800 dark:text-purple-300">
                <Clock className="h-3.5 w-3.5 text-purple-600" />
                <span>Shift Active</span>
              </div>
            )}
          </div>
        </div>

        {/* Center: Global Spotlight Search Button */}
        <div className="flex-1 max-w-sm xl:max-w-md mx-3 hidden md:block">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-muted-foreground bg-muted/40 hover:bg-muted/70 border border-border/70 rounded-xl transition-all group shadow-subtle-xs"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="h-3.5 w-3.5 group-hover:text-foreground transition-colors" />
              <span className="truncate">Search products, customers, invoices...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded-md bg-card border border-border/80 text-[10px] font-mono text-muted-foreground shadow-2xs shrink-0">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side Tools & Controls (NO ROLE SWITCHER DROPDOWN!) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Static Role Indicator Badge (Read-only, without dropdown) */}
          <div
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-xl border shadow-subtle-xs ${
              currentRole === "company_owner"
                ? "bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/60"
                : currentRole === "branch_manager"
                ? "bg-amber-50/80 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/60"
                : currentRole === "accountant"
                ? "bg-blue-50/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/60"
                : currentRole === "cashier"
                ? "bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/60"
                : "bg-purple-50/80 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/60"
            }`}
          >
            {currentRole === "company_owner" && <Building2 className="h-3.5 w-3.5" />}
            {currentRole === "branch_manager" && <Store className="h-3.5 w-3.5" />}
            {currentRole === "accountant" && <BarChart3 className="h-3.5 w-3.5" />}
            {currentRole === "cashier" && <ShoppingCart className="h-3.5 w-3.5" />}
            {currentRole === "staff" && <Users className="h-3.5 w-3.5" />}
            {currentRole === "super_admin" && <Shield className="h-3.5 w-3.5" />}
            <span className="capitalize">{currentRole.replace("_", " ")}</span>
          </div>

          {/* Online / Offline Sync Indicator */}
          <button
            onClick={() => setIsSyncModalOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-xl border transition-all shadow-subtle-xs ${
              isOnline
                ? "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60 hover:bg-emerald-100"
                : "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60 hover:bg-amber-100"
            }`}
            title="Click to view offline queue & sync status"
          >
            {isOnline ? (
              <>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="hidden sm:inline">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Offline ({syncQueue.length})</span>
              </>
            )}
          </button>

          {/* Quick POS Terminal Button (Prominent for Cashier and Owner) */}
          {!isPosPage && (currentRole === "cashier" || currentRole === "company_owner" || currentRole === "branch_manager") && (
            <Link
              href="/app/pos"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/25 transition-transform active:scale-95"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">POS Terminal</span>
            </Link>
          )}

          {/* Notifications Bell */}
          <button
            onClick={() => setNotificationsOpen(true)}
            className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
            aria-label="View Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-card animate-pulse" />
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
            title="Toggle theme (Light / Dark)"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          {/* Super Admin Console link if super admin */}
          {currentRole === "super_admin" && (
            <Link
              href="/super-admin"
              className="px-2.5 py-1 text-xs font-bold rounded-xl bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-300 dark:border-purple-800 hover:bg-purple-200 transition-colors"
            >
              Super Admin
            </Link>
          )}
        </div>
      </header>

      {/* Main Layout: Sidebar & Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Tailored specifically per Role) */}
        <aside
          className={`border-r border-border/80 bg-card shrink-0 flex flex-col justify-between overflow-y-auto transition-all duration-200 md:flex ${
            sidebarCollapsed ? "w-18" : "w-64"
          } ${
            mobileMenuOpen
              ? "fixed inset-y-0 left-0 z-50 w-72 shadow-2xl flex bg-card"
              : "hidden md:flex"
          }`}
        >
          {/* Top of Sidebar & Role-Specific Navigation */}
          <div className="p-3.5 space-y-5">
            {mobileMenuOpen && (
              <div className="flex items-center justify-between pb-3 border-b border-border/80">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                    X
                  </div>
                  <span className="font-bold text-sm text-foreground">
                    {currentOrg.name}
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-muted-foreground hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Dedicated Role Identity Banner inside Sidebar */}
            {!sidebarCollapsed && (
              <div className="p-2.5 rounded-2xl bg-muted/40 border border-border/70 flex items-center gap-2.5 shadow-subtle-xs mb-2">
                <div
                  className={`h-7 w-7 rounded-xl flex items-center justify-center font-bold text-white shrink-0 ${
                    currentRole === "company_owner"
                      ? "bg-indigo-600 shadow-xs shadow-indigo-500/25"
                      : currentRole === "branch_manager"
                      ? "bg-amber-600 shadow-xs shadow-amber-500/25"
                      : currentRole === "accountant"
                      ? "bg-blue-600 shadow-xs shadow-blue-500/25"
                      : currentRole === "cashier"
                      ? "bg-emerald-600 shadow-xs shadow-emerald-500/25"
                      : "bg-purple-600 shadow-xs shadow-purple-500/25"
                  }`}
                >
                  {currentRole === "company_owner" && <Building2 className="h-3.5 w-3.5" />}
                  {currentRole === "branch_manager" && <Store className="h-3.5 w-3.5" />}
                  {currentRole === "accountant" && <BarChart3 className="h-3.5 w-3.5" />}
                  {currentRole === "cashier" && <ShoppingCart className="h-3.5 w-3.5" />}
                  {currentRole === "staff" && <Users className="h-3.5 w-3.5" />}
                  {currentRole === "super_admin" && <Shield className="h-3.5 w-3.5" />}
                </div>
                <div className="truncate leading-tight">
                  <div className="text-[11px] font-black text-foreground capitalize truncate">
                    {currentRole === "company_owner" && "Owner Console"}
                    {currentRole === "branch_manager" && "Manager Console"}
                    {currentRole === "accountant" && "Fiscal Accountant"}
                    {currentRole === "cashier" && "Counter Till POS"}
                    {currentRole === "staff" && "Store Floor Staff"}
                    {currentRole === "super_admin" && "Super Admin"}
                  </div>
                  <div className="text-[9px] text-muted-foreground truncate">
                    {currentRole === "branch_manager"
                      ? currentBranch.name
                      : currentRole === "cashier"
                      ? `Till #1 • ${currentBranch.name}`
                      : "Role-Specific Navigation"}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Groups for Logged-In Role */}
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
                      onClick={() => setMobileMenuOpen(false)}
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

          {/* Bottom Sidebar: Role Identity & Sign Out */}
          <div className="p-3 border-t border-border/80 bg-muted/20 space-y-2.5">
            {!sidebarCollapsed && (
              <div className="p-3 rounded-2xl bg-card border border-border/80 shadow-subtle-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground capitalize flex items-center gap-1">
                    {currentRole === "company_owner" && "👑 Business Owner"}
                    {currentRole === "branch_manager" && "👔 Branch Manager"}
                    {currentRole === "accountant" && "📊 Fiscal Accountant"}
                    {currentRole === "cashier" && "🛒 POS Cashier"}
                    {currentRole === "staff" && "👥 Floor Associate"}
                    {currentRole === "super_admin" && "🛡️ Super Admin"}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground truncate">
                  {currentRole === "branch_manager"
                    ? `${currentBranch.name} Outlet`
                    : currentRole === "cashier"
                    ? `Counter #1 • ${currentBranch.name}`
                    : `${currentOrg.name}`}
                </p>
              </div>
            )}

            <Link
              href="/login"
              className={`flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
              title="Sign Out"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {!sidebarCollapsed && <span>Sign Out</span>}
            </Link>
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
