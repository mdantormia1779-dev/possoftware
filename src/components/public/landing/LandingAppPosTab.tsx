import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const SAMPLE_PRODUCTS = [
  { name: "Executive Silk Panjabi", price: 4850, sku: "PAN-001", stock: 24 },
  { name: "Slim Fit Oxford Shirt", price: 2150, sku: "SHT-014", stock: 45 },
  { name: "Premium Polo Navy", price: 1450, sku: "POL-009", stock: 82 },
  { name: "Formal Chino Trousers", price: 2650, sku: "TRO-021", stock: 18 },
  { name: "Genuine Leather Belt", price: 1850, sku: "ACC-004", stock: 30 },
  { name: "Embroidered Kurti", price: 3250, sku: "KUR-011", stock: 12 },
];

export function LandingAppPosTab() {
  return (
    <motion.div
      key="pos-tab"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-4"
    >
      <div className="lg:col-span-2 p-4 rounded-2xl bg-muted/20 border border-border/60 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <ShoppingCart className="h-3.5 w-3.5 text-indigo-500" />
            <span>Quick POS Catalog (Banani Flagship)</span>
          </span>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Scanner Active [Ready]
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {SAMPLE_PRODUCTS.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-card border border-border/80 shadow-subtle-xs hover:border-indigo-400 transition-colors"
            >
              <span className="text-[10px] font-mono text-muted-foreground block">{item.sku}</span>
              <span className="text-xs font-bold text-foreground block truncate">{item.name}</span>
              <div className="flex justify-between items-center mt-2">
                <strong className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                  {formatCurrency(item.price)}
                </strong>
                <span className="text-[10px] text-muted-foreground">{item.stock} in stock</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-subtle-xs flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b border-border/80 pb-2">
            <span className="text-xs font-bold text-foreground">Current Order #8824</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              3 Items
            </span>
          </div>
          <div className="space-y-2 text-xs font-mono text-muted-foreground">
            <div className="flex justify-between"><span>Silk Panjabi (x1)</span><span>৳4,850</span></div>
            <div className="flex justify-between"><span>Oxford Shirt (x2)</span><span>৳4,300</span></div>
            <div className="flex justify-between"><span>VAT Mushak-6.3 (5%)</span><span>৳457.50</span></div>
          </div>
        </div>

        <div className="pt-3 border-t border-border/80 space-y-2">
          <div className="flex justify-between items-center font-mono">
            <span className="text-xs font-sans font-bold text-foreground">Net Payable:</span>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">৳9,607.50</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] font-bold font-mono">
            <div className="p-1.5 rounded-lg bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 text-center border border-pink-200 dark:border-pink-800">
              bKash: ৳5,000
            </div>
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-center border border-emerald-200 dark:border-emerald-800">
              Cash: ৳4,607.50
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
