import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const invoices = await prisma.subscriptionInvoice.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(invoices);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch invoices", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { amount, billingCycle = "MONTHLY", paymentMethod = "BKASH", transactionId } = await req.json();

    if (!amount) return apiError("amount is required", 400);

    const invoiceNumber = `SUB-${Date.now().toString().slice(-6)}`;

    const invoice = await prisma.subscriptionInvoice.create({
      data: {
        organizationId,
        invoiceNumber,
        amount: Number(amount),
        billingCycle,
        paymentMethod,
        transactionId,
        status: "PAID",
        paidAt: new Date(),
      },
    });

    await prisma.organization.update({
      where: { id: organizationId },
      data: { subscriptionStatus: "ACTIVE" },
    });

    return apiSuccess(invoice, "Subscription invoice created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create subscription invoice", 500);
  }
}
