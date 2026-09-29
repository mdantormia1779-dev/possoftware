import { Sparkles } from "lucide-react";
import { BrowserFrame } from "../BrowserFrame";
import { ANALYTICS_DATA, money } from "../features-content";
import { MiniLineChart } from "./MiniLineChart";

export function AnalyticsMockup() {
  const { url, kpis, trend, top, insight } = ANALYTICS_DATA;

  return (
    <BrowserFrame url={url}>
      <div className="space-y-3 p-4">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-border bg-background p-3">
              <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
                {k.label}
              </p>
              <p className="mt-2 text-base font-bold text-foreground">{k.value}</p>
              <p
                className={`text-[10px] ${k.positive ? "text-teal-500" : "text-red-500"}`}
              >
                {k.change}
              </p>
            </div>
          ))}
        </div>

        {/* trend */}
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-foreground">{trend.title}</p>
            <div className="flex gap-3">
              {trend.series.map((s) => (
                <span
                  key={s.name}
                  className="flex items-center gap-1.5 text-[10px] text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                  {s.name}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <MiniLineChart series={trend.series} />
          </div>
        </div>

        {/* top products */}
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs font-bold text-foreground">{top.title}</p>
          <div className="mt-3 space-y-3">
            {top.items.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600/15 text-[10px] font-bold text-foreground">
                  {i + 1}
                </span>
                <p className="flex-1 text-[11px] font-semibold text-foreground">{item.name}</p>
                <span className="text-[10px] text-muted-foreground">{item.sold} sold</span>
                <span className="text-[11px] font-bold text-foreground">
                  {money(item.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* insight */}
        <div className="flex items-center gap-2 rounded-xl border border-teal-500/30 bg-teal-500/10 px-4 py-3 text-[11px] text-teal-600 dark:text-teal-300">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          {insight}
        </div>
      </div>
    </BrowserFrame>
  );
}