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
  Sliders,
  LogOut,
  Sparkles,
  Layers,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  Check,
  Zap,
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
      {
        title: "POS Terminal",
        href: "/app/pos",
        icon: ShoppingCart,
        badge: "Offline",
      },
      { title: "Sales Invoices", href: "/app/sales", icon: Receipt },
      { title: "Customers", href: "/app/customers", icon: Contact },
    ],
  },
  {
    title: "Inventory & Stock",
    items: [
      { title: "Products & SKUs", href: "/app/products", icon: Package },
      {
        title: "Stock & Warehouses",
        href: "/app/inventory",
        icon: Boxes,
        roles: ["company_owner", "branch_manager", "accountant"],
      },
      {
        title: "Stock Transfers",
        href: "/app/inventory/transfers",
        icon: Truck,
        roles: ["company_owner", "branch_manager"],
      },
    ],
  },
  {
    title: "Purchases & Vendors",
    items: [
      {
        title: "Purchase Orders",
        href: "/app/purchases",
        icon: Boxes,
        roles: ["company_owner", "branch_manager", "accountant"],
      },
      {
        title: "Suppliers",
        href: "/app/suppliers",
        icon: Building2,
        roles: ["company_owner", "accountant"],
      },
    ],
  },
  {
    title: "Accounting & Finance",
    items: [
      {
        title: "Finance Overview",
        href: "/app/accounting",
        icon: BookOpen,
        roles: ["company_owner", "accountant"],
      },
      {
        title: "Chart of Accounts",
        href: "/app/accounting/chart-of-accounts",
        icon: Layers,
        roles: ["company_owner", "accountant"],
      },
      {
        title: "Journal Entries",
        href: "/app/accounting/journal",
        icon: Receipt,
        roles: ["company_owner", "accountant"],
        badge: "Auto",
      },
      {
        title: "Cash & Banks",
        href: "/app/accounting/banks",
        icon: CreditCard,
        roles: ["company_owner", "accountant"],
      },
      {
        title: "Financial Statements",
        href: "/app/accounting/reports",
        icon: BarChart3,
        roles: ["company_owner", "accountant"],
      },
    ],
  },
  {
    title: "HR & Payroll",
    items: [
      {
        title: "Staff Directory",
        href: "/app/hr",
        icon: Users,
        roles: ["company_owner", "branch_manager"],
      },
      {
        title: "Daily Attendance",
        href: "/app/attendance",
        icon: CalendarCheck,
        roles: ["company_owner", "branch_manager"],
      },
      {
        title: "Payroll Generator",
        href: "/app/payroll",
        icon: CreditCard,
        roles: ["company_owner", "accountant"],
      },
      {
        title: "Commissions",
        href: "/app/commissions",
        icon: Percent,
        roles: ["company_owner", "branch_manager", "accountant"],
      },
    ],
  },
  {
    title: "CRM & Growth",
    items: [
      {
        title: "Loyalty Club",
        href: "/app/loyalty",
        icon: Gift,
        roles: ["company_owner", "branch_manager"],
      },
      {
        title: "Promo Coupons",
        href: "/app/coupons",
        icon: Tag,
        roles: ["company_owner", "branch_manager"],
      },
      {
        title: "SMS Campaigns",
        href: "/app/campaigns",
        icon: Megaphone,
        roles: ["company_owner"],
      },
    ],
  },
  {
    title: "Intelligence",
    items: [
      {
        title: "Reports Center",
        href: "/app/reports",
        icon: BarChart3,
        roles: ["company_owner", "branch_manager", "accountant"],
      },
    ],
  },
  {
    title: "Enterprise Settings",
    items: [
      {
        title: "Branch Outlets",
        href: "/app/branches",
        icon: Building2,
        roles: ["company_owner"],
      },
      {
        title: "Settings & NBR VAT",
        href: "/app/settings",
        icon: Settings,
        roles: ["company_owner"],
      },
      {
        title: "Subscription & Plan",
        href: "/app/subscription",
        icon: Shield,
        roles: ["company_owner"],
      },
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
    syncQueue,
    setIsSearchModalOpen,
    setIsSyncModalOpen,
    unreadNotificationCount,
  } = useTenant();

  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Filter items based on current role permissions
  const filterSectionItems = (items: NavItem[]) => {
    return items.filter((item) => {
      if (!item.roles) return true;
      if (currentRole === "super_admin" || currentRole === "company_owner")
        return true;
      return item.roles.includes(currentRole);
    });
  };

  const isPosPage = pathname === "/app/pos";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* Modals & Drawers */}
      <GlobalSearchModal />
      <SyncStatusModal />
      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
      <ThermalReceiptModal />

      {/* Top Header Navigation Bar */}
      <header className="sticky top-0 z-40 h-15 border-b border-border/80 bg-card/85 backdrop-blur-md px-3 sm:px-4 flex items-center justify-between shadow-subtle-xs transition-colors">
        {/* Left Side: Brand Logo, Branch Selector & Collapse Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/70"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <Link
            href="/app/dashboard"
            className="flex items-center gap-2.5 group select-none"
          >
            <div className="h-8.5 w-8.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-black text-base shadow-sm shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
              X
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-xs sm:text-sm tracking-tight text-foreground flex items-center gap-1">
                {currentOrg.name}
              </span>
              <span className="text-[10px] text-muted-foreground block leading-none font-medium">
                XYZ Business OS
              </span>
            </div>
          </Link>

          {/* Desktop Sidebar Collapse Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors ml-1"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>

          {/* Branch Selector Dropdown */}
          <div className="hidden lg:flex items-center ml-2 pl-3 border-l border-border/80">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-muted/40 hover:bg-muted/80 border border-border/60 transition-colors">
              <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
              <select
                value={currentBranch.id}
                onChange={(e) => {
                  const b = branches.find((item) => item.id === e.target.value);
                  if (b) setCurrentBranch(b);
                }}
                className="bg-transparent text-xs font-bold text-foreground focus:outline-none cursor-pointer pr-1"
              >
                {branches.map((b) => (
                  <option
                    key={b.id}
                    value={b.id}
                    className="bg-card text-foreground"
                  >
                    {b.name} {b.isMainBranch ? "(HQ)" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Center: Global Spotlight Search Bar Button */}
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

        {/* Right Side Tools & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick RBAC Role Switcher (For testing permissions) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-xl bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors shadow-subtle-xs"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span className="capitalize">{currentRole.replace("_", " ")}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-border/80 bg-card p-1.5 shadow-2xl z-50 animate-fade-slide">
                <div className="px-2.5 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
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
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold capitalize flex items-center justify-between transition-colors ${
                      currentRole === role
                        ? "bg-indigo-600 text-white shadow-subtle-xs"
                        : "hover:bg-muted/70 text-foreground"
                    }`}
                  >
                    <span>{role.replace("_", " ")}</span>
                    {currentRole === role ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Sparkles className="h-3 w-3 opacity-30" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Online / Offline Status Button */}
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
            {syncQueue.length > 0 && isOnline && (
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
            )}
          </button>

          {/* Quick POS Button if not on POS */}
          {!isPosPage && (
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

          {/* Super Admin Switcher Link */}
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

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Desktop & Mobile) */}
        <aside
          className={`border-r border-border/80 bg-card shrink-0 flex flex-col justify-between overflow-y-auto transition-all duration-200 md:flex ${
            sidebarCollapsed ? "w-18" : "w-64"
          } ${
            mobileMenuOpen
              ? "fixed inset-y-0 left-0 z-50 w-72 shadow-2xl flex bg-card"
              : "hidden md:flex"
          }`}
        >
          {/* Top of Sidebar */}
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

            {/* Navigation Groups */}
            {NAV_SECTIONS.map((section, idx) => {
              const visibleItems = filterSectionItems(section.items);
              if (visibleItems.length === 0) return null;

              return (
                <div key={idx} className="space-y-0.5">
                  {!sidebarCollapsed && (
                    <h4 className="px-2.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      {section.title}
                    </h4>
                  )}
                  {visibleItems.map((item) => {
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
                          {!sidebarCollapsed && (
                            <span className="truncate">{item.title}</span>
                          )}
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
              );
            })}
          </div>

          {/* Bottom Sidebar: Subscription badge & Logout */}
          <div className="p-3 border-t border-border/80 bg-muted/20 space-y-2.5">
            {!sidebarCollapsed && (
              <div className="p-3 rounded-2xl bg-card border border-border/80 shadow-subtle-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground capitalize flex items-center gap-1">
                    <Zap className="h-3 w-3 text-indigo-500" />
                    {currentOrg.subscriptionPlan} Plan
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  3 of {currentOrg.maxBranches} Outlets Connected
                </p>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-600 h-full w-3/5 rounded-full" />
                </div>
              </div>
            )}

            <Link
              href="/login"
              className={`flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
              title="Log out"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {!sidebarCollapsed && <span>Sign out</span>}
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
