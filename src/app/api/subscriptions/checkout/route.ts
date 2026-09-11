import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function POST(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const body = await req.json();
    const {
      amount,
      planTier = "ENTERPRISE",
      billingCycle = "MONTHLY",
      paymentMethod = "BKASH",
      transactionId,
      senderNumber,
      notes,
    } = body;

    if (!amount || Number(amount) <= 0) {
      return apiError("Valid payment amount is required", 400);
    }
    if (!transactionId || !transactionId.trim()) {
      return apiError("Transaction ID (TrxID) is required for payment verification", 400);
    }

    const invoiceNumber = `SUB-${Date.now().toString().slice(-6)}`;

    const invoice = await prisma.subscriptionInvoice.create({
      data: {
        organizationId,
        invoiceNumber,
        amount: Number(amount),
        planTier: String(planTier).toUpperCase(),
        billingCycle,
        paymentMethod: String(paymentMethod).toUpperCase(),
        transactionId: transactionId.trim(),
        senderNumber: senderNumber?.trim() || null,
        notes: notes?.trim() || null,
        status: "PENDING",
      },
    });

    return apiSuccess(
      invoice,
      "Subscription payment submitted for verification. Super Admin will approve shortly.",
      201
    );
  } catch (err: any) {
    return apiError(err.message || "Failed to submit subscription checkout", 500);
  }
}
