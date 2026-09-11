import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

interface RouteParams { params: Promise<{ id: string }>; }

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const { organizationId, userId: ctxUserId } = await getTenantContext(req);
    const { id } = await params;
    const body = await req.json();
    const existing = await prisma.systemNotification.findFirst({ where: { id, organizationId } });
    if (!existing) return apiError("Notification not found", 404);

    const requesterId = body.userId || ctxUserId;
    const isSuperAdmin = body.role === "super_admin" || req.headers.get("x-user-role") === "super_admin";
    if (body.action === "clear_for_user" && requesterId) {
      let cleared: string[] = [];
      try { cleared = existing.clearedBy ? JSON.parse(existing.clearedBy) : []; } catch {}
      if (!cleared.includes(requesterId)) cleared.push(requesterId);
      const updated = await prisma.systemNotification.update({
        where: { id },
        data: { clearedBy: JSON.stringify(cleared) },
      });
      return apiSuccess(updated, "Notification cleared for user");
    }

    if (!isSuperAdmin && existing.createdBy && requesterId && existing.createdBy !== requesterId) {
      return apiError("Only the creator of this notification can edit it", 403);
    }

    const updated = await prisma.systemNotification.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.message !== undefined && { message: body.message }),
        ...(body.type !== undefined && { type: body.type }),
        ...(body.targetRole !== undefined && { targetRole: body.targetRole }),
        ...(body.link !== undefined && { link: body.link }),
        ...(body.isRead !== undefined && { isRead: Boolean(body.isRead) }),
      },
    });
    return apiSuccess(updated, "Notification updated successfully");
  } catch (error: any) {
    return apiError(error.message || "Failed to update notification", 500);
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { organizationId, userId: ctxUserId } = await getTenantContext(req);
    const { id } = await params;
    const existing = await prisma.systemNotification.findFirst({ where: { id, organizationId } });
    if (!existing) return apiError("Notification not found", 404);

    const requesterId = req.nextUrl.searchParams.get("userId") || ctxUserId;
    const isSuperAdmin = req.nextUrl.searchParams.get("role") === "super_admin" || req.headers.get("x-user-role") === "super_admin";
    const clearOnly = req.nextUrl.searchParams.get("clearOnly") === "true";

    if (!isSuperAdmin && (clearOnly || (existing.createdBy && requesterId && existing.createdBy !== requesterId))) {
      let cleared: string[] = [];
      try { cleared = existing.clearedBy ? JSON.parse(existing.clearedBy) : []; } catch {}
      if (requesterId && !cleared.includes(requesterId)) cleared.push(requesterId);
      await prisma.systemNotification.update({
        where: { id },
        data: { clearedBy: JSON.stringify(cleared) },
      });
      return apiSuccess({ id, clearedForUser: true }, "Notification cleared from your view");
    }

    await prisma.systemNotification.delete({ where: { id } });
    return apiSuccess({ id, deleted: true }, "Notification deleted successfully");
  } catch (error: any) {
    return apiError(error.message || "Failed to delete notification", 500);
  }
}

