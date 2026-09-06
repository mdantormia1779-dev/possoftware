import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const categories = await prisma.category.findMany({
      where: { organizationId },
      include: { _count: { select: { products: true } } },
      orderBy: { name: "asc" },
    });
    return apiSuccess(categories);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch categories", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { name, imageUrl } = await req.json();

    if (!name) return apiError("Name is required", 400);

    const slug =
      name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

    const category = await prisma.category.create({
      data: { organizationId, name, slug, imageUrl },
    });

    return apiSuccess(category, "Category created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create category", 500);
  }
}
