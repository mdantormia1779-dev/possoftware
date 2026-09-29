import { Package } from "lucide-react";
import { BrowserFrame } from "../BrowserFrame";
import { INVENTORY_DATA, money, type StockStatus } from "../features-content";

const STATUS: Record<StockStatus, { label: string; className: string }> = {
  in_stock: { label: "In stock", className: "bg-teal-500/15 text-teal-500 dark:text-teal-300" },
  low_stock: { label: "Low stock", className: "bg-blue-500/15 text-blue-500 dark:text-blue-300" },
  out_of_stock: { label: "Out of stock", className: "bg-muted text-muted-foreground" },
};

export function InventoryMockup() {
  const { url, tabs, activeTab, tableTitle, addLabel, rows, stats } = INVENTORY_DATA;

  return (
    <BrowserFrame url={url}>
      <div className="space-y-3 p-4">
        {/* tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <span
              key={t}
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                t === activeTab
                  ? "bg-blue-600 text-white"
                  : "border border-border bg-background text-muted-foreground"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* table */}
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-xs font-bold text-foreground">{tableTitle}</p>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-2.5 py-1.5 text-[10px] font-semibold text-white">
              <Package className="h-3 w-3" />
              {addLabel}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-[11px]">
              <thead>
                <tr className="border-y border-border text-[10px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">Product</th>
                  <th className="px-2 py-2.5 font-medium">SKU</th>
                  <th className="px-2 py-2.5 font-medium">Stock</th>
                  <th className="px-2 py-2.5 font-medium">Price</th>
                  <th className="px-2 py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.sku} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-semibold text-foreground">{r.name}</td>
                    <td className="px-2 py-3 text-muted-foreground">{r.sku}</td>
                    <td className="px-2 py-3 text-foreground">{r.stock}</td>
                    <td className="px-2 py-3 font-semibold text-foreground">{money(r.price)}</td>
                    <td className="px-2 py-3">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-medium ${STATUS[r.status].className}`}
                      >
                        {STATUS[r.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-500">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">{value}</p>
                <p className="text-[10px] text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}