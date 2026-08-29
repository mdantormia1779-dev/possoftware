"use client";

import React, { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { PaymentMethod, SaleItem, Customer } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { storageService } from "@/lib/services/storage";
import {
  X,
  CreditCard,
  Banknote,
  Smartphone,
  AlertCircle,
  Check,
  Percent,
  UserPlus,
  Receipt,
} from "lucide-react";
import { Button } from "../ui/Button";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaleComplete: () => void;
}

export function PaymentModal({ isOpen, onClose, onSaleComplete }: PaymentModalProps) {
  const {
    cart,
    clearCart,
    cartCustomer,
    setCartCustomer,
    cartDiscount,
    setCartDiscount,
    cartTaxRate,
    cartSubtotal,
    cartTotalTax,
    cartGrandTotal,
    currentOrg,
    currentBranch,
    isOnline,
    setActiveReceiptSale,
  } = useTenant();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [tenderAmount, setTenderAmount] = useState<string>("");
  const [trxId, setTrxId] = useState<string>("");
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponError, setCouponError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Quick Customer Creation
  const [showAddCustomer, setShowAddCustomer] = useState<boolean>(false);
  const [newCustName, setNewCustName] = useState("");
  const [newCustPhone, setNewCustPhone] = useState("");

  const customers = storageService.getCustomers();

  useEffect(() => {
    if (isOpen) {
      setTenderAmount(Math.ceil(cartGrandTotal).toString());
      setCouponCode("");
      setCouponError("");
      setTrxId("");
    }
  }, [isOpen, cartGrandTotal]);

  if (!isOpen) return null;

  const numericTender = parseFloat(tenderAmount) || 0;
  const changeAmount = Math.max(0, numericTender - cartGrandTotal);
  const dueAmount = Math.max(0, cartGrandTotal - numericTender);

  const applyCoupon = () => {
    setCouponError("");
    const coupons = storageService.getCoupons();
    const found = coupons.find((c) => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.isActive);

    if (!found) {
      setCouponError("Invalid or expired promo code");
      return;
    }

    if (cartSubtotal < found.minPurchase) {
      setCouponError(`Minimum purchase of ${formatCurrency(found.minPurchase)} required`);
      return;
    }

    if (found.discountType === "percentage") {
      const discount = (cartSubtotal * found.discountValue) / 100;
      setCartDiscount(discount);
    } else {
      setCartDiscount(found.discountValue);
    }
    setCouponError("");
  };

  const handleQuickAddCustomer = () => {
    if (!newCustName || !newCustPhone) return;
    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      organizationId: currentOrg.id,
      name: newCustName,
      phone: newCustPhone,
      loyaltyPoints: 0,
      dueBalance: 0,
      creditLimit: 20000,
      totalSpent: 0,
      ordersCount: 0,
    };
    storageService.addCustomer(newCust);
    setCartCustomer(newCust);
    setShowAddCustomer(false);
    setNewCustName("");
    setNewCustPhone("");
  };

  const handleCompleteSale = async () => {
    if (cart.length === 0) return;
    setIsProcessing(true);

    const saleItems: SaleItem[] = cart.map((item) => ({
      id: `si-${Date.now()}-${item.product.id}`,
      productId: item.product.id,
      productName: item.product.name,
      sku: item.product.sku,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      costPrice: item.product.purchasePrice || 0,
      discountAmount: item.discountAmount,
      taxAmount: item.taxAmount,
      totalPrice: item.totalPrice,
    }));

    const saleData = {
      organizationId: currentOrg.id,
      branchId: currentBranch.id,
      branchName: currentBranch.name,
      cashierId: "emp-2",
      cashierName: "Md. Sajid Hasan",
      customerId: cartCustomer?.id,
      customerName: cartCustomer?.name,
      customerPhone: cartCustomer?.phone,
      items: saleItems,
      subtotal: cartSubtotal,
      discountAmount: cartDiscount,
      taxAmount: cartTotalTax,
      grandTotal: cartGrandTotal,
      paidAmount: paymentMethod === "due" ? 0 : Math.min(numericTender, cartGrandTotal),
      dueAmount: paymentMethod === "due" ? cartGrandTotal : dueAmount,
      changeAmount: changeAmount,
      paymentMethod: paymentMethod,
      status: "completed" as const,
      isOfflineSync: !isOnline,
      notes: trxId ? `TrxID / Ref: ${trxId}` : undefined,
    };

    const newSale = storageService.createSale(saleData, !isOnline);

    setIsProcessing(false);
    clearCart();
    onClose();
    setActiveReceiptSale(newSale);
    onSaleComplete();
  };

  const tenderPresets = [
    Math.ceil(cartGrandTotal),
    Math.ceil(cartGrandTotal / 100) * 100,
    Math.ceil(cartGrandTotal / 500) * 500 + 500,
    Math.ceil(cartGrandTotal / 1000) * 1000 + 1000,
  ];
  const uniquePresets = Array.from(new Set(tenderPresets)).filter((val) => val >= cartGrandTotal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4 bg-muted/30">
          <div>
            <h3 className="font-semibold text-foreground text-base">Checkout & Payment</h3>
            <p className="text-xs text-muted-foreground">Branch: {currentBranch.name} • {cart.length} items</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Column: Payment Methods & Tendering */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    paymentMethod === "cash"
                      ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold"
                      : "border-border bg-card hover:bg-muted text-foreground"
                  }`}
                >
                  <Banknote className="h-5 w-5" />
                  <span className="text-xs">Cash</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("bkash")}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    paymentMethod === "bkash"
                      ? "border-pink-600 bg-pink-50/50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 font-semibold"
                      : "border-border bg-card hover:bg-muted text-foreground"
                  }`}
                >
                  <Smartphone className="h-5 w-5 text-pink-600" />
                  <span className="text-xs">bKash</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("nagad")}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    paymentMethod === "nagad"
                      ? "border-amber-600 bg-amber-50/50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold"
                      : "border-border bg-card hover:bg-muted text-foreground"
                  }`}
                >
                  <Smartphone className="h-5 w-5 text-amber-600" />
                  <span className="text-xs">Nagad / Rocket</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    paymentMethod === "card"
                      ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold"
                      : "border-border bg-card hover:bg-muted text-foreground"
                  }`}
                >
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <span className="text-xs">Debit/Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("due")}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all col-span-2 ${
                    paymentMethod === "due"
                      ? "border-rose-600 bg-rose-50/50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-semibold"
                      : "border-border bg-card hover:bg-muted text-foreground"
                  }`}
                >
                  <AlertCircle className="h-5 w-5 text-rose-600" />
                  <span className="text-xs">Customer Credit / Due Account</span>
                </button>
              </div>
            </div>

            {/* Cash Tender Input & Change */}
            {paymentMethod === "cash" && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Amount Received (৳)
                </label>
                <input
                  type="number"
                  value={tenderAmount}
                  onChange={(e) => setTenderAmount(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-lg font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Preset Fast Cash Buttons */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {uniquePresets.slice(0, 4).map((amt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTenderAmount(amt.toString())}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-muted hover:bg-muted/80 text-foreground border border-border"
                    >
                      {formatCurrency(amt)}
                    </button>
                  ))}
                </div>

                {/* Change or Due Calculation Pill */}
                <div className="p-3 rounded-xl bg-muted/40 border border-border mt-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Change to return:</span>
                  <span className={`text-base font-bold ${changeAmount > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                    {formatCurrency(changeAmount)}
                  </span>
                </div>
              </div>
            )}

            {/* Mobile / Card Reference */}
            {["bkash", "nagad", "rocket", "card"].includes(paymentMethod) && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Transaction ID / Authorization Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9J3K882LA or Card Last 4 Digits"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>

          {/* Right Column: Customer, Coupon & Summary */}
          <div className="space-y-4 flex flex-col justify-between">
            {/* Customer Picker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Customer
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddCustomer(!showAddCustomer)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <UserPlus className="h-3 w-3" /> {showAddCustomer ? "Select Existing" : "Add New"}
                </button>
              </div>

              {showAddCustomer ? (
                <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-2">
                  <input
                    type="text"
                    placeholder="Customer Name"
                    value={newCustName}
                    onChange={(e) => setNewCustName(e.target.value)}
                    className="w-full h-8 px-2.5 text-xs rounded border border-border bg-background"
                  />
                  <input
                    type="text"
                    placeholder="Phone (e.g. 01712-345678)"
                    value={newCustPhone}
                    onChange={(e) => setNewCustPhone(e.target.value)}
                    className="w-full h-8 px-2.5 text-xs rounded border border-border bg-background"
                  />
                  <Button size="sm" variant="primary" onClick={handleQuickAddCustomer} className="w-full h-7 text-xs">
                    Save & Select Customer
                  </Button>
                </div>
              ) : (
                <select
                  value={cartCustomer?.id || ""}
                  onChange={(e) => {
                    const selected = customers.find((c) => c.id === e.target.value) || null;
                    setCartCustomer(selected);
                  }}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Walk-in Customer (General)</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.phone}) - {c.loyaltyPoints} Pts {c.dueBalance > 0 ? `[Due: ${formatCurrency(c.dueBalance)}]` : ""}
                    </option>
                  ))}
                </select>
              )}

              {cartCustomer && (
                <div className="text-[11px] text-muted-foreground flex justify-between bg-muted/40 p-2 rounded-lg">
                  <span>Loyalty Points: <strong className="text-foreground">{cartCustomer.loyaltyPoints}</strong></span>
                  <span>Due Balance: <strong className={cartCustomer.dueBalance > 0 ? "text-rose-600" : "text-emerald-600"}>{formatCurrency(cartCustomer.dueBalance)}</strong></span>
                </div>
              )}
            </div>

            {/* Coupon Promo */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Promo / Coupon Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. EID2026"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 h-9 px-3 rounded-lg border border-border bg-background text-xs uppercase font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Button size="sm" variant="outline" onClick={applyCoupon}>
                  Apply
                </Button>
              </div>
              {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
              {cartDiscount > 0 && (
                <p className="text-[11px] text-emerald-600 font-medium">Promo applied: -{formatCurrency(cartDiscount)} discount!</p>
              )}
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({cart.length} items):</span>
                <span className="text-foreground font-medium">{formatCurrency(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Discount:</span>
                  <span className="font-semibold">-{formatCurrency(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>VAT ({cartTaxRate}% included):</span>
                <span className="text-foreground font-medium">{formatCurrency(cartTotalTax)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border">
                <span>Payable Total:</span>
                <span className="text-indigo-600 dark:text-indigo-400">{formatCurrency(cartGrandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-border p-4 bg-muted/30">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="lg"
            isLoading={isProcessing}
            onClick={handleCompleteSale}
            className="px-8 font-semibold"
          >
            <Receipt className="h-4 w-4 mr-2" />
            Complete Sale ({formatCurrency(cartGrandTotal)})
          </Button>
        </div>
      </div>
    </div>
  );
}
