import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const returns = await prisma.saleReturn.findMany({
      where: { sale: { organizationId } },
      include: {
        sale: { select: { invoiceNumber: true, branchId: true } },
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(returns);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch sale returns", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { saleId, totalRefund, reason, items } = await req.json();

    if (!saleId || !items?.length) {
      return apiError("saleId and items are required", 400);
    }

    const sale = await prisma.sale.findFirst({
      where: { id: saleId, organizationId },
    });
    if (!sale) return apiError("Sale not found", 404);

    const returnNumber = `RET-${Date.now().toString().slice(-6)}`;

    const saleReturn = await prisma.$transaction(async (tx) => {
      const created = await tx.saleReturn.create({
        data: {
          saleId,
          returnNumber,
          totalRefund: Number(totalRefund),
          reason,
          items: {
            create: items.map((it: any) => ({
              productName: it.productName,
              quantity: Number(it.quantity),
              refundAmount: Number(it.refundAmount),
            })),
          },
        },
        include: { items: true },
      });

      await tx.sale.update({
        where: { id: saleId },
        data: { status: "RETURNED" },
      });

      return created;
    });

    return apiSuccess(saleReturn, "Sale return processed", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to process return", 500);
  }
}
