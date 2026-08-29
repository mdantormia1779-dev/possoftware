import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const SOLUTIONS = [
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

export default function SolutionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Industry Tailored Solutions
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Engineered For Your Specific Business Type
        </h1>
        <p className="text-base text-muted-foreground">
          Whether you run a fast-paced supermarket, a multi-branch fashion boutique, or an electronics store, XYZ Business OS adapts to your exact workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SOLUTIONS.map((sol) => (
          <div
            key={sol.slug}
            className="p-8 rounded-3xl border border-border bg-card shadow-xs hover:shadow-xl transition-all hover:border-indigo-300 dark:hover:border-indigo-700 flex flex-col justify-between"
          >
            <div>
              <div className="text-4xl mb-4">{sol.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-1">{sol.title}</h3>
              <p className="text-xs text-muted-foreground mb-6 font-medium">{sol.tagline}</p>
              <ul className="space-y-2.5 text-xs text-muted-foreground mb-8">
                {sol.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-muted/60 hover:bg-muted text-xs font-semibold text-foreground group transition-colors"
            >
              <span>Explore {sol.title.split(" ")[0]} Edition</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-indigo-600 transition-colors" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
