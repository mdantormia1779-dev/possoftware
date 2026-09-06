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
    const customer = await prisma.customer.findFirst({
      where: { id, organizationId },
      include: {
        sales: { take: 10, orderBy: { createdAt: "desc" } },
        loyaltyTxns: { take: 10, orderBy: { createdAt: "desc" } },
      },
    });
    if (!customer) return apiError("Customer not found", 404);
    return apiSuccess(customer);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch customer", 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { id } = await params;
    const b = await req.json();

    const updated = await prisma.customer.updateMany({
      where: { id, organizationId },
      data: {
        name: b.name,
        phone: b.phone,
        email: b.email,
        address: b.address,
        creditLimit: b.creditLimit,
      },
    });
    return apiSuccess(updated, "Customer updated");
  } catch (error: any) {
    return apiError(error.message || "Failed to update customer", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { id } = await params;
    await prisma.customer.deleteMany({ where: { id, organizationId } });
    return apiSuccess(null, "Customer deleted");
  } catch (error: any) {
    return apiError(error.message || "Failed to delete customer", 500);
  }
}
