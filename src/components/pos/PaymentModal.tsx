"use client";

import React from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { X } from "lucide-react";
import { PaymentMethodSelector } from "./payment/PaymentMethodSelector";
import { PaymentTenderSection } from "./payment/PaymentTenderSection";
import { PaymentCustomerSelector } from "./payment/PaymentCustomerSelector";
import { PaymentCouponSection } from "./payment/PaymentCouponSection";
import { PaymentSummary } from "./payment/PaymentSummary";
import { PaymentModalFooter } from "./payment/PaymentModalFooter";
import { usePaymentCheckout } from "./payment/usePaymentCheckout";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaleComplete: () => void;
}

export function PaymentModal({ isOpen, onClose, onSaleComplete }: PaymentModalProps) {
  const tenant = useTenant();
  const checkout = usePaymentCheckout(isOpen, onClose, onSaleComplete);
  const customers = storageService.getCustomers();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 px-6 py-4 bg-slate-50/50 dark:bg-slate-950/40">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-tight">Checkout &amp; Payment</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Outlet: {tenant.currentBranch.name} • {tenant.cart.length} {tenant.cart.length === 1 ? "item" : "items"} in cart
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-4">
            <PaymentMethodSelector
              paymentMethod={checkout.paymentMethod}
              onSelectMethod={checkout.setPaymentMethod}
            />
            <PaymentTenderSection
              paymentMethod={checkout.paymentMethod}
              tenderAmount={checkout.tenderAmount}
              setTenderAmount={checkout.setTenderAmount}
              trxId={checkout.trxId}
              setTrxId={checkout.setTrxId}
              cartGrandTotal={tenant.cartGrandTotal}
              changeAmount={checkout.changeAmount}
            />
          </div>

          <div className="space-y-4 flex flex-col justify-between">
            <PaymentCustomerSelector
              customers={customers}
              selectedCustomer={tenant.cartCustomer}
              onSelectCustomer={tenant.setCartCustomer}
              onAddCustomer={checkout.handleAddCustomer}
            />
            <PaymentCouponSection
              couponCode={checkout.couponCode}
              setCouponCode={checkout.setCouponCode}
              couponError={checkout.couponError}
              cartDiscount={tenant.cartDiscount}
              onApplyCoupon={checkout.applyCoupon}
            />
            <PaymentSummary
              itemCount={tenant.cart.length}
              subtotal={tenant.cartSubtotal}
              discount={tenant.cartDiscount}
              taxRate={tenant.cartTaxRate}
              totalTax={tenant.cartTotalTax}
              grandTotal={tenant.cartGrandTotal}
            />
          </div>
        </div>

        <PaymentModalFooter
          onClose={onClose}
          isProcessing={checkout.isProcessing}
          onCompleteSale={checkout.handleCompleteSale}
          cartGrandTotal={tenant.cartGrandTotal}
        />
      </div>
    </div>
  );
}
