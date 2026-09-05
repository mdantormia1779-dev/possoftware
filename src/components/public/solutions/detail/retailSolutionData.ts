import { ShoppingBag, Zap, Users, Sparkles, Layers } from "lucide-react";
import { SolutionData } from "./solutionTypes";

export const retailSolutionData: SolutionData = {
  title: "Retail & Departmental Outlets",
  subtitle: "High-speed checkout with thermal barcodes, cash drawer kick & real-time branch stock tracking",
  banglaTitle: "রিটেল ও ডিপার্টমেন্টাল স্টোরের আধুনিক পিওএস",
  banglaDesc: "বারকোড স্ক্যানিং, মেমো প্রিন্ট, বাকি খাতা ও কাস্টমার এসএমএস — ইন্টারনেট ছাড়াও সব চলবে নির্বিঘ্নে।",
  icon: ShoppingBag,
  color: "from-blue-600 to-indigo-600",
  bgGradient: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  stats: [
    { label: "Checkout Speed", value: "< 1.5s", detail: "Per customer transaction" },
    { label: "Barcode Scanning", value: "100%", detail: "Compatible with any USB/Wireless scanner" },
    { label: "Due Recovery", value: "3.4x Faster", detail: "With automated bKash payment SMS links" },
  ],
  keyFeatures: [
    {
      title: "Sub-Second Barcode Scanning",
      desc: "Instant search by SKU, barcode, or name. Handles 50,000+ items locally without lag.",
      icon: Zap,
    },
    {
      title: "Customer Credit & Due Book",
      desc: "Dedicated digital Due Ledger with automated payment reminders and credit limits per customer.",
      icon: Users,
    },
    {
      title: "Thermal Label & Barcode Printing",
      desc: "One-click 38x25mm / 50x25mm barcode label generator with price, VAT, and business logo.",
      icon: Sparkles,
    },
    {
      title: "Cash Drawer & Dual Display",
      desc: "Native integration with POS cash drawers, pole displays, and receipt printers via browser ESC/POS.",
      icon: Layers,
    },
  ],
  workflow: [
    { step: "01", title: "Scan & Add to Cart", desc: "Scan item barcode or tap quick product grid shortcut." },
    { step: "02", title: "Apply Discounts / Points", desc: "Apply coupon code or redeem loyalty points in one click." },
    { step: "03", title: "Multi-Tender Payment", desc: "Accept Cash, Card, bKash, or record as verified Customer Due." },
    { step: "04", title: "Instant Thermal Print & Sync", desc: "Print 80mm or 58mm receipt, deduct stock, and sync to cloud." },
  ],
  bdBenefits: [
    "NBR VAT Mushak-6.3 automated compliance ready",
    "Native bKash / Nagad / Rocket QR receipt display",
    "Works 100% offline during load-shedding and broadband internet cuts",
    "Bangla font invoice and SMS receipt support",
  ],
  recommendedPlan: "Business Plan",
  recommendedPrice: "৳6,999/month",
};
