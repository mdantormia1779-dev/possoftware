import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { id } = await params;

    const sale = await prisma.sale.findFirst({
      where: { id, organizationId },
      include: {
        customer: true,
        branch: true,
        cashier: { select: { id: true, name: true, email: true } },
        items: { include: { product: true } },
        payments: true,
        returns: { include: { items: true } },
      },
    });

    if (!sale) return apiError("Sale not found", 404);
    return apiSuccess(sale);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch sale details", 500);
  }
}
