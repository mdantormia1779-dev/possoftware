import {
  ScanLine,
  Boxes,
  Tag,
  ClipboardList,
  Users,
  Truck,
  UserCog,
  BarChart3,
  CreditCard,
  Building2,
  Bell,
  ShieldCheck,
  Shirt,
  Package,
  ShoppingBasket,
  Store,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/** Currency formatter, mockup gulo ei ta use kore */
export const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

/* ───────────── Hero ───────────── */
export const HERO = {
  badge: "Product Features",
  title: "Powerful Features. Simpler Business Management.",
  subtitle:
    "Everything you need to run a modern business, packed into one connected platform. No more juggling disconnected tools.",
};

/* ───────────── Feature grid ───────────── */
export const ECOSYSTEM = {
  eyebrow: "The complete ecosystem",
  title: "A Feature for Every Part of Your Business",
  subtitle:
    "Twelve core capabilities that work together so your data, team and customers stay in sync.",
};

export interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const FEATURES: Feature[] = [
  { icon: ScanLine, title: "POS & Checkout", desc: "A blazing-fast register with barcode scanning, quick keys and split payments." },
  { icon: Boxes, title: "Inventory Management", desc: "Real-time stock across every store with low-stock and reorder alerts." },
  { icon: Tag, title: "Product Management", desc: "Variants, categories, bundles and images managed in a few clicks." },
  { icon: ClipboardList, title: "Order Management", desc: "Track every order from sale to fulfilment, including returns and refunds." },
  { icon: Users, title: "Customer Management", desc: "Profiles, purchase history, loyalty points and targeted messaging." },
  { icon: Truck, title: "Supplier Management", desc: "Purchase orders, supplier records and delivery tracking in one place." },
  { icon: UserCog, title: "Employee Management", desc: "Roles, permissions, shifts and performance all under control." },
  { icon: BarChart3, title: "Reports & Analytics", desc: "Revenue, margin and product reports that update in real time." },
  { icon: CreditCard, title: "Payments", desc: "Cards, wallets, QR and contactless with PCI-compliant security." },
  { icon: Building2, title: "Multi-store Management", desc: "Run every location from one dashboard with shared inventory." },
  { icon: Bell, title: "Notifications", desc: "Instant alerts for low stock, large sales and unusual activity." },
  { icon: ShieldCheck, title: "Security", desc: "Encryption, audit logs and role-based access keep data safe." },
];

/* ───────────── Spotlight text ───────────── */
export interface SpotlightCopy {
  eyebrow: string;
  title: string;
  tagline: string;
  points: string[];
}

export const POS_COPY: SpotlightCopy = {
  eyebrow: "Spotlight",
  title: "POS & Checkout",
  tagline: "Everything your counter needs, redesigned for speed.",
  points: [
    "Quick keys and barcode scanning",
    "Split, partial and refund payments",
    "Works offline and syncs automatically",
  ],
};

export const INVENTORY_COPY: SpotlightCopy = {
  eyebrow: "Spotlight",
  title: "Inventory & Products",
  tagline: "Know exactly what you own, everywhere, at all times.",
  points: [
    "Real-time stock across locations",
    "Variants, bundles and categories",
    "Automatic low-stock reordering",
  ],
};

export const ANALYTICS_COPY: SpotlightCopy = {
  eyebrow: "Spotlight",
  title: "Reports & Analytics",
  tagline: "Turn raw transactions into decisions you can act on.",
  points: [
    "Live dashboards and KPIs",
    "Profit and margin breakdowns",
    "Exportable custom reports",
  ],
};

/* ───────────── Mockup data ───────────── */
export const POS_DATA = {
  url: "app.posbusinessos.com/checkout",
  searchPlaceholder: "Search products or scan barcode",
  products: [
    { name: "Classic T-Shirt", price: 24, icon: Shirt },
    { name: "Denim Jacket", price: 89, icon: Shirt },
    { name: "Canvas Sneakers", price: 64, icon: Package },
    { name: "Leather Belt", price: 32, icon: Tag },
    { name: "Wool Scarf", price: 28, icon: Tag },
    { name: "Cotton Cap", price: 19, icon: ShoppingBasket },
  ] as { name: string; price: number; icon: LucideIcon }[],
  order: {
    title: "Current order",
    taxRate: 0.08,
    items: [
      { name: "Denim Jacket", qty: 1, unitPrice: 89 },
      { name: "Classic T-Shirt", qty: 2, unitPrice: 24 },
      { name: "Cotton Cap", qty: 1, unitPrice: 19 },
    ],
  },
};

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export const INVENTORY_DATA = {
  url: "app.posbusinessos.com/operations",
  tabs: ["Products", "Orders", "Customers", "Employees", "Suppliers"],
  activeTab: "Products",
  tableTitle: "Product catalogue",
  addLabel: "Add product",
  rows: [
    { name: "Denim Jacket", sku: "DJ-1042", stock: 34, price: 89, status: "in_stock" },
    { name: "Canvas Sneakers", sku: "CS-2210", stock: 8, price: 64, status: "low_stock" },
    { name: "Wool Scarf", sku: "WS-3391", stock: 0, price: 28, status: "out_of_stock" },
    { name: "Leather Belt", sku: "LB-1120", stock: 51, price: 32, status: "in_stock" },
  ] as { name: string; sku: string; stock: number; price: number; status: StockStatus }[],
  stats: [
    { icon: ClipboardList, value: "18", label: "Open orders" },
    { icon: UserCog, value: "12", label: "Active staff" },
    { icon: Truck, value: "9", label: "Suppliers" },
  ],
};

export const ANALYTICS_DATA = {
  url: "app.posbusinessos.com/analytics",
  kpis: [
    { label: "Net revenue", value: "$92.4k", change: "+14%", positive: true },
    { label: "Avg order", value: "$42.80", change: "+6%", positive: true },
    { label: "Gross margin", value: "58.2%", change: "+2%", positive: true },
    { label: "Return rate", value: "1.8%", change: "-0.4%", positive: true },
  ],
  trend: {
    title: "Sales trend",
    series: [
      { name: "This year", color: "#3b82f6", values: [30, 42, 38, 55, 62, 58, 75, 82, 78, 95] },
      { name: "Last year", color: "#22d3ee", values: [25, 30, 34, 40, 45, 50, 52, 60, 64, 70] },
    ],
  },
  top: {
    title: "Top selling products",
    items: [
      { name: "Denim Jacket", sold: 142, revenue: 12638 },
      { name: "Canvas Sneakers", sold: 118, revenue: 7552 },
      { name: "Classic T-Shirt", sold: 96, revenue: 2304 },
    ],
  },
  insight: "Insight: weekend sales are up 22%. Consider extra weekend staff at store 2.",
};

/* ───────────── Connected section ───────────── */
export const CONNECTED = {
  eyebrow: "Connected by design",
  title: "Everything works together in one platform.",
  subtitle:
    "Sales update inventory. Inventory drives reports. Reports guide your decisions. It all flows automatically, no exports or double entry.",
  dashboard: {
    url: "app.posbusinessos.com",
    greeting: "Good morning, Elena",
    sub: "Here is how your business is doing today",
    buttonLabel: "New Sale",
    sidebar: [Store, BarChart3, ScanLine, Boxes, Users] as LucideIcon[],
    stats: [
      { label: "Revenue", value: "$48,290", change: "+12.4%", positive: true, icon: TrendingUp },
      { label: "Orders", value: "1,284", change: "+8.1%", positive: true, icon: ClipboardList },
      { label: "Inventory", value: "3,912", change: "-2.3%", positive: false, icon: Boxes },
    ],
    chart: {
      title: "Revenue this week",
      range: "Last 7 days",
      days: [
        { label: "M", value: 62 },
        { label: "T", value: 48 },
        { label: "W", value: 75 },
        { label: "T", value: 58 },
        { label: "F", value: 88 },
        { label: "S", value: 96 },
        { label: "S", value: 70 },
      ],
    },
    orders: {
      title: "Recent orders",
      items: [
        { name: "Walk-in customer", id: "#10428", amount: 126.4, status: "Paid" },
        { name: "Amara Okafor", id: "#10427", amount: 84, status: "Paid" },
        { name: "Daniel Reyes", id: "#10426", amount: 212.9, status: "Refund" },
      ],
    },
  },
  pillars: [
    { icon: ScanLine, label: "Sell" },
    { icon: Boxes, label: "Track" },
    { icon: BarChart3, label: "Analyse" },
    { icon: TrendingUp, label: "Grow" },
  ] as { icon: LucideIcon; label: string }[],
};

/* ───────────── CTA ───────────── */
export const CTA = {
  badge: "14-day free trial · No credit card required",
  title: "See every feature in action.",
  subtitle: "Start your free trial and explore the full platform with your own products in minutes.",
  primary: { label: "Start Free Trial", href: "/register" },
  secondary: { label: "Contact Sales", href: "/contact" },
};