import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId, userId } = await getTenantContext(req);
    const notifications = await prisma.systemNotification.findMany({
      where: {
        organizationId,
        OR: [{ userId: null }, { userId }],
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return apiSuccess(notifications);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch notifications", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { title, message, type = "INFO", link, userId } = await req.json();

    if (!title || !message) {
      return apiError("title and message are required", 400);
    }

    const notification = await prisma.systemNotification.create({
      data: {
        organizationId,
        userId: userId || null,
        title,
        message,
        type,
        link,
      },
    });

    return apiSuccess(notification, "Notification created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create notification", 500);
  }
}
