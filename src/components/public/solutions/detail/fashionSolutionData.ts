import { Shirt, Layers, RefreshCw, Award, Sparkles } from "lucide-react";
import { SolutionData } from "./solutionTypes";

export const fashionSolutionData: SolutionData = {
  title: "Fashion & Lifestyle Boutiques",
  subtitle: "Matrix variants (Size/Color/Fit), inter-outlet stock transfers, and salesperson commission",
  banglaTitle: "ফ্যাশন হাউস ও পোশাক শপের আধুনিক সফটওয়্যার",
  banglaDesc: "সাইজ-কালার ভ্যারিয়েন্ট, শোরুম থেকে শোরুমে স্টক ট্রান্সফার এবং সেলস স্টাফ কমিশন হিসেব।",
  icon: Shirt,
  color: "from-pink-600 to-rose-600",
  bgGradient: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  stats: [
    { label: "Variant Support", value: "Unlimited", detail: "Size (S-XXL), Color, Fabric matrix" },
    { label: "Outlet Transfer", value: "1-Click", detail: "With transit tracking and barcode verify" },
    { label: "Staff Incentives", value: "Auto-Calculated", detail: "Commission tied directly to salesperson ID" },
  ],
  keyFeatures: [
    {
      title: "Multi-Dimensional Variant Matrix",
      desc: "Create master products with size, color, fit, and pattern combinations with unique SKUs.",
      icon: Layers,
    },
    {
      title: "Showroom-to-Showroom Stock Transfers",
      desc: "Ship unsold sizes between Banani, Dhanmondi, and Uttara branches with transit verification.",
      icon: RefreshCw,
    },
    {
      title: "Sales Advisor Commission Engine",
      desc: "Track sales per staff member and generate monthly performance commission payouts automatically.",
      icon: Award,
    },
    {
      title: "Seasonal Clearance & Markdown Tags",
      desc: "Schedule Eid, Pohela Boishakh, and winter clearance discounts with barcode label price tags.",
      icon: Sparkles,
    },
  ],
  workflow: [
    { step: "01", title: "Scan Tag / Tag Search", desc: "Scan dress hangtag barcode showing style, size & color." },
    { step: "02", title: "Assign Sales Advisor", desc: "Tap staff member ID to credit their sales commission." },
    { step: "03", title: "Customer Loyalty Card", desc: "Fetch VIP customer profile and apply festive discount coupon." },
    { step: "04", title: "Branded Receipt & Bag Tag", desc: "Print elegant receipt with store return policy & social links." },
  ],
  bdBenefits: [
    "Manage Eid and seasonal collection launches with bulk CSV variant import",
    "Seamless multi-branch stock visibility across Dhaka, Chittagong, and Sylhet",
    "Track customer dress preferences and sizing history for personalized marketing",
    "Integrated exchange and return workflow with credit note generation",
  ],
  recommendedPlan: "Business Plan",
  recommendedPrice: "৳6,999/month",
};
