export interface Coupon {
  id: string;
  organizationId: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase: number;
  usageLimit: number;
  timesUsed: number;
  expiresAt?: string;
  isActive: boolean;
}

export interface Campaign {
  id: string;
  organizationId: string;
  title: string;
  channel: "sms" | "whatsapp";
  targetAudience: string;
  message: string;
  recipientCount: number;
  sentCount: number;
  status: "draft" | "scheduled" | "sent" | "failed";
  scheduledAt?: string;
  createdAt: string;
}
