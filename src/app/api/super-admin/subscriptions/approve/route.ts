import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const { invoiceId, action = "APPROVE", rejectionReason } = await req.json();
    if (!invoiceId) return apiError("Invoice ID is required", 400);

    const invoice = await prisma.subscriptionInvoice.findUnique({
      where: { id: invoiceId },
      include: { organization: true },
    });
    if (!invoice) return apiError("Subscription invoice not found", 404);

    if (action === "REJECT") {
      const updated = await prisma.subscriptionInvoice.update({
        where: { id: invoiceId },
        data: { status: "FAILED", notes: rejectionReason || "Rejected by Super Admin" },
      });
      return apiSuccess(updated, "Subscription request rejected");
    }

    const tier = (invoice.planTier || "ENTERPRISE").toUpperCase() as "STARTER" | "BUSINESS" | "ENTERPRISE";
    const daysToAdd = invoice.billingCycle === "YEARLY" ? 365 : 30;
    const newEndDate = new Date();
    newEndDate.setDate(newEndDate.getDate() + daysToAdd);

    const quotaMap = {
      STARTER: { maxBranches: 1, maxStaff: 5, maxProducts: 5000 },
      BUSINESS: { maxBranches: 3, maxStaff: 20, maxProducts: 20000 },
      ENTERPRISE: { maxBranches: 10, maxStaff: 100, maxProducts: 100000 },
    };
    const quotas = quotaMap[tier] || quotaMap.ENTERPRISE;

    await prisma.$transaction([
      prisma.subscriptionInvoice.update({
        where: { id: invoiceId },
        data: { status: "PAID", paidAt: new Date(), approvedAt: new Date(), approvedBy: "SUPER_ADMIN" },
      }),
      prisma.organization.update({
        where: { id: invoice.organizationId },
        data: {
          subscriptionStatus: "ACTIVE",
          subscriptionPlan: tier,
          subscriptionEndsAt: newEndDate,
          maxBranches: quotas.maxBranches,
          maxStaff: quotas.maxStaff,
          maxProducts: quotas.maxProducts,
        },
      }),
      prisma.systemNotification.create({
        data: {
          organizationId: invoice.organizationId,
          title: `Subscription Upgraded to ${tier} Plan!`,
          message: `Your ${tier} subscription has been approved. Enjoy increased quotas: ${quotas.maxBranches} branches & ${quotas.maxStaff} staff accounts.`,
          type: "SUCCESS",
        },
      }),
    ]);

    return apiSuccess({ invoiceId, tier, status: "PAID" }, `Successfully approved & activated ${tier} plan!`);
  } catch (err: any) {
    return apiError(err.message || "Failed to process subscription invoice", 500);
  }
}
