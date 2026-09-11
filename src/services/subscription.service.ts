import { apiRequest } from "./apiClient";

export interface PaymentMethodConfig {
  id: string;
  method: string;
  name: string;
  accountType: string;
  accountNumber: string;
  bankName?: string | null;
  branchName?: string | null;
  routingNumber?: string | null;
  instructions?: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface CheckoutPayload {
  planTier: string;
  amount: number;
  billingCycle: "MONTHLY" | "YEARLY";
  paymentMethod: string;
  transactionId: string;
  senderNumber?: string;
  notes?: string;
}

export const subscriptionService = {
  async getPaymentMethods() {
    return apiRequest<PaymentMethodConfig[]>("/api/super-admin/payment-settings");
  },

  async submitCheckout(payload: CheckoutPayload) {
    return apiRequest<any>("/api/subscriptions/checkout", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async getInvoices() {
    return apiRequest<any[]>("/api/subscriptions");
  },
};
