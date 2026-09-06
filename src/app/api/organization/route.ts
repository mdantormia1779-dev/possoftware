import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const org = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: { branches: true },
    });
    if (!org) return apiError("Organization not found", 404);
    return apiSuccess(org);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch organization", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const body = await req.json();

    const updated = await prisma.organization.update({
      where: { id: organizationId },
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        address: body.address,
        taxNumber: body.taxNumber,
        currency: body.currency,
        currencySymbol: body.currencySymbol,
        businessType: body.businessType,
        logoUrl: body.logoUrl,
      },
    });

    return apiSuccess(updated, "Organization updated successfully");
  } catch (error: any) {
    return apiError(error.message || "Failed to update organization", 500);
  }
}
