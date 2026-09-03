"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { formatCurrency } from "@/lib/utils";
import {
  Search,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  User,
  PauseCircle,
  CreditCard,
  WifiOff,
  AlertCircle,
  Sparkles,
  LayoutGrid,
  List,
  Check,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BarcodeScannerSimulator } from "@/components/pos/BarcodeScannerSimulator";
import { PaymentModal } from "@/components/pos/PaymentModal";

export default function PosTerminalPage() {
  const {
    currentBranch,
    cart,
    cartCustomer,
    setCartCustomer,
    cartDiscount,
    setCartDiscount,
    cartTaxRate,
    cartSubtotal,
    cartTotalTax,
    cartGrandTotal,
    addToCart,
    updateCartItemQty,
    removeFromCart,
    clearCart,
    isOnline,
    syncQueue,
    setIsSyncModalOpen,
    refreshData,
  } = useTenant();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [heldSales, setHeldSales] = useState<
    {
      id: string;
      time: string;
      itemsCount: number;
      total: number;
      cartData: any;
    }[]
  >([]);
  const [showHeldDrawer, setShowHeldDrawer] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");

  const categories = storageService.getCategories();
  const products = storageService.getProducts();

  // Filter products by selected category and search input
  const filteredProducts = products.filter((p) => {
    const matchesCat =
      selectedCategory === "all" || p.categoryId === selectedCategory;
    const matchesQuery =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode.includes(searchQuery);
    return matchesCat && matchesQuery;
  });

  const handleHoldSale = () => {
    if (cart.length === 0) return;
    const newHold = {
      id: `hold-${Date.now()}`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      itemsCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      total: cartGrandTotal,
      cartData: { cart, cartCustomer, cartDiscount },
    };
    setHeldSales([newHold, ...heldSales]);
    clearCart();
  };

  const handleRestoreHold = (hold: (typeof heldSales)[0]) => {
    clearCart();
    hold.cartData.cart.forEach((item: any) => {
      addToCart(item.product, item.quantity);
    });
    if (hold.cartData.cartCustomer) {
      setCartCustomer(hold.cartData.cartCustomer);
    }
    if (hold.cartData.cartDiscount) {
      setCartDiscount(hold.cartData.cartDiscount);
    }
    setHeldSales(heldSales.filter((h) => h.id !== hold.id));
    setShowHeldDrawer(false);
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col -m-4 sm:-m-6 lg:-m-8 overflow-hidden bg-background select-none">
      {/* Offline Status Warning Banner */}
      {!isOnline && (
        <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-bold flex items-center justify-between shadow-subtle-xs">
          <div className="flex items-center gap-2">
            <WifiOff className="h-4 w-4" />
            <span>
              Offline POS Active — Sales are saving locally to Dexie.js (IndexedDB). Zero disruption to checkout.
            </span>
          </div>
          <button
            onClick={() => setIsSyncModalOpen(true)}
            className="underline text-xs font-extrabold hover:text-black cursor-pointer"
          >
            View Outbox Queue ({syncQueue.length})
          </button>
        </div>
      )}

      {/* Main Terminal Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Products Catalog & Search (65% width) */}
        <div className="flex-1 flex flex-col border-r border-border/80 overflow-hidden bg-muted/15">
          {/* Top POS Search & Barcode Bar */}
          <div className="p-3.5 sm:p-4 border-b border-border/80 bg-card space-y-3 shadow-subtle-xs">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
              {/* Hardware Barcode Scanner & SKU Form */}
              <div className="sm:col-span-7">
                <BarcodeScannerSimulator />
              </div>

              {/* Instant Name Search */}
              <div className="relative sm:col-span-4">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter name, color..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9.5 pr-3 rounded-xl border border-border/80 bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 shadow-subtle-xs transition-all"
                />
              </div>

              {/* View Toggle */}
              <div className="sm:col-span-1 hidden sm:flex justify-end">
                <button
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "compact" : "grid")
                  }
                  className="p-2.5 rounded-xl border border-border/80 bg-card text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors shadow-subtle-xs"
                  title={
                    viewMode === "grid"
                      ? "Switch to Compact View"
                      : "Switch to Grid View"
                  }
                >
                  {viewMode === "grid" ? (
                    <List className="h-4 w-4" />
                  ) : (
                    <LayoutGrid className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedCategory === "all"
                    ? "bg-indigo-600 text-white shadow-subtle-xs"
                    : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60"
                }`}
              >
                All Products ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    selectedCategory === cat.id
                      ? "bg-indigo-600 text-white shadow-subtle-xs font-bold"
                      : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground text-xs sm:text-sm space-y-2">
                <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground opacity-40" />
                <p>No products match your search or filter.</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredProducts.map((product) => {
                  const branchStock =
                    product.branchStocks?.[currentBranch.id] ??
                    product.totalStock;
                  const isLow = branchStock <= product.minStockAlert;

                  return (
                    <div
                      key={product.id}
                      onClick={() => addToCart(product, 1)}
                      className="group relative rounded-2xl border border-border/80 bg-card p-3 shadow-subtle-xs hover:shadow-subtle-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-150 cursor-pointer flex flex-col justify-between select-none active:scale-[0.98]"
                    >
                      <div className="space-y-2">
                        {/* Thumbnail Image */}
                        <div className="relative h-26 sm:h-28 w-full rounded-xl overflow-hidden bg-muted/60 flex items-center justify-center border border-border/40">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="text-muted-foreground font-black text-[11px]">
                              {product.sku.slice(0, 4)}
                            </div>
                          )}
                          <span
                            className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-subtle-xs ${
                              isLow
                                ? "bg-rose-600 text-white"
                                : "bg-emerald-600/90 text-white backdrop-blur-xs"
                            }`}
                          >
                            {branchStock} {product.unit}
                          </span>
                        </div>

                        {/* Title & SKU */}
                        <div>
                          <h4 className="text-xs font-bold text-foreground line-clamp-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-[10px] text-muted-foreground font-mono mt-0.5 block truncate">
                            SKU: {product.sku}
                          </span>
                        </div>
                      </div>

                      {/* Price & Add Quick Tag */}
                      <div className="mt-2.5 pt-2 border-t border-border/60 flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-black text-foreground font-mono">
                          {formatCurrency(product.sellingPrice)}
                        </span>
                        <button
                          type="button"
                          className="h-7 w-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-subtle-xs"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Compact List View */
              <div className="space-y-1.5">
                {filteredProducts.map((product) => {
                  const branchStock =
                    product.branchStocks?.[currentBranch.id] ??
                    product.totalStock;
                  return (
                    <div
                      key={product.id}
                      onClick={() => addToCart(product, 1)}
                      className="p-2.5 rounded-xl border border-border/70 bg-card hover:bg-muted/40 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex items-center justify-between cursor-pointer group shadow-subtle-xs"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs shrink-0">
                          {product.sku.slice(0, 3)}
                        </div>
                        <div className="truncate">
                          <h4 className="text-xs font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                            {product.name}
                          </h4>
                          <span className="text-[10px] text-muted-foreground font-mono">
                            SKU: {product.sku} | Stock: {branchStock}{" "}
                            {product.unit}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-black text-foreground font-mono">
                          {formatCurrency(product.sellingPrice)}
                        </span>
                        <div className="h-6 w-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Plus className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Active Cart & Checkout Panel (35% width, min 380px) */}
        <div className="w-96 xl:w-[420px] bg-card border-l border-border/80 flex flex-col justify-between shrink-0 shadow-subtle-lg">
          {/* Cart Header */}
          <div className="p-3.5 sm:p-4 border-b border-border/80 bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <ShoppingCart className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-foreground">
                Current Cart
              </h3>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-mono">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            {/* Held Sales Button */}
            <div className="flex items-center gap-1.5">
              {heldSales.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowHeldDrawer(true)}
                  className="px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 flex items-center gap-1 shadow-subtle-xs"
                >
                  <PauseCircle className="h-3.5 w-3.5" />
                  <span>Held ({heldSales.length})</span>
                </button>
              )}
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="p-1.5 rounded-xl text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Clear Cart"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Customer Selector Bar */}
          <div className="px-4 py-2.5 border-b border-border/60 bg-muted/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              {cartCustomer ? (
                <div className="truncate">
                  <span className="font-bold text-foreground">
                    {cartCustomer.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground block font-mono">
                    {cartCustomer.phone}
                  </span>
                </div>
              ) : (
                <span className="text-muted-foreground font-medium text-[11px]">
                  Walk-in Customer (General)
                </span>
              )}
            </div>
            {cartCustomer && (
              <button
                type="button"
                onClick={() => setCartCustomer(null)}
                className="text-[10px] text-muted-foreground hover:text-foreground underline cursor-pointer"
              >
                Change
              </button>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-3">
                <div className="p-4 rounded-2xl bg-muted/50 border border-border/60 shadow-subtle-xs">
                  <ShoppingCart className="h-7 w-7 text-muted-foreground/60" />
                </div>
                <div className="space-y-1 max-w-[200px]">
                  <p className="text-xs font-bold text-foreground">
                    Cart is empty
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Scan a barcode or click any product card on the left to add items.
                  </p>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 rounded-2xl border border-border/70 bg-card shadow-subtle-xs flex items-center justify-between gap-2 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <h5 className="font-bold text-foreground truncate text-xs">
                      {item.product.name}
                    </h5>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {formatCurrency(item.unitPrice)} / {item.product.unit}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 bg-muted/60 p-0.5 rounded-xl border border-border/60">
                    <button
                      type="button"
                      onClick={() => updateCartItemQty(item.product.id, -1)}
                      className="h-6 w-6 rounded-lg bg-card hover:bg-muted flex items-center justify-center font-bold text-foreground text-xs shadow-2xs transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-foreground text-xs font-mono">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCartItemQty(item.product.id, 1)}
                      className="h-6 w-6 rounded-lg bg-card hover:bg-muted flex items-center justify-center font-bold text-foreground text-xs shadow-2xs transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right shrink-0 min-w-[70px]">
                    <span className="font-bold text-foreground block font-mono text-xs">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[10px] text-muted-foreground hover:text-rose-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Bottom Financial Summary & Actions */}
          <div className="p-4 border-t border-border/80 bg-muted/30 space-y-3">
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between text-muted-foreground">
                <span className="font-sans">Subtotal:</span>
                <span className="font-bold text-foreground">
                  {formatCurrency(cartSubtotal)}
                </span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span className="font-sans">Discount:</span>
                  <span className="font-bold">
                    -{formatCurrency(cartDiscount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span className="font-sans">VAT ({cartTaxRate}%):</span>
                <span className="font-bold text-foreground">
                  {formatCurrency(cartTotalTax)}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-foreground pt-1.5 border-t border-border/80">
                <span className="font-sans text-sm font-bold">Grand Total:</span>
                <span className="text-indigo-600 dark:text-indigo-400 text-lg">
                  {formatCurrency(cartGrandTotal)}
                </span>
              </div>
            </div>

            {/* Quick Actions Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                disabled={cart.length === 0}
                onClick={handleHoldSale}
                className="text-xs"
              >
                <PauseCircle className="h-3.5 w-3.5 mr-1.5" /> Hold Bill
              </Button>

              <Button
                variant="primary"
                size="lg"
                disabled={cart.length === 0}
                onClick={() => setIsPaymentOpen(true)}
                className="col-span-1 text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/25"
              >
                <CreditCard className="h-4 w-4 mr-2" /> Pay Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Held Sales Drawer */}
      {showHeldDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-80 bg-card border-l border-border/80 p-4.5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-border/80 mb-3">
                <h4 className="font-bold text-xs sm:text-sm text-foreground">
                  Held Sales Invoices
                </h4>
                <button
                  onClick={() => setShowHeldDrawer(false)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Close
                </button>
              </div>
              <div className="space-y-2">
                {heldSales.map((h) => (
                  <div
                    key={h.id}
                    className="p-3 rounded-2xl border border-border/80 bg-muted/20 space-y-2 text-xs shadow-subtle-xs"
                  >
                    <div className="flex justify-between font-bold">
                      <span>Held at {h.time}</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                        {formatCurrency(h.total)}
                      </span>
                    </div>
                    <div className="text-muted-foreground text-[11px]">
                      {h.itemsCount} items in cart
                    </div>
                    <Button
                      size="xs"
                      variant="primary"
                      onClick={() => handleRestoreHold(h)}
                      className="w-full text-xs"
                    >
                      Restore to Cart
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Checkout Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSaleComplete={refreshData}
      />
    </div>
  );
}
