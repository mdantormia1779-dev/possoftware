export interface SolutionItem {
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  benefits: string[];
}

export const SOLUTIONS: SolutionItem[] = [
  {
    slug: "retail",
    icon: "🛍️",
    title: "Retail & Departmental Outlets",
    tagline: "High-speed checkout with thermal barcode and weight scales",
    benefits: [
      "Sub-second barcode scanning and instant cash/bKash receipts",
      "Low-stock alerts across retail shelves and backroom storage",
      "Customer credit & due ledger with automatic SMS reminders",
    ],
  },
  {
    slug: "grocery",
    icon: "🍎",
    title: "Grocery & Supermarkets",
    tagline: "Item variants, wholesale packs, and quick weight lookups",
    benefits: [
      "Weighing scale compatibility for vegetables, meat, and dry spices",
      "Batch number & product expiration date monitoring",
      "Express checkout lanes with touch-screen shortcut grids",
    ],
  },
  {
    slug: "fashion",
    icon: "👗",
    title: "Fashion & Lifestyle Boutiques",
    tagline: "Size, color, and fabric variant management with outlet transfers",
    benefits: [
      "Matrix variants (Size 38-44, Colorways) under single master SKUs",
      "Seamless stock transfers between flagship and shopping mall branches",
      "Sales commission calculations for floor sales fashion advisors",
    ],
  },
  {
    slug: "electronics",
    icon: "📱",
    title: "Gadgets & Electronics",
    tagline: "IMEI, serial number, and supplier warranty tracking",
    benefits: [
      "Individual serial/IMEI tracking for mobile devices and appliances",
      "Warranty claim records linked permanently to invoice numbers",
      "Supplier balance reconciliation and credit terms management",
    ],
  },
  {
    slug: "pharmacy",
    icon: "💊",
    title: "Pharmacies & Healthcare",
    tagline: "Strict batch expiry compliance, strips/boxes, and physician notes",
    benefits: [
      "Drug dosage forms (strip, box, vial) with fractional inventory tracking",
      "Expiring stock warnings 30/60/90 days before expiry",
      "Fast generic medicine search and prescription customer records",
    ],
  },
  {
    slug: "restaurant",
    icon: "☕",
    title: "Restaurants & Quick-Service Cafes",
    tagline: "Table management, recipe cost COGS, and split bills",
    benefits: [
      "Kitchen Order Tickets (KOT) and table-wise order tracking",
      "Split bill payments (e.g. Cash + bKash + Card combinations)",
      "Daily food cost COGS accounting automatically calculated",
    ],
  },
];
