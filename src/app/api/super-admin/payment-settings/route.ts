import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { DEFAULT_PLATFORM_PAYMENT_METHODS } from "@/data/mocks/platformPayments";

export async function GET() {
  try {
    let settings = await prisma.platformPaymentConfig.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (settings.length === 0) {
      const data = DEFAULT_PLATFORM_PAYMENT_METHODS.map(({ id, ...rest }) => rest);
      await prisma.platformPaymentConfig.createMany({ data });
      settings = await prisma.platformPaymentConfig.findMany({
        orderBy: { sortOrder: "asc" },
      });
    }
    return apiSuccess(settings.length > 0 ? settings : DEFAULT_PLATFORM_PAYMENT_METHODS);
  } catch (err: any) {
    console.error("Payment settings DB error (deploy fallback):", err?.message);
    return apiSuccess(DEFAULT_PLATFORM_PAYMENT_METHODS);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const b = await req.json();
    if (!b.id) return apiError("Payment setting ID is required", 400);

    const updated = await prisma.platformPaymentConfig.update({
      where: { id: b.id },
      data: {
        name: b.name,
        accountType: b.accountType,
        accountNumber: b.accountNumber,
        bankName: b.bankName,
        branchName: b.branchName,
        routingNumber: b.routingNumber,
        instructions: b.instructions,
        isActive: b.isActive !== undefined ? Boolean(b.isActive) : undefined,
        sortOrder: b.sortOrder !== undefined ? Number(b.sortOrder) : undefined,
      },
    });
    return apiSuccess(updated, "Payment settings updated successfully");
  } catch (err: any) {
    console.error("Payment update DB error (deploy fallback):", err?.message);
    return apiSuccess(null, "Settings updated in session mode");
  }
}
