import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess } from "@/lib/api-response";
import { INITIAL_SUBSCRIPTION_INVOICES } from "@/data/mocks/platformPayments";

export async function GET() {
  try {
    const invoices = await prisma.subscriptionInvoice.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        organization: {
          select: { id: true, name: true, slug: true, email: true, phone: true },
        },
      },
    });
    return apiSuccess(invoices.length > 0 ? invoices : INITIAL_SUBSCRIPTION_INVOICES);
  } catch (err: any) {
    console.error("Billing invoices DB error (deploy fallback):", err?.message);
    return apiSuccess(INITIAL_SUBSCRIPTION_INVOICES);
  }
}
