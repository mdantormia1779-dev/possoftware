import { Pill, Zap, Layers, ShieldCheck, RefreshCw } from "lucide-react";
import { SolutionData } from "./solutionTypes";

export const pharmacySolutionData: SolutionData = {
  title: "Pharmacies & Drug Stores",
  subtitle: "DGDA medicine directory, strip vs box unit conversions, batch expiration, and prescription logs",
  banglaTitle: "ফার্মেসি ও ড্রাগ স্টোরের স্পেশালাইজড সফটওয়্যার",
  banglaDesc: "ঔষধের পাতা ও বক্স বিক্রয়, ডিজিডিএ গাইডলাইন, এক্সপায়ারি অ্যালার্ট ও জেনেরিক সার্চ।",
  icon: Pill,
  color: "from-emerald-700 to-cyan-700",
  bgGradient: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  stats: [
    { label: "Medicine Directory", value: "35,000+", detail: "Pre-loaded BD brand and generic names" },
    { label: "Strip/Box Split", value: "Automated", detail: "Sell 5 tablets, 1 strip, or 10 boxes effortlessly" },
    { label: "Expired Stock Loss", value: "0%", detail: "Return medicines to pharma companies before expiry" },
  ],
  keyFeatures: [
    {
      title: "Generic & Brand Cross-Search",
      desc: "Find alternatives when a doctor's prescribed brand is out of stock (e.g. Paracetamol vs Napa).",
      icon: Zap,
    },
    {
      title: "Fractional Unit Conversions",
      desc: "Box to Blister/Strip to Tablet conversion with automated fractional inventory mathematics.",
      icon: Layers,
    },
    {
      title: "Strict Batch & Expiry Compliance",
      desc: "Alerts cashier if medicine is near expiration date; blocks selling expired drugs completely.",
      icon: ShieldCheck,
    },
    {
      title: "Pharma Representative Claims",
      desc: "Track purchase invoices from Square, Incepta, Beximco, Renata with return credit notes.",
      icon: RefreshCw,
    },
  ],
  workflow: [
    { step: "01", title: "Search Brand or Generic", desc: "Type first 3 letters of medicine to view stock and rack location." },
    { step: "02", title: "Select Unit (Box/Strip/Tab)", desc: "Specify exact unit sold with auto-calculated price." },
    { step: "03", title: "Review Expiry & Batch", desc: "Cashier verifies batch printed on medicine strip matches POS." },
    { step: "04", title: "Print Prescription Receipt", desc: "Print clear patient receipt with dosage instructions and total bill." },
  ],
  bdBenefits: [
    "DGDA approved compliance standards for pharmacy operating guidelines",
    "Rack and Shelf locator guides assistants to locate medicine in 3 seconds",
    "Manages customer chronic illness credit books with periodic refill reminders",
    "Full cloud backup keeps 10 years of drug purchase vouchers safe for audits",
  ],
  recommendedPlan: "Starter / Business Plan",
  recommendedPrice: "৳2,999/month",
};
