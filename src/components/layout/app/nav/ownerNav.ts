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
  Layers,
} from "lucide-react";
import { NavSection } from "./nav.types";

export const OWNER_NAV: NavSection[] = [
  {
    title: "Executive",
    items: [{ title: "Overview Dashboard", href: "/app/dashboard", icon: LayoutDashboard }],
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
