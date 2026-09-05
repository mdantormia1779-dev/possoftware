import {
  LayoutDashboard,
  ShoppingCart,
  Receipt,
  Package,
  Boxes,
  Building2,
  BookOpen,
  Users,
  CalendarCheck,
  CreditCard,
  Percent,
  Contact,
  BarChart3,
  Layers,
} from "lucide-react";
import { NavSection } from "./nav.types";

export const ACCOUNTANT_NAV: NavSection[] = [
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

export const CASHIER_NAV: NavSection[] = [
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

export const STAFF_NAV: NavSection[] = [
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
