"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Product, Category, Customer } from "@/lib/types";
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
  Wifi,
  WifiOff,
  RefreshCw,
  Tag,
  Receipt,
  Check,
  AlertCircle,
  Sparkles,
  ArrowRight,
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
    setIsOnline,
    syncQueue,
    setIsSyncModalOpen,
    refreshData,
  } = useTenant();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [heldSales, setHeldSales] = useState<{ id: string; time: string; itemsCount: number; total: number; cartData: any }[]>([]);
  const [showHeldDrawer, setShowHeldDrawer] = useState<boolean>(false);

  const categories = storageService.getCategories();
  const products = storageService.getProducts();
  const customers = storageService.getCustomers();

  // Filter products by selected category and search input
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.categoryId === selectedCategory;
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
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      itemsCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      total: cartGrandTotal,
      cartData: { cart, cartCustomer, cartDiscount },
    };
    setHeldSales([newHold, ...heldSales]);
    clearCart();
  };

  const handleRestoreHold = (hold: typeof heldSales[0]) => {
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
    <div className="h-[calc(100vh-5.5rem)] flex flex-col -m-4 sm:-m-6 lg:-m-8 overflow-hidden bg-background">
      {/* Offline Status Warning Banner */}
      {!isOnline && (
        <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <WifiOff className="h-4 w-4" />
            <span>
              Offline POS Active — Sales are saving locally to Dexie.js (IndexedDB). Zero disruption to cashiering.
            </span>
          </div>
          <button
            onClick={() => setIsSyncModalOpen(true)}
            className="underline text-xs font-extrabold hover:text-black"
          >
            View Outbox Queue ({syncQueue.length})
          </button>
        </div>
      )}

      {/* Main Terminal Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Products Catalog & Search (65% width) */}
        <div className="flex-1 flex flex-col border-r border-border overflow-hidden bg-muted/10">
          {/* Top POS Search & Barcode Bar */}
          <div className="p-4 border-b border-border bg-card space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Hardware Barcode Scanner & SKU Form */}
              <BarcodeScannerSimulator />

              {/* Instant Name Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter products by name, color, fabric..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-9 pr-3 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedCategory === "all"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-muted hover:bg-muted/80 text-foreground border border-border"
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
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-muted hover:bg-muted/80 text-foreground border border-border"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground text-sm space-y-2">
                <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground opacity-50" />
                <p>No products match your search or filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5">
                {filteredProducts.map((product) => {
                  const branchStock = product.branchStocks?.[currentBranch.id] ?? product.totalStock;
                  const isLow = branchStock <= product.minStockAlert;

                  return (
                    <div
                      key={product.id}
                      onClick={() => addToCart(product, 1)}
                      className="group relative rounded-2xl border border-border bg-card p-3 shadow-2xs hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-700 transition-all cursor-pointer flex flex-col justify-between select-none active:scale-[0.98]"
                    >
                      <div className="space-y-2">
                        {/* Thumbnail Image */}
                        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="text-muted-foreground font-bold text-xs">NO IMG</div>
                          )}
                          <span
                            className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                              isLow
                                ? "bg-rose-600 text-white"
                                : "bg-emerald-600/90 text-white"
                            }`}
                          >
                            {branchStock} {product.unit}
                          </span>
                        </div>

                        {/* Title & SKU */}
                        <div>
                          <h4 className="text-xs font-bold text-foreground line-clamp-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {product.name}
                          </h4>
                          <span className="text-[10px] text-muted-foreground font-mono mt-0.5 block">
                            SKU: {product.sku}
                          </span>
                        </div>
                      </div>

                      {/* Price & Add Quick Tag */}
                      <div className="mt-3 pt-2 border-t border-border flex items-center justify-between">
                        <span className="text-sm font-extrabold text-foreground">
                          {formatCurrency(product.sellingPrice)}
                        </span>
                        <button
                          type="button"
                          className="h-7 w-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Active Cart & Checkout Panel (35% width, min 380px) */}
        <div className="w-96 xl:w-[420px] bg-card border-l border-border flex flex-col justify-between shrink-0 shadow-lg">
          {/* Cart Header */}
          <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-sm text-foreground">Current Cart</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            {/* Held Sales Button */}
            <div className="flex items-center gap-1.5">
              {heldSales.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowHeldDrawer(true)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 flex items-center gap-1"
                >
                  <PauseCircle className="h-3.5 w-3.5" />
                  <span>Held ({heldSales.length})</span>
                </button>
              )}
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-muted"
                  title="Clear Cart"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Customer Selector Bar */}
          <div className="px-4 py-2.5 border-b border-border bg-muted/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <User className="h-4 w-4 text-muted-foreground shrink-0" />
              {cartCustomer ? (
                <div className="truncate">
                  <span className="font-bold text-foreground">{cartCustomer.name}</span>
                  <span className="text-[10px] text-muted-foreground block">{cartCustomer.phone}</span>
                </div>
              ) : (
                <span className="text-muted-foreground font-medium">Walk-in Customer (General)</span>
              )}
            </div>
            {cartCustomer && (
              <button
                type="button"
                onClick={() => setCartCustomer(null)}
                className="text-[10px] text-muted-foreground hover:text-foreground underline"
              >
                Change
              </button>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-3">
                <div className="p-4 rounded-full bg-muted/60">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground/60" />
                </div>
                <div className="space-y-1 max-w-[200px]">
                  <p className="text-xs font-semibold text-foreground">Cart is empty</p>
                  <p className="text-[11px] text-muted-foreground">
                    Scan a barcode or tap any product card on the left to add items.
                  </p>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 rounded-xl border border-border bg-card shadow-2xs flex items-center justify-between gap-2 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <h5 className="font-bold text-foreground truncate">{item.product.name}</h5>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {formatCurrency(item.unitPrice)} / {item.product.unit}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 bg-muted/50 p-1 rounded-lg border border-border">
                    <button
                      type="button"
                      onClick={() => updateCartItemQty(item.product.id, -1)}
                      className="h-6 w-6 rounded bg-card hover:bg-muted flex items-center justify-center font-bold text-foreground text-xs"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-foreground text-xs">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCartItemQty(item.product.id, 1)}
                      className="h-6 w-6 rounded bg-card hover:bg-muted flex items-center justify-center font-bold text-foreground text-xs"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right shrink-0 min-w-[65px]">
                    <span className="font-bold text-foreground block">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[10px] text-muted-foreground hover:text-rose-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Bottom Financial Summary & Actions */}
          <div className="p-4 border-t border-border bg-muted/30 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal:</span>
                <span className="font-semibold text-foreground">{formatCurrency(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount:</span>
                  <span className="font-semibold">-{formatCurrency(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>VAT ({cartTaxRate}%):</span>
                <span className="font-semibold text-foreground">{formatCurrency(cartTotalTax)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-foreground pt-1.5 border-t border-border">
                <span>Grand Total:</span>
                <span className="text-indigo-600 dark:text-indigo-400">{formatCurrency(cartGrandTotal)}</span>
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
                className="col-span-1 text-sm font-bold shadow-lg shadow-indigo-500/25"
              >
                <CreditCard className="h-4 w-4 mr-2" /> Pay Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Held Sales Drawer */}
      {showHeldDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-80 bg-card border-l border-border p-4 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-border mb-3">
                <h4 className="font-bold text-sm text-foreground">Held Sales Invoices</h4>
                <button onClick={() => setShowHeldDrawer(false)} className="text-xs text-muted-foreground">
                  Close
                </button>
              </div>
              <div className="space-y-2">
                {heldSales.map((h) => (
                  <div key={h.id} className="p-3 rounded-xl border border-border bg-muted/20 space-y-2 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span>Held at {h.time}</span>
                      <span className="text-indigo-600 font-bold">{formatCurrency(h.total)}</span>
                    </div>
                    <div className="text-muted-foreground">{h.itemsCount} items in cart</div>
                    <Button size="sm" variant="primary" onClick={() => handleRestoreHold(h)} className="w-full h-7 text-xs">
                      Restore to Active Cart
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
