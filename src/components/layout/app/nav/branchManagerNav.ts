import {
  LayoutDashboard,
  ShoppingCart,
  Receipt,
  Package,
  Boxes,
  Truck,
  Users,
  CalendarCheck,
  Percent,
  Contact,
  Tag,
  BarChart3,
} from "lucide-react";
import { NavSection } from "./nav.types";

export const BRANCH_MANAGER_NAV: NavSection[] = [
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
