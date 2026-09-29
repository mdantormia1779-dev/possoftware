import { CreditCard, Search } from "lucide-react";
import { BrowserFrame } from "../BrowserFrame";
import { POS_DATA, money } from "../features-content";

export function PosMockup() {
  const { url, searchPlaceholder, products, order } = POS_DATA;

  const subtotal = order.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const tax = subtotal * order.taxRate;
  const total = subtotal + tax;

  return (
    <BrowserFrame url={url}>
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-[1.35fr_1fr]">
        {/* products */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-xs text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
            {searchPlaceholder}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {products.map(({ name, price, icon: Icon }) => (
              <div key={name} className="rounded-lg border border-border bg-background p-2">
                <div className="flex h-12 items-center justify-center rounded-md bg-blue-600/10 text-blue-500">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="mt-2 truncate text-[11px] font-semibold text-foreground">{name}</p>
                <p className="text-[11px] font-semibold text-blue-500">{money(price)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* order */}
        <div className="rounded-lg border border-border bg-background p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-foreground">{order.title}</p>
            <span className="rounded-full bg-blue-600/15 px-2 py-0.5 text-[10px] font-semibold text-blue-500">
              {order.items.length} items
            </span>
          </div>

          <div className="mt-3 space-y-3">
            {order.items.map((i) => (
              <div key={i.name} className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-foreground">{i.name}</p>
                  <p className="text-[10px] text-muted-foreground">Qty {i.qty}</p>
                </div>
                <p className="text-[11px] font-semibold text-foreground">
                  {money(i.qty * i.unitPrice)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-[11px] text-muted-foreground">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({Math.round(order.taxRate * 100)}%)</span>
              <span>{money(tax)}</span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold text-foreground">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>
          </div>

          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-xs font-semibold text-white"
          >
            <CreditCard className="h-3.5 w-3.5" />
            Charge {money(total)}
          </button>
        </div>
      </div>
    </BrowserFrame>
  );
}