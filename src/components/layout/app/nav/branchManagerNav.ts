import {
  RiDashboardLine,
  RiStore2Line,
  RiReceiptLine,
  RiBox3Line,
  RiArchiveStackLine,
  RiTruckLine,
  RiTeamLine,
  RiCalendarCheckLine,
  RiPercentLine,
  RiUserSharedLine,
  RiCoupon3Line,
  RiBarChartGroupedLine,
} from "react-icons/ri";
import { NavSection } from "./nav.types";

export const BRANCH_MANAGER_NAV: NavSection[] = [
  {
    title: "Branch Hub",
    items: [
      { title: "Branch Dashboard", href: "/app/dashboard", icon: RiDashboardLine },
      { title: "Counter POS", href: "/app/pos", icon: RiStore2Line, badge: "Fast" },
    ],
  },
  {
    title: "Counter Sales",
    items: [
      { title: "Branch Invoices", href: "/app/sales", icon: RiReceiptLine },
      { title: "Branch Customers", href: "/app/customers", icon: RiUserSharedLine },
    ],
  },
  {
    title: "Branch Inventory",
    items: [
      { title: "Products & SKUs", href: "/app/products", icon: RiBox3Line },
      { title: "Branch Stock", href: "/app/inventory", icon: RiArchiveStackLine },
      { title: "Stock Transfers (HQ)", href: "/app/inventory/transfers", icon: RiTruckLine, badge: "Inter-Store" },
      { title: "Purchase Orders", href: "/app/purchases", icon: RiArchiveStackLine },
    ],
  },
  {
    title: "Branch Team",
    items: [
      { title: "Daily Attendance", href: "/app/attendance", icon: RiCalendarCheckLine },
      { title: "Staff Directory", href: "/app/hr", icon: RiTeamLine },
      { title: "Staff Commissions", href: "/app/commissions", icon: RiPercentLine },
    ],
  },
  {
    title: "Performance",
    items: [
      { title: "Promo Coupons", href: "/app/coupons", icon: RiCoupon3Line },
      { title: "Branch Reports", href: "/app/reports", icon: RiBarChartGroupedLine },
    ],
  },
];
