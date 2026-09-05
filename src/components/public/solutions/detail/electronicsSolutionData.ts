import { Smartphone, ShieldCheck, Award, BarChart3, RefreshCw } from "lucide-react";
import { SolutionData } from "./solutionTypes";

export const electronicsSolutionData: SolutionData = {
  title: "Gadgets & Electronics Outlets",
  subtitle: "Serial number & IMEI tracking, brand warranty records, repair ticketing, and installment dues",
  banglaTitle: "ইলেকট্রনিক্স ও মোবাইল শপের জন্য অল-ইন-ওয়ান সিস্টেম",
  banglaDesc: "আইএমইআই ট্র্যাকিং, ব্র্যান্ড ওয়ারেন্টি রেকর্ড, কিস্তি খাতা ও কাস্টমার সার্ভিস ম্যানেজমেন্ট।",
  icon: Smartphone,
  color: "from-cyan-600 to-blue-700",
  bgGradient: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  stats: [
    { label: "IMEI / Serial", value: "100% Tracked", detail: "From supplier invoice to end-customer bill" },
    { label: "Warranty Claims", value: "Instant Lookup", detail: "Find exact invoice and warranty validity by IMEI" },
    { label: "Installment (EMI)", value: "Automated", detail: "Schedule monthly installments with SMS reminders" },
  ],
  keyFeatures: [
    {
      title: "Per-Item IMEI & Serial Tracking",
      desc: "Each smartphone, laptop, or gadget has a unique serial logged at goods receipt and sales checkout.",
      icon: ShieldCheck,
    },
    {
      title: "Official Brand Warranty Ledger",
      desc: "Print warranty certificates with expiration dates and authorized service center contact details.",
      icon: Award,
    },
    {
      title: "Customer Due & EMI Installments",
      desc: "Manage hire-purchase installment schedules with payment history, penalty rules, and ledger statements.",
      icon: BarChart3,
    },
    {
      title: "Supplier Warranty Claim Returns",
      desc: "Manage defective goods returned to official distributors (e.g. Samsung, Xiaomi, Apple importers).",
      icon: RefreshCw,
    },
  ],
  workflow: [
    { step: "01", title: "Scan Device IMEI", desc: "Scan device barcode on retail box or type 15-digit IMEI." },
    { step: "02", title: "Set Warranty Duration", desc: "Attach 1-year brand warranty and replacement guarantee days." },
    { step: "03", title: "Choose Cash or EMI", desc: "Settle in full or configure monthly installment repayment plan." },
    { step: "04", title: "Print Device Warranty Invoice", desc: "Generates invoice detailing device IMEI, serial, and warranty." },
  ],
  bdBenefits: [
    "Strict tracking prevents selling grey-market or counterfeit serial numbers",
    "Supplier balance reconciliation for high-value distributor credits",
    "Automated bKash installment collection reminders sent to customers",
    "Handles accessories, chargers, and tempered glass alongside high-ticket phones",
  ],
  recommendedPlan: "Enterprise Plan",
  recommendedPrice: "৳14,999/month",
};
