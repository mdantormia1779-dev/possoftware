import { Store, Zap, ShieldCheck, Layers, BarChart3 } from "lucide-react";
import { SolutionData } from "./solutionTypes";

export const grocerySolutionData: SolutionData = {
  title: "Grocery & Supermarkets",
  subtitle: "Weight-scale integration, loose item repacking, batch expiration alerts, and quick lanes",
  banglaTitle: "সুপারশপ ও মুদি দোকানের কমপ্লিট ইআরপি",
  banglaDesc: "ডিজিটাল ওয়েট স্কেল বারকোড, লট এক্সপায়ারি ও হোলসেল প্যাক ট্র্যাকিং এক প্ল্যাটফর্মে।",
  icon: Store,
  color: "from-emerald-600 to-teal-600",
  bgGradient: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  stats: [
    { label: "Weighing Scale", value: "Direct Read", detail: "RS-232 / Barcode scale integration" },
    { label: "Expiry Loss Reduction", value: "85%", detail: "With 30/60/90 day proactive shelf alerts" },
    { label: "Fast Lanes", value: "350+ Bills/hr", detail: "Sustained peak hours throughput" },
  ],
  keyFeatures: [
    {
      title: "Weight Scale & Barcode Decoder",
      desc: "Decode embedded weight barcodes from Avery Berkel, CAS, and Digi weighing scales seamlessly.",
      icon: Zap,
    },
    {
      title: "Batch & Expiry Date Management",
      desc: "FEFO (First-Expired-First-Out) logic prevents expired FMCG goods from sitting on retail shelves.",
      icon: ShieldCheck,
    },
    {
      title: "Bulk-to-Retail Repacking",
      desc: "Transform 50kg rice/sugar bags into 1kg/5kg packets with auto inventory split and cost tracking.",
      icon: Layers,
    },
    {
      title: "Multi-Price Wholesale & Retail",
      desc: "Set tiered pricing for single packet vs master carton wholesale buyers on the same POS register.",
      icon: BarChart3,
    },
  ],
  workflow: [
    { step: "01", title: "Weigh or Scan", desc: "Scan weight barcode or place item directly on POS scale." },
    { step: "02", title: "Batch Verification", desc: "System checks expiry and auto-applies promotional bundle." },
    { step: "03", title: "Express Split Tender", desc: "Tender via Cash or Mobile Banking with auto-calculated change." },
    { step: "04", title: "Inventory Ledger Update", desc: "Warehouse stock automatically decrements across all units." },
  ],
  bdBenefits: [
    "Built for high-frequency supermarket checkout lanes with offline resilience",
    "Tracks local suppliers like PRAN, Square, Akij, Teer with PO receiving notes",
    "Supports loose staples like rice, lentils, oil, and spices with fractional decimals",
    "Instant daily sales & profit analytics by supplier brand",
  ],
  recommendedPlan: "Business Plan",
  recommendedPrice: "৳6,999/month",
};
