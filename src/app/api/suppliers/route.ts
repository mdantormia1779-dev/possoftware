import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const suppliers = await prisma.supplier.findMany({
      where: { organizationId },
      include: { _count: { select: { purchaseOrders: true } } },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(suppliers);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch suppliers", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const body = await req.json();

    if (!body.name || !body.phone) {
      return apiError("Name and phone are required", 400);
    }

    const supplier = await prisma.supplier.create({
      data: {
        organizationId,
        name: body.name,
        companyName: body.companyName || null,
        phone: body.phone,
        email: body.email || null,
        address: body.address || null,
      },
    });

    return apiSuccess(supplier, "Supplier created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create supplier", 500);
  }
}
