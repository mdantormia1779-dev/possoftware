import Link from "next/link";
import {
  ArrowRight,
  ChefHat,
  CreditCard,
  Package,
  Search,
  Shirt,
  ShoppingBasket,
  Sparkles,
  Tag,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------ Mock data ------------------------------ */

type Product = { name: string; price: number; icon: LucideIcon };
type OrderLine = { name: string; qty: number; price: number };

const PRODUCTS: Product[] = [
  { name: "Classic T-Shirt", price: 24, icon: Shirt },
  { name: "Denim Jacket", price: 89, icon: Shirt },
  { name: "Canvas Shoes", price: 64, icon: Package },
  { name: "Leather Belt", price: 32, icon: Tag },
  { name: "Wool Scarf", price: 28, icon: Tag },
  { name: "Cotton Cap", price: 19, icon: ShoppingBasket },
];

const ORDER: OrderLine[] = [
  { name: "Denim Jacket", qty: 1, price: 89 },
  { name: "Classic T-Shirt", qty: 2, price: 48 },
  { name: "Cotton Cap", qty: 1, price: 19 },
];

const TAX_RATE = 0.08;

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const TABLES = [
  { name: "Table 1", status: "Occupied" },
  { name: "Table 2", status: "Free" },
  { name: "Table 3", status: "Occupied" },
  { name: "Table 4", status: "Reserved" },
  { name: "Table 5", status: "Free" },
  { name: "Table 6", status: "Occupied" },
] as const;

const TICKETS = [
  { id: "#104", table: "Table 1", items: 3, state: "Preparing" },
  { id: "#105", table: "Table 3", items: 2, state: "New" },
  { id: "#106", table: "Table 6", items: 4, state: "Ready" },
];

const STATUS_STYLES: Record<string, string> = {
  Occupied: "bg-blue-100 text-blue-700",
  Free: "bg-teal-100 text-teal-700",
  Reserved: "bg-slate-200 text-slate-600",
};

const TICKET_STYLES: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Preparing: "bg-amber-100 text-amber-700",
  Ready: "bg-teal-100 text-teal-700",
};

/* ------------------------------ Mockups ------------------------------ */

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-3xl border border-slate-200 bg-white shadow-sm"
      aria-hidden="true"
    >
      <div className="flex items-center gap-3 rounded-t-3xl border-b border-slate-100 bg-slate-50 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
        </div>
        <div className="flex-1 truncate rounded-md border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-500">
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

function CheckoutMockup() {
  const subtotal = ORDER.reduce((sum, line) => sum + line.price, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <BrowserFrame url="app.posbusinessos.com/checkout">
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_15rem] sm:p-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
            <Search className="h-3.5 w-3.5" />
            Search products or scan barcode
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {PRODUCTS.map(({ name, price, icon: Icon }) => (
              <div key={name} className="rounded-xl border border-slate-200 bg-white p-2">
                <div className="flex h-12 items-center justify-center rounded-lg bg-slate-100 text-blue-500">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="mt-2 truncate text-[11px] font-medium text-slate-800">{name}</p>
                <p className="text-[11px] font-semibold text-blue-600">{money(price)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-900">Current order</p>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-600">
              {ORDER.length} items
            </span>
          </div>
          <ul className="mt-4 space-y-3">
            {ORDER.map((line) => (
              <li key={line.name} className="flex justify-between gap-2">
                <div>
                  <p className="text-[11px] font-medium text-slate-900">{line.name}</p>
                  <p className="text-[10px] text-slate-400">Qty {line.qty}</p>
                </div>
                <p className="text-[11px] font-semibold text-slate-900">{money(line.price)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1.5 border-t border-slate-200 pt-3 text-[11px] text-slate-500">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({TAX_RATE * 100}%)</span>
              <span>{money(tax)}</span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold text-slate-900">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-xs font-semibold text-white">
            <CreditCard className="h-3.5 w-3.5" />
            Charge {money(total)}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function OperationsMockup() {
  return (
    <BrowserFrame url="app.posbusinessos.com/operations">
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_14rem] sm:p-5">
        <div>
          <p className="text-xs font-semibold text-slate-900">Floor</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {TABLES.map((t) => (
              <div key={t.name} className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-[11px] font-medium text-slate-800">{t.name}</p>
                <span
                  className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_STYLES[t.status]}`}
                >
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
            <ChefHat className="h-3.5 w-3.5 text-blue-600" />
            Kitchen tickets
          </p>
          <ul className="mt-4 space-y-3">
            {TICKETS.map((tk) => (
              <li key={tk.id} className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] font-medium text-slate-900">
                    {tk.id} · {tk.table}
                  </p>
                  <p className="text-[10px] text-slate-400">{tk.items} items</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${TICKET_STYLES[tk.state]}`}
                >
                  {tk.state}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BrowserFrame>
  );
}

const KPIS = [
  { label: "Net revenue", value: "$92.4k", change: "+14%" },
  { label: "Avg order", value: "$42.80", change: "+6%" },
  { label: "Gross margin", value: "58.2%", change: "+2%" },
  { label: "Return rate", value: "1.8%", change: "-0.4%" },
];

const TOP_PRODUCTS = [
  { name: "Denim Jacket", sold: 142, revenue: "$12,638" },
  { name: "Canvas Sneakers", sold: 118, revenue: "$7,552" },
  { name: "Classic T-Shirt", sold: 96, revenue: "$2,304" },
];

const THIS_YEAR = [38, 45, 42, 55, 60, 58, 70, 74, 68, 82, 88, 95];
const LAST_YEAR = [30, 34, 38, 40, 46, 44, 52, 55, 54, 60, 64, 70];
const CHART_W = 460;
const CHART_H = 110;

function toPoints(data: number[]) {
  const step = CHART_W / (data.length - 1);
  return data
    .map((v, i) => `${(i * step).toFixed(1)},${(CHART_H - (v / 100) * CHART_H).toFixed(1)}`)
    .join(" ");
}

function AnalyticsMockup() {
  return (
    <BrowserFrame url="app.posbusinessos.com/analytics">
      <div className="space-y-4 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {KPIS.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-slate-200 bg-white px-3 py-3">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                {kpi.label}
              </p>
              <p className="mt-1.5 text-base font-bold text-slate-900">{kpi.value}</p>
              <p className="text-[10px] font-medium text-teal-600">{kpi.change}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-900">Sales trend</p>
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                This year
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                Last year
              </span>
            </div>
          </div>
          <svg
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            className="mt-4 h-28 w-full overflow-visible"
            preserveAspectRatio="none"
          >
            {[0, 0.5, 1].map((t) => (
              <line
                key={t}
                x1={0}
                x2={CHART_W}
                y1={CHART_H * t}
                y2={CHART_H * t}
                className="stroke-slate-100"
                strokeWidth={1}
              />
            ))}
            <polyline
              points={toPoints(LAST_YEAR)}
              fill="none"
              className="stroke-teal-500"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <polyline
              points={toPoints(THIS_YEAR)}
              fill="none"
              className="stroke-blue-600"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold text-slate-900">Top selling products</p>
          <ul className="mt-3 space-y-2.5">
            {TOP_PRODUCTS.map((p, i) => (
              <li key={p.name} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-100 text-[10px] font-semibold text-blue-600">
                  {i + 1}
                </span>
                <span className="flex-1 truncate text-[11px] font-medium text-slate-800">
                  {p.name}
                </span>
                <span className="text-[10px] text-slate-400">{p.sold} sold</span>
                <span className="w-14 text-right text-[11px] font-semibold text-slate-900">
                  {p.revenue}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2.5 rounded-xl border border-teal-200 bg-teal-50 px-3.5 py-2.5 text-[11px] text-slate-700">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-teal-600" />
          Insight: weekend sales are up 22%. Consider extra weekend staff at store 2.
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ------------------------------ Section ------------------------------ */

const SOLUTIONS = [
  {
    title: "Retail & Fashion",
    description: "Variants, sizes and fast checkout for busy shop floors.",
    cta: "Book a demo",
    href: "/contact",
    mockup: <CheckoutMockup />,
  },
  {
    title: "Restaurants & Cafes",
    description: "Tables, orders and kitchen tickets managed from one screen.",
    cta: "Book a demo",
    href: "/contact",
    mockup: <OperationsMockup />,
  },
  {
    title: "Multi-store Chains",
    description: "Every location, every number, one live dashboard.",
    cta: "Book a demo",
    href: "/contact",
    mockup: <AnalyticsMockup />,
  },
];

export default function SolutionsShowcaseSection() {
  return (
    <section className="bg-slate-50 py-20 dark:bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            One Platform
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            One Platform. Multiple Business Types.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Every industry gets a purpose-built interface on top of the same
            powerful engine, so you never outgrow your tools.
          </p>
        </div>

        {/* Alternating rows */}
        <div className="mt-16 space-y-20 lg:space-y-28">
          {SOLUTIONS.map((item, i) => (
            <div
              key={item.title}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                  Solution
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-lg text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {item.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>{item.mockup}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}