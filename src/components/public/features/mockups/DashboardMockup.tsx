import { ClipboardList } from "lucide-react";
import { BrowserFrame } from "../BrowserFrame";
import { CONNECTED, money } from "../features-content";

export function DashboardMockup() {
  const d = CONNECTED.dashboard;
  const maxDay = Math.max(...d.chart.days.map((x) => x.value), 1);

  return (
    <BrowserFrame url={d.url}>
      <div className="flex gap-3 p-3 sm:p-4">
        {/* sidebar */}
        <div className="hidden w-12 shrink-0 flex-col items-center gap-4 rounded-xl border border-border bg-background py-4 sm:flex">
          {d.sidebar.map((Icon, i) => (
            <span
              key={i}
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                i === 0 ? "bg-blue-600 text-white" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
            </span>
          ))}
        </div>

        {/* main */}
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-foreground">{d.greeting}</p>
              <p className="text-[10px] text-muted-foreground">{d.sub}</p>
            </div>
            <span className="rounded-md bg-blue-600 px-3 py-1.5 text-[10px] font-semibold text-white">
              {d.buttonLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {d.stats.map(({ label, value, change, positive, icon: Icon }) => (
              <div key={label} className="rounded-xl border border-border bg-background p-3">
                <div className="flex items-center justify-between text-muted-foreground">
                  <p className="text-[9px] font-medium uppercase tracking-wide">{label}</p>
                  <Icon className="h-3 w-3 text-blue-500" />
                </div>
                <p className="mt-2 text-lg font-bold text-foreground">{value}</p>
                <p className={`text-[10px] ${positive ? "text-teal-500" : "text-red-500"}`}>
                  {change}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-background p-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-foreground">{d.chart.title}</p>
              <p className="text-[10px] text-muted-foreground">{d.chart.range}</p>
            </div>
            <div className="mt-3 flex h-24 items-end gap-3">
              {d.chart.days.map((day, i) => (
                <div key={i} className="flex flex-1 flex-col items-center justify-end gap-2">
                  <div
                    className="w-full rounded-t bg-blue-600/70"
                    style={{ height: `${(day.value / maxDay) * 100}%` }}
                  />
                  <span className="text-[9px] text-muted-foreground">{day.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-3">
            <p className="text-[11px] font-bold text-foreground">{d.orders.title}</p>
            <div className="mt-3 space-y-3">
              {d.orders.items.map((o) => (
                <div key={o.id} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <ClipboardList className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold text-foreground">{o.name}</p>
                    <p className="text-[10px] text-muted-foreground">{o.id}</p>
                  </div>
                  <span className="text-[11px] font-bold text-foreground">{money(o.amount)}</span>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                      o.status === "Paid"
                        ? "bg-teal-500/15 text-teal-500"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}