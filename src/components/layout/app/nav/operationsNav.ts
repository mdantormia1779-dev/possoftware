import {
  RiDashboardLine,
  RiStore2Line,
  RiReceiptLine,
  RiBox3Line,
  RiArchiveStackLine,
  RiBuilding4Line,
  RiBookOpenLine,
  RiCalendarCheckLine,
  RiBankCardLine,
  RiPercentLine,
  RiUserSharedLine,
  RiBarChartGroupedLine,
} from "react-icons/ri";
import { NavSection } from "./nav.types";

export const ACCOUNTANT_NAV: NavSection[] = [
  {
    title: "Fiscal Control",
    items: [
      { title: "Fiscal Dashboard", href: "/app/dashboard", icon: RiDashboardLine },
      { title: "Finance Overview", href: "/app/accounting", icon: RiBookOpenLine },
    ],
  },
  {
    title: "General Ledger",
    items: [
      { title: "Chart of Accounts", href: "/app/accounting/chart-of-accounts", icon: RiArchiveStackLine },
      { title: "Journal Entries", href: "/app/accounting/journal", icon: RiReceiptLine, badge: "Double-Entry" },
      { title: "Cash & Banks", href: "/app/accounting/banks", icon: RiBankCardLine },
      { title: "Financial Statements", href: "/app/accounting/reports", icon: RiBarChartGroupedLine },
    ],
  },
  {
    title: "Receivables & Payables",
    items: [
      { title: "Sales Invoices", href: "/app/sales", icon: RiReceiptLine },
      { title: "Customers & Dues", href: "/app/customers", icon: RiUserSharedLine },
      { title: "Purchase Invoices", href: "/app/purchases", icon: RiArchiveStackLine },
      { title: "Suppliers Ledger", href: "/app/suppliers", icon: RiBuilding4Line },
    ],
  },
  {
    title: "Payroll & Taxes",
    items: [
      { title: "Payroll Generator", href: "/app/payroll", icon: RiBankCardLine },
      { title: "Staff Commissions", href: "/app/commissions", icon: RiPercentLine },
      { title: "Tax & NBR Reports", href: "/app/reports", icon: RiBarChartGroupedLine },
    ],
  },
];

export const CASHIER_NAV: NavSection[] = [
  {
    title: "Counter Station",
    items: [
      { title: "Launch POS Terminal", href: "/app/pos", icon: RiStore2Line, badge: "F2 Active" },
      { title: "Till Shift Dashboard", href: "/app/dashboard", icon: RiDashboardLine },
    ],
  },
  {
    title: "Billing & Cash",
    items: [
      { title: "Sales Invoices", href: "/app/sales", icon: RiReceiptLine },
      { title: "Customer Due Lookup", href: "/app/customers", icon: RiUserSharedLine },
      { title: "Price & Stock Catalog", href: "/app/products", icon: RiBox3Line },
      { title: "My Attendance", href: "/app/attendance", icon: RiCalendarCheckLine },
    ],
  },
];

export const STAFF_NAV: NavSection[] = [
  {
    title: "Store Floor",
    items: [
      { title: "Floor Tasks & Shift", href: "/app/dashboard", icon: RiDashboardLine },
      { title: "Price & Stock Lookup", href: "/app/products", icon: RiBox3Line },
      { title: "My Shift Attendance", href: "/app/attendance", icon: RiCalendarCheckLine },
      { title: "Customers Directory", href: "/app/customers", icon: RiUserSharedLine },
    ],
  },
];
