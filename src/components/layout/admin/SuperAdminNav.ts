import {
  RiDashboard3Line,
  RiBuilding4Line,
  RiVipCrownLine,
  RiCopperCoinLine,
  RiMoneyDollarCircleLine,
  RiUserStarLine,
  RiBarChartGroupedLine,
  RiSettings4Line,
} from "react-icons/ri";

export const ADMIN_NAV = [
  { title: "Platform Overview", href: "/super-admin", icon: RiDashboard3Line },
  { title: "Organizations (Tenants)", href: "/super-admin/organizations", icon: RiBuilding4Line },
  { title: "Subscriptions", href: "/super-admin/subscriptions", icon: RiVipCrownLine },
  { title: "SaaS Plans", href: "/super-admin/plans", icon: RiCopperCoinLine },
  { title: "Manual Payments & Billing", href: "/super-admin/billing", icon: RiMoneyDollarCircleLine },
  { title: "Platform Users", href: "/super-admin/users", icon: RiUserStarLine },
  { title: "Platform Analytics", href: "/super-admin/analytics", icon: RiBarChartGroupedLine },
  { title: "System Settings", href: "/super-admin/settings", icon: RiSettings4Line },
];
