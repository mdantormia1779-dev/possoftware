import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    const customers = await prisma.customer.findMany({
      where: {
        organizationId,
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { phone: { contains: q } },
              ],
            }
          : {}),
      },
      include: {
        _count: { select: { sales: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(customers);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch customers", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const body = await req.json();

    if (!body.name || !body.phone) {
      return apiError("Name and phone are required", 400);
    }

    const customer = await prisma.customer.create({
      data: {
        organizationId,
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        address: body.address || null,
        creditLimit: body.creditLimit || 50000,
      },
    });

    return apiSuccess(customer, "Customer created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create customer", 500);
  }
}
