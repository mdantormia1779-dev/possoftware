import { Check, Sparkles } from "lucide-react";

type Kpi = { label: string; value: string; change: string; positive: boolean };
type TopProduct = { name: string; sold: number; revenue: string };

const FEATURES = [
  "Live revenue and profit analytics",
  "Daily, weekly and custom sales reports",
  "Inventory insights with reorder suggestions",
  "Customer behaviour and retention data",
];

const KPIS: Kpi[] = [
  { label: "Net revenue", value: "$92.4k", change: "+14%", positive: true },
  { label: "Avg order", value: "$42.80", change: "+6%", positive: true },
  { label: "Gross margin", value: "58.2%", change: "+2%", positive: true },
  { label: "Return rate", value: "1.8%", change: "-0.4%", positive: true },
];

const TOP_PRODUCTS: TopProduct[] = [
  { name: "Denim Jacket", sold: 142, revenue: "$12,638" },
  { name: "Canvas Sneakers", sold: 118, revenue: "$7,552" },
  { name: "Classic T-Shirt", sold: 96, revenue: "$2,304" },
];

// Sample data for the sales trend chart (values 0-100)
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

export default function LandingAnalyticsSection() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: analytics mockup */}
          <div
            className="order-2 rounded-3xl border border-slate-200 bg-white shadow-sm lg:order-1"
            aria-hidden="true"
          >
            {/* Browser bar */}
            <div className="flex items-center gap-3 rounded-t-3xl border-b border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
              </div>
              <div className="flex-1 truncate rounded-md border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-500">
                app.posbusinessos.com/analytics
              </div>
            </div>

            <div className="space-y-4 p-4 sm:p-5">
              {/* KPI cards */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {KPIS.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-3"
                  >
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                      {kpi.label}
                    </p>
                    <p className="mt-1.5 text-base font-bold text-slate-900">
                      {kpi.value}
                    </p>
                    <p
                      className={`text-[10px] font-medium ${
                        kpi.positive ? "text-teal-600" : "text-rose-500"
                      }`}
                    >
                      {kpi.change}
                    </p>
                  </div>
                ))}
              </div>

              {/* Sales trend */}
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-900">
                    Sales trend
                  </p>
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

              {/* Top selling products */}
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold text-slate-900">
                  Top selling products
                </p>
                <ul className="mt-3 space-y-2.5">
                  {TOP_PRODUCTS.map((p, i) => (
                    <li key={p.name} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-100 text-[10px] font-semibold text-blue-600">
                        {i + 1}
                      </span>
                      <span className="flex-1 truncate text-[11px] font-medium text-slate-800">
                        {p.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {p.sold} sold
                      </span>
                      <span className="w-14 text-right text-[11px] font-semibold text-slate-900">
                        {p.revenue}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Insight */}
              <div className="flex items-center gap-2.5 rounded-xl border border-teal-200 bg-teal-50 px-3.5 py-2.5 text-[11px] text-slate-700">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-teal-600" />
                Insight: weekend sales are up 22%. Consider extra weekend staff
                at store 2.
              </div>
            </div>
          </div>

          {/* Right: copy */}
          <div className="order-1 lg:order-2">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              Analytics
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Know Your Business in Real Time
            </h2>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
              Stop guessing. See exactly what is selling, what is sitting on the
              shelf and where your profit is really coming from.
            </p>

            <ul className="mt-8 space-y-3.5">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}