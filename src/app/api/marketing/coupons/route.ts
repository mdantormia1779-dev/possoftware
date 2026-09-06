import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const coupons = await prisma.coupon.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(coupons);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch coupons", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const b = await req.json();

    if (!b.code || !b.discountValue) {
      return apiError("code and discountValue are required", 400);
    }

    const coupon = await prisma.coupon.create({
      data: {
        organizationId,
        code: b.code.toUpperCase(),
        discountType: b.discountType || "PERCENTAGE",
        discountValue: Number(b.discountValue),
        minPurchase: Number(b.minPurchase || 0),
        usageLimit: Number(b.usageLimit || 100),
        expiresAt: b.expiresAt ? new Date(b.expiresAt) : null,
      },
    });

    return apiSuccess(coupon, "Coupon created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create coupon", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return apiError("id parameter is required", 400);

    await prisma.coupon.deleteMany({
      where: { id, organizationId },
    });

    return apiSuccess(null, "Coupon deleted");
  } catch (error: any) {
    return apiError(error.message || "Failed to delete coupon", 500);
  }
}
