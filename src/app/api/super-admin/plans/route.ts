import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET() {
  try {
    const plans = await prisma.platformPlan.findMany({
      orderBy: { monthlyPrice: "asc" },
    });
    return apiSuccess(plans);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch plans", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    if (!b.name || !b.tier || b.monthlyPrice === undefined) {
      return apiError("name, tier and monthlyPrice are required", 400);
    }
    const plan = await prisma.platformPlan.create({
      data: {
        name: b.name,
        tier: b.tier,
        monthlyPrice: Number(b.monthlyPrice),
        yearlyPrice: Number(b.yearlyPrice || b.monthlyPrice * 10),
        maxBranches: Number(b.maxBranches || 1),
        maxStaff: Number(b.maxStaff || 5),
        maxProducts: Number(b.maxProducts || 5000),
        features: typeof b.features === "string" ? b.features : JSON.stringify(b.features || []),
      },
    });
    return apiSuccess(plan, "Platform plan created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create plan", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const b = await req.json();
    if (!b.id) return apiError("Plan ID is required", 400);

    const plan = await prisma.platformPlan.update({
      where: { id: b.id },
      data: {
        name: b.name,
        tier: b.tier,
        monthlyPrice: b.monthlyPrice !== undefined ? Number(b.monthlyPrice) : undefined,
        yearlyPrice: b.yearlyPrice !== undefined ? Number(b.yearlyPrice) : undefined,
        maxBranches: b.maxBranches !== undefined ? Number(b.maxBranches) : undefined,
        maxStaff: b.maxStaff !== undefined ? Number(b.maxStaff) : undefined,
        maxProducts: b.maxProducts !== undefined ? Number(b.maxProducts) : undefined,
        features: b.features !== undefined
          ? (typeof b.features === "string" ? b.features : JSON.stringify(b.features))
          : undefined,
      },
    });
    return apiSuccess(plan, "Platform plan updated");
  } catch (error: any) {
    return apiError(error.message || "Failed to update plan", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Plan ID is required", 400);

    await prisma.platformPlan.delete({ where: { id } });
    return apiSuccess(null, "Platform plan deleted successfully");
  } catch (error: any) {
    return apiError(error.message || "Failed to delete plan", 500);
  }
}
