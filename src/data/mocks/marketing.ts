import { Coupon, Campaign } from "@/types";

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: "cp-1",
    organizationId: "org-1",
    code: "EID2026",
    discountType: "percentage",
    discountValue: 10,
    minPurchase: 3000,
    usageLimit: 500,
    timesUsed: 142,
    expiresAt: "2026-04-15",
    isActive: true,
  },
  {
    id: "cp-2",
    organizationId: "org-1",
    code: "WELCOME500",
    discountType: "fixed",
    discountValue: 500,
    minPurchase: 4500,
    usageLimit: 200,
    timesUsed: 68,
    expiresAt: "2026-12-31",
    isActive: true,
  },
  {
    id: "cp-3",
    organizationId: "org-1",
    code: "XYZVIP",
    discountType: "percentage",
    discountValue: 15,
    minPurchase: 6000,
    usageLimit: 100,
    timesUsed: 43,
    isActive: true,
  },
];


export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: "cmp-1",
    organizationId: "org-1",
    title: "Eid Special Collection Pre-Launch SMS",
    channel: "sms",
    targetAudience: "VIP Loyalty Members (400+ Points)",
    message: "Rahman Fashion: Exclusive Festive Collection is now live in all outlets! Enjoy 10% flat discount for VIP members (Code: EID2026). Visit our Banani, Dhanmondi & GEC outlets.",
    recipientCount: 850,
    sentCount: 850,
    status: "sent",
    scheduledAt: "2026-02-25T11:00:00Z",
    createdAt: "2026-02-24T15:00:00Z",
  },
  {
    id: "cmp-2",
    organizationId: "org-1",
    title: "Dhanmondi Weekend Flash WhatsApp Campaign",
    channel: "whatsapp",
    targetAudience: "Dhanmondi & Mirpur Customers",
    message: "Hello! This weekend, enjoy instant complimentary gift hampers with purchase over ৳5000 at Rahman Fashion Dhanmondi outlet (Shimanto Square). Valid till Sunday!",
    recipientCount: 420,
    sentCount: 0,
    status: "scheduled",
    scheduledAt: "2026-03-01T10:00:00Z",
    createdAt: "2026-02-28T08:00:00Z",
  },
];

