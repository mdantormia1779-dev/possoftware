import { Coffee, Zap, Layers, BarChart3, Sparkles } from "lucide-react";
import { SolutionData } from "./solutionTypes";

export const restaurantSolutionData: SolutionData = {
  title: "Restaurants & Cafes",
  subtitle: "Kitchen Order Tickets (KOT), table layout management, recipe COGS costing, and split bills",
  banglaTitle: "রেস্টুরেন্ট, ক্যাফে ও ফাস্ট ফুড পিওএস",
  banglaDesc: "কিসেন অর্ডার টিকিট (KOT), টেবিল ট্র্যাকিং, স্প্লিট পেমেন্ট এবং রেসিপি ভিত্তিক উপাদান খরচ।",
  icon: Coffee,
  color: "from-amber-600 to-orange-600",
  bgGradient: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  stats: [
    { label: "KOT Printing", value: "Instant", detail: "Direct to kitchen thermal printer" },
    { label: "Food Costing", value: "Real-Time", detail: "Flour, oil, meat deducted per dish cooked" },
    { label: "Split Payment", value: "Flexible", detail: "Divide bill across multiple friends / cards" },
  ],
  keyFeatures: [
    {
      title: "Kitchen Order Ticket (KOT) Routing",
      desc: "Orders sent instantly to Kitchen printer and Beverage bar printer with special cooking notes.",
      icon: Zap,
    },
    {
      title: "Table Layout & Occupancy View",
      desc: "Visual interactive floor plan showing vacant, occupied, running KOT, and billed tables.",
      icon: Layers,
    },
    {
      title: "Recipe COGS & Ingredient Deduction",
      desc: "Each burger sold auto-deducts 1 bun, 120g patty, 20g cheese sauce from warehouse inventory.",
      icon: BarChart3,
    },
    {
      title: "Food Delivery Aggregator Sync",
      desc: "Consolidate dine-in, takeaway, and delivery orders into a single consolidated revenue screen.",
      icon: Sparkles,
    },
  ],
  workflow: [
    { step: "01", title: "Assign Table & Waiter", desc: "Tap table on floor map and assign steward or take takeaway order." },
    { step: "02", title: "Punch Dishes & Modifiers", desc: "Add dishes with cooking instructions (e.g., 'Extra spicy, no onion')." },
    { step: "03", title: "Fire KOT to Kitchen", desc: "Cooks immediately receive printed docket; timer starts on orders." },
    { step: "04", title: "Settle Bill & Service Charge", desc: "Apply 10% service charge or discount, split payment, and print." },
  ],
  bdBenefits: [
    "Customizable SD / VAT rate calculation conforming to Bangladesh NBR restaurant guidelines",
    "Seamless integration with thermal receipt printers over LAN / Wi-Fi / USB",
    "Supports popular payment gateways: bKash Merchant, Nagad, POS Card swipes",
    "Tracks daily raw food purchase market expenses (Kachabazar diary)",
  ],
  recommendedPlan: "Business Plan",
  recommendedPrice: "৳6,999/month",
};
