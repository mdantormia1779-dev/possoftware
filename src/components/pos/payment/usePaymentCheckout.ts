import { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { PaymentMethod } from "@/types";
import { storageService } from "@/lib/services/storage";
import { salesService } from "@/services/sales.service";
import { buildSaleData } from "./buildSaleData";
import { applyCouponHelper } from "./applyCouponHelper";
import { createQuickCustomer } from "./createQuickCustomer";

export function usePaymentCheckout(isOpen: boolean, onClose: () => void, onComplete: () => void) {
  const tenant = useTenant();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [tenderAmount, setTenderAmount] = useState<string>("");
  const [trxId, setTrxId] = useState<string>("");
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponError, setCouponError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setTenderAmount(Math.ceil(tenant.cartGrandTotal).toString());
      setCouponCode("");
      setCouponError("");
      setTrxId("");
    }
  }, [isOpen, tenant.cartGrandTotal]);

  const numericTender = parseFloat(tenderAmount) || 0;
  const changeAmount = Math.max(0, numericTender - tenant.cartGrandTotal);
  const dueAmount = Math.max(0, tenant.cartGrandTotal - numericTender);

  const applyCoupon = () => {
    applyCouponHelper({
      code: couponCode,
      subtotal: tenant.cartSubtotal,
      onSuccess: (d) => { tenant.setCartDiscount(d); setCouponError(""); },
      onError: setCouponError,
    });
  };

  const handleAddCustomer = (name: string, phone: string) => {
    tenant.setCartCustomer(createQuickCustomer(tenant.currentOrg.id, name, phone));
  };

  const handleCompleteSale = async () => {
    if (tenant.cart.length === 0) return;
    setIsProcessing(true);

    const saleData = buildSaleData({
      cart: tenant.cart,
      customer: tenant.cartCustomer,
      org: tenant.currentOrg,
      branch: tenant.currentBranch,
      subtotal: tenant.cartSubtotal,
      discount: tenant.cartDiscount,
      tax: tenant.cartTotalTax,
      grandTotal: tenant.cartGrandTotal,
      paidAmount: paymentMethod === "due" ? 0 : Math.min(numericTender, tenant.cartGrandTotal),
      dueAmount: paymentMethod === "due" ? tenant.cartGrandTotal : dueAmount,
      changeAmount,
      paymentMethod,
      isOnline: tenant.isOnline,
      trxId,
    });

    const newSale = storageService.createSale(saleData, !tenant.isOnline);
    if (tenant.isOnline) {
      salesService.createSale(saleData, tenant.currentOrg?.id, tenant.currentBranch?.id).catch(() => {});
    }

    setIsProcessing(false);
    tenant.clearCart();
    onClose();
    tenant.setActiveReceiptSale(newSale);
    onComplete();
  };

  return {
    paymentMethod,
    setPaymentMethod,
    tenderAmount,
    setTenderAmount,
    trxId,
    setTrxId,
    couponCode,
    setCouponCode,
    couponError,
    isProcessing,
    changeAmount,
    applyCoupon,
    handleAddCustomer,
    handleCompleteSale,
  };
}
