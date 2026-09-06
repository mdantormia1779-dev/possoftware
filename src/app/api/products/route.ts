import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId, branchId } = await getTenantContext(req);
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const categoryId = searchParams.get("categoryId");

    const products = await prisma.product.findMany({
      where: {
        organizationId,
        ...(categoryId ? { categoryId } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { sku: { contains: q, mode: "insensitive" } },
                { barcode: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: {
        category: true,
        branchStocks: branchId ? { where: { branchId } } : true,
      },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(products);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch products", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId, branchId } = await getTenantContext(req);
    const body = await req.json();

    if (!body.name || !body.sku || body.sellingPrice === undefined) {
      return apiError("Name, SKU and sellingPrice are required", 400);
    }

    const product = await prisma.product.create({
      data: {
        organizationId,
        categoryId: body.categoryId || null,
        name: body.name,
        nameBn: body.nameBn || null,
        sku: body.sku,
        barcode: body.barcode || null,
        description: body.description || null,
        purchasePrice: body.purchasePrice || 0,
        sellingPrice: body.sellingPrice,
        taxRate: body.taxRate || 0,
        minStockAlert: body.minStockAlert || 5,
        unit: body.unit || "pcs",
        imageUrl: body.imageUrl || null,
        ...(branchId
          ? {
              branchStocks: {
                create: {
                  branchId,
                  quantity: body.initialStock || 0,
                },
              },
            }
          : {}),
      },
      include: { category: true, branchStocks: true },
    });

    return apiSuccess(product, "Product created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create product", 500);
  }
}
