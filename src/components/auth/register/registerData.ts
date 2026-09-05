export interface BusinessCategory {
  id: string;
  name: string;
  icon: string;
  desc: string;
}

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  {
    id: "fashion",
    name: "Fashion & Lifestyle",
    icon: "👗",
    desc: "Apparel, footwear, variant & size matrix",
  },
  {
    id: "retail",
    name: "Grocery & Super Shop",
    icon: "🛒",
    desc: "Barcode scanner, weighing scales & batch expiry",
  },
  {
    id: "electronics",
    name: "Gadgets & Electronics",
    icon: "📱",
    desc: "IMEI, serial tracking & warranty tickets",
  },
  {
    id: "pharmacy",
    name: "Pharmacy & Healthcare",
    icon: "💊",
    desc: "DGDA drugs list, batch control & expiries",
  },
  {
    id: "restaurant",
    name: "Restaurant & Cafe",
    icon: "☕",
    desc: "KDS kitchen display, tables & split bills",
  },
  {
    id: "wholesale",
    name: "Wholesale & Distribution",
    icon: "📦",
    desc: "Tiered credit terms, bulk lot pricing & challans",
  },
];

export const POPULAR_CITIES = [
  "Dhaka (Banani/Gulshan)",
  "Dhaka (Dhanmondi)",
  "Dhaka (Uttara)",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
];

export const STRENGTH_LABELS = ["Very Weak", "Fair", "Good", "Strong"];
export const STRENGTH_COLORS = [
  "bg-rose-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-emerald-500",
];

export const INITIAL_REGISTER_DATA = {
  companyName: "",
  businessType: "Fashion & Lifestyle",
  branchName: "Main Branch",
  city: "Dhaka (Banani/Gulshan)",
  ownerName: "",
  email: "",
  phone: "",
  password: "",
  termsAccepted: true,
};

export const DEMO_REGISTER_DATA = {
  companyName: "Bengal Luxe Lifestyle",
  businessType: "Fashion & Lifestyle",
  branchName: "Banani Flagship Store",
  city: "Dhaka (Banani/Gulshan)",
  ownerName: "Tanzim Ahmed",
  email: "tanzim@bengalluxe.com.bd",
  phone: "01712345678",
  password: "SuperSecretPassword123!",
  termsAccepted: true,
};
