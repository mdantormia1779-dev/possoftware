import React from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Boxes,
  Truck,
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
  Shield,
  Layers,
  Building,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const MODULES_LIST = [
  {
    icon: ShoppingCart,
    title: "1. Offline-First POS",
    desc: "Blazing-fast point of sale terminal that works completely without internet via Dexie.js IndexedDB. Multi-payment support (Cash, bKash, Card, Due, Split), thermal receipt printing, and quick SKU/Barcode scanning.",
  },
  {
    icon: Boxes,
    title: "2. Real-Time Inventory & Warehouses",
    desc: "Tracks stock levels across all branches with minimum stock warning alerts, cost/selling price tracking, and batch/expiry dates.",
  },
  {
    icon: Truck,
    title: "3. Inter-Branch Stock Transfers",
    desc: "Seamlessly dispatch and receive goods between outlets with approval status workflows (Draft → Pending → In Transit → Received) and permanent audit history.",
  },
  {
    icon: Building,
    title: "4. Multi-Branch Operations",
    desc: "Manage multiple retail outlets, departmental floors, and warehouse hubs under one single tenant account with branch-level permissions.",
  },
  {
    icon: BookOpen,
    title: "5. Automated Double-Entry Accounting",
    desc: "No manual bookkeeping required. Every POS sale, inventory purchase, and employee payroll run automatically posts debit and credit journal entries to your Chart of Accounts.",
  },
  {
    icon: CreditCard,
    title: "6. Cash & Bank Management",
    desc: "Manage Cash in Hand, bKash Merchant, Nagad, Rocket, and corporate bank accounts with live balance reconciliation.",
  },
  {
    icon: Users,
    title: "7. Employee Directory & HR",
    desc: "Maintain complete employee files with designations, base salaries, sales commission rates, department tags, and branch assignments.",
  },
  {
    icon: CalendarCheck,
    title: "8. Daily Attendance & Leave",
    desc: "Daily staff check-in/out logs with status monitoring (Present, Late, Absent, On Leave) and leave approval workflows.",
  },
  {
    icon: CreditCard,
    title: "9. Monthly Payroll & Payslips",
    desc: "One-click payroll run calculation that accounts for deductions, calculates earned sales commissions, and generates employee payslips in BDT (৳).",
  },
  {
    icon: Percent,
    title: "10. Salesperson Commission Tracker",
    desc: "Automatically tracks commissions earned by staff based on invoices processed, providing complete transparency.",
  },
  {
    icon: Contact,
    title: "11. CRM & Customer 360",
    desc: "Comprehensive customer profiles with purchase timelines, total lifetime spend, due balances, and credit limits.",
  },
  {
    icon: Gift,
    title: "12. Customer Loyalty Points",
    desc: "Configure points issuance rules per ৳100 spent and allow customers to redeem points for instant checkout discounts.",
  },
  {
    icon: Tag,
    title: "13. Coupon & Promo Engine",
    desc: "Create percentage or fixed-amount discount promo codes with minimum spend requirements and expiration dates.",
  },
  {
    icon: Megaphone,
    title: "14. SMS & WhatsApp Marketing",
    desc: "Send targeted broadcast promotions for festivals (Eid, Puja, New Year) to specific customer cohorts.",
  },
  {
    icon: BarChart3,
    title: "15. Executive Business Reports",
    desc: "Exportable PDF and CSV reports for Sales, Gross Profit, COGS, Stock Valuation, Low Stock, Employee Performance, and Financial Statements.",
  },
  {
    icon: Shield,
    title: "16. Multi-Tenant SaaS Subscriptions",
    desc: "Self-service subscription upgrades, usage meters for branches and staff, and transparent billing.",
  },
  {
    icon: Layers,
    title: "17. Super Admin Management",
    desc: "Complete platform provider console for monitoring MRR, active organizations, subscription tiers, and system analytics.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          The Complete Business Operating System
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          17 Integrated Modules Built For Bangladeshi SMBs
        </h1>
        <p className="text-base text-muted-foreground">
          Everything your business needs to grow, operate smoothly offline, and stay financially disciplined.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULES_LIST.map((mod, idx) => {
          const Icon = mod.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-border bg-card shadow-xs hover:shadow-md transition-all hover:border-indigo-300 dark:hover:border-indigo-700 flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 w-fit mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{mod.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{mod.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center pt-8">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-transform active:scale-95"
        >
          <span>Get Started with All 17 Modules</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
