import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const campaigns = await prisma.campaign.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(campaigns);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch campaigns", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const b = await req.json();

    if (!b.title || !b.message) {
      return apiError("title and message are required", 400);
    }

    const campaign = await prisma.campaign.create({
      data: {
        organizationId,
        title: b.title,
        channel: b.channel || "SMS",
        targetAudience: b.targetAudience || "All Customers",
        message: b.message,
        recipientCount: Number(b.recipientCount || 0),
        status: b.status || "DRAFT",
        scheduledAt: b.scheduledAt ? new Date(b.scheduledAt) : null,
      },
    });

    return apiSuccess(campaign, "Campaign created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create campaign", 500);
  }
}
