import {
  Check,
  CreditCard,
  Package,
  Search,
  Shirt,
  ShoppingBasket,
  Tag,
  type LucideIcon,
} from "lucide-react";

type Product = { name: string; price: number; icon: LucideIcon };
type OrderLine = { name: string; qty: number; price: number };

const FEATURES = [
  "Lightning-fast billing and checkout",
  "Cards, cash, wallets and QR in one terminal",
  "Instant product search and barcode scanning",
  "Offline mode keeps selling when the internet drops",
];

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

export default function LandingPosSection() {
  const subtotal = ORDER.reduce((sum, line) => sum + line.price, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const itemCount = ORDER.length;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy */}
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Point of Sale
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Powerful POS, Built for Speed
          </h2>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            A checkout experience designed around your counter. Scan, search and
            take payment in a few taps, even when the queue is out the door.
          </p>

          <ul className="mt-8 space-y-3.5">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-slate-700 dark:text-slate-200">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: POS mockup */}
        <div
          className="rounded-3xl border border-slate-200 bg-white shadow-sm"
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
              app.posbusinessos.com/checkout
            </div>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-[1fr_15rem] sm:p-5">
            {/* Product grid */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                <Search className="h-3.5 w-3.5" />
                Search products or scan barcode
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {PRODUCTS.map(({ name, price, icon: Icon }) => (
                  <div
                    key={name}
                    className="rounded-xl border border-slate-200 bg-white p-2"
                  >
                    <div className="flex h-12 items-center justify-center rounded-lg bg-slate-100 text-blue-500">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="mt-2 truncate text-[11px] font-medium text-slate-800">
                      {name}
                    </p>
                    <p className="text-[11px] font-semibold text-blue-600">
                      {money(price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Current order */}
            <div className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-900">
                  Current order
                </p>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                  {itemCount} items
                </span>
              </div>

              <ul className="mt-4 space-y-3">
                {ORDER.map((line) => (
                  <li key={line.name} className="flex justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-medium text-slate-900">
                        {line.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Qty {line.qty}
                      </p>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-900">
                      {money(line.price)}
                    </p>
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
        </div>
      </div>
    </section>
  );
}