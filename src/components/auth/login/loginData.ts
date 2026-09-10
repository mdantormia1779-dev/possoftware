import { Building2, Store, BarChart3, ShoppingCart, Users, Shield } from "lucide-react";
import { UserRole } from "@/lib/types";

export interface DemoPersona {
  role: UserRole;
  title: string;
  email: string;
  icon: typeof Building2;
  colorClass: string;
  bgClass: string;
  targetRoute: string;
}

export const DEMO_PERSONAS: DemoPersona[] = [
  {
    role: "company_owner",
    title: "Company Owner",
    email: "owner@rahmanfashion.com.bd",
    icon: Building2,
    colorClass: "text-indigo-600 dark:text-indigo-400",
    bgClass: "hover:border-indigo-400 dark:hover:border-indigo-600",
    targetRoute: "/app/dashboard",
  },
  {
    role: "branch_manager",
    title: "Branch Manager",
    email: "manager.banani@rahmanfashion.com.bd",
    icon: Store,
    colorClass: "text-amber-600 dark:text-amber-400",
    bgClass: "hover:border-amber-400 dark:hover:border-amber-600",
    targetRoute: "/app/dashboard",
  },
  {
    role: "accountant",
    title: "Accountant",
    email: "accountant@rahmanfashion.com.bd",
    icon: BarChart3,
    colorClass: "text-blue-600 dark:text-blue-400",
    bgClass: "hover:border-blue-400 dark:hover:border-blue-600",
    targetRoute: "/app/dashboard",
  },
  {
    role: "cashier",
    title: "Cashier (POS)",
    email: "cashier@rahmanfashion.com.bd",
    icon: ShoppingCart,
    colorClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "hover:border-emerald-400 dark:hover:border-emerald-600",
    targetRoute: "/app/dashboard",
  },
  {
    role: "staff",
    title: "Store Staff",
    email: "staff@rahmanfashion.com.bd",
    icon: Users,
    colorClass: "text-purple-600 dark:text-purple-400",
    bgClass: "hover:border-purple-400 dark:hover:border-purple-600",
    targetRoute: "/app/dashboard",
  },
  {
    role: "super_admin",
    title: "Super Admin",
    email: "superadmin@xyzpos.com",
    icon: Shield,
    colorClass: "text-purple-600 dark:text-purple-400",
    bgClass: "hover:border-purple-400 dark:hover:border-purple-600",
    targetRoute: "/super-admin",
  },
];
