import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";

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
    return apiSuccess(invoices);
  } catch (err: any) {
    return apiError(err.message || "Failed to fetch platform billing invoices", 500);
  }
}
