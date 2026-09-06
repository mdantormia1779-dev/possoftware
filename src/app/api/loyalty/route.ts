import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId");

    const txns = await prisma.loyaltyTransaction.findMany({
      where: {
        customer: { organizationId },
        ...(customerId ? { customerId } : {}),
      },
      include: { customer: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return apiSuccess(txns);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch loyalty transactions", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { customerId, points, type, notes } = await req.json();

    if (!customerId || !points || !type) {
      return apiError("customerId, points and type are required", 400);
    }

    const [txn, customer] = await prisma.$transaction([
      prisma.loyaltyTransaction.create({
        data: {
          customerId,
          points: Number(points),
          type,
          notes,
        },
      }),
      prisma.customer.update({
        where: { id: customerId },
        data: { loyaltyPoints: { increment: Number(points) } },
      }),
    ]);

    return apiSuccess({ txn, currentPoints: customer.loyaltyPoints }, "Loyalty adjusted", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to adjust loyalty points", 500);
  }
}
