import {
  ShoppingCart,
  Boxes,
  Truck,
  Building,
  BookOpen,
  CreditCard,
  Users,
  CalendarCheck,
} from "lucide-react";

export const CORE_MODULES = [
  {
    icon: ShoppingCart,
    title: "1. Offline-First POS",
    desc: "Blazing-fast point of sale terminal that works completely without internet via Dexie.js IndexedDB. Multi-payment support, thermal receipt printing, and quick SKU/Barcode scanning.",
  },
  {
    icon: Boxes,
    title: "2. Real-Time Inventory & Warehouses",
    desc: "Tracks stock levels across all branches with minimum stock warning alerts, cost/selling price tracking, and batch/expiry dates.",
  },
  {
    icon: Truck,
    title: "3. Inter-Branch Stock Transfers",
    desc: "Seamlessly dispatch and receive goods between outlets with approval status workflows and permanent audit history.",
  },
  {
    icon: Building,
    title: "4. Multi-Branch Operations",
    desc: "Manage multiple retail outlets, departmental floors, and warehouse hubs under one single tenant account with branch-level permissions.",
  },
  {
    icon: BookOpen,
    title: "5. Automated Double-Entry Accounting",
    desc: "Every POS sale, purchase, and payroll run automatically posts debit and credit journal entries to your Chart of Accounts.",
  },
  {
    icon: CreditCard,
    title: "6. Cash & Bank Management",
    desc: "Manage Cash in Hand, bKash Merchant, Nagad, Rocket, and corporate bank accounts with live balance reconciliation.",
  },
  {
    icon: Users,
    title: "7. Employee Directory & HR",
    desc: "Maintain complete employee files with designations, base salaries, sales commission rates, and branch assignments.",
  },
  {
    icon: CalendarCheck,
    title: "8. Daily Attendance & Leave",
    desc: "Daily staff check-in/out logs with status monitoring (Present, Late, Absent, On Leave) and leave approval workflows.",
  },
  {
    icon: CreditCard,
    title: "9. Monthly Payroll & Payslips",
    desc: "One-click payroll run calculation that accounts for deductions, calculates earned sales commissions, and generates employee payslips in BDT.",
  },
];
