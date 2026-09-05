import {
  LayoutDashboard,
  Building,
  CreditCard,
  Layers,
  BarChart,
  Settings,
  DollarSign,
  Users,
} from "lucide-react";

export const ADMIN_NAV = [
  { title: "Platform Overview", href: "/super-admin", icon: LayoutDashboard },
  { title: "Organizations (Tenants)", href: "/super-admin/organizations", icon: Building },
  { title: "Subscriptions", href: "/super-admin/subscriptions", icon: CreditCard },
  { title: "SaaS Plans", href: "/super-admin/plans", icon: Layers },
  { title: "Billing & Revenue", href: "/super-admin/billing", icon: DollarSign },
  { title: "Platform Users", href: "/super-admin/users", icon: Users },
  { title: "Platform Analytics", href: "/super-admin/analytics", icon: BarChart },
  { title: "System Settings", href: "/super-admin/settings", icon: Settings },
];
