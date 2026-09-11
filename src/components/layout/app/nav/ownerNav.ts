import {
  RiDashboardLine,
  RiStore2Line,
  RiReceiptLine,
  RiUserSharedLine,
  RiBox3Line,
  RiArchiveStackLine,
  RiTruckLine,
  RiShoppingBag3Line,
  RiBuilding4Line,
  RiBookOpenLine,
  RiExchangeDollarLine,
  RiBankCardLine,
  RiBarChartGroupedLine,
  RiTeamLine,
  RiCalendarCheckLine,
  RiWallet3Line,
  RiPercentLine,
  RiGiftLine,
  RiCoupon3Line,
  RiMegaphoneLine,
  RiSettings4Line,
  RiShieldCheckLine,
  RiBuilding2Line,
} from "react-icons/ri";
import { NavSection } from "./nav.types";

export const OWNER_NAV: NavSection[] = [
  {
    title: "Executive",
    items: [{ title: "Overview Dashboard", href: "/app/dashboard", icon: RiDashboardLine }],
  },
  {
    title: "Sales & POS",
    items: [
      { title: "POS Terminal", href: "/app/pos", icon: RiStore2Line, badge: "Offline" },
      { title: "Sales Invoices", href: "/app/sales", icon: RiReceiptLine },
      { title: "Customers & Dues", href: "/app/customers", icon: RiUserSharedLine },
    ],
  },
  {
    title: "Inventory & Supply",
    items: [
      { title: "Products & SKUs", href: "/app/products", icon: RiBox3Line },
      { title: "Stock & Warehouses", href: "/app/inventory", icon: RiArchiveStackLine },
      { title: "Stock Transfers", href: "/app/inventory/transfers", icon: RiTruckLine },
      { title: "Purchase Orders", href: "/app/purchases", icon: RiShoppingBag3Line },
      { title: "Suppliers", href: "/app/suppliers", icon: RiBuilding4Line },
    ],
  },
  {
    title: "Finance & Accounting",
    items: [
      { title: "Finance Overview", href: "/app/accounting", icon: RiBookOpenLine },
      { title: "Chart of Accounts", href: "/app/accounting/chart-of-accounts", icon: RiArchiveStackLine },
      { title: "Journal Entries", href: "/app/accounting/journal", icon: RiExchangeDollarLine, badge: "Auto" },
      { title: "Cash & Banks", href: "/app/accounting/banks", icon: RiBankCardLine },
      { title: "Financial Statements", href: "/app/accounting/reports", icon: RiBarChartGroupedLine },
    ],
  },
  {
    title: "Human Resources",
    items: [
      { title: "Staff Directory", href: "/app/hr", icon: RiTeamLine },
      { title: "Daily Attendance", href: "/app/attendance", icon: RiCalendarCheckLine },
      { title: "Payroll Generator", href: "/app/payroll", icon: RiWallet3Line },
      { title: "Staff Commissions", href: "/app/commissions", icon: RiPercentLine },
    ],
  },
  {
    title: "Growth & CRM",
    items: [
      { title: "Loyalty Club", href: "/app/loyalty", icon: RiGiftLine },
      { title: "Promo Coupons", href: "/app/coupons", icon: RiCoupon3Line },
      { title: "SMS Campaigns", href: "/app/campaigns", icon: RiMegaphoneLine },
    ],
  },
  {
    title: "System & Settings",
    items: [
      { title: "Reports Center", href: "/app/reports", icon: RiBarChartGroupedLine },
      { title: "Branch Outlets", href: "/app/branches", icon: RiBuilding2Line },
      { title: "Settings & NBR VAT", href: "/app/settings", icon: RiSettings4Line },
      { title: "Subscription & Plan", href: "/app/subscription", icon: RiShieldCheckLine },
    ],
  },
];
