import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId, userId } = await getTenantContext(req);
    const role = new URL(req.url).searchParams.get("role");
    const roleConds = role && role !== "super_admin" && role !== "company_owner"
      ? [{ targetRole: null }, { targetRole: "all" }, { targetRole: role }] : undefined;

    const notifs = await prisma.systemNotification.findMany({
      where: {
        organizationId,
        OR: [{ userId: null }, { userId }],
        ...(roleConds && { AND: [{ OR: roleConds }] }),
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    const parsed = notifs.map((n) => {
      let clearedBy: string[] = [];
      try { clearedBy = n.clearedBy ? JSON.parse(n.clearedBy) : []; } catch {}
      return { ...n, clearedBy };
    });
    return apiSuccess(parsed);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch notifications", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId, userId: ctxUserId } = await getTenantContext(req);
    const body = await req.json();
    const { title, message, type = "INFO", targetRole = "all", link, userId, createdBy, createdByName, createdByRole } = body;
    if (!title || !message) return apiError("title and message are required", 400);

    const notification = await prisma.systemNotification.create({
      data: {
        organizationId, userId: userId || null, title, message, type, targetRole, link,
        createdBy: createdBy || ctxUserId || null,
        createdByName: createdByName || null,
        createdByRole: createdByRole || null,
        clearedBy: "[]",
      },
    });
    return apiSuccess({ ...notification, clearedBy: [] }, "Notification created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create notification", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { organizationId, userId: ctxUserId } = await getTenantContext(req);
    const { searchParams } = new URL(req.url);
    const targetUserId = searchParams.get("userId") || ctxUserId;

    if (searchParams.get("action") === "clear" && targetUserId) {
      const all = await prisma.systemNotification.findMany({ where: { organizationId } });
      for (const n of all) {
        let list: string[] = [];
        try { list = n.clearedBy ? JSON.parse(n.clearedBy) : []; } catch {}
        if (!list.includes(targetUserId)) {
          list.push(targetUserId);
          await prisma.systemNotification.update({ where: { id: n.id }, data: { clearedBy: JSON.stringify(list) } });
        }
      }
      return apiSuccess({ cleared: true }, "Notifications cleared for user view");
    }

    await prisma.systemNotification.deleteMany({ where: { organizationId, OR: [{ userId: null }, { userId: ctxUserId }] } });
    return apiSuccess({ deleted: true }, "All notifications deleted");
  } catch (error: any) {
    return apiError(error.message || "Failed to delete notifications", 500);
  }
}

