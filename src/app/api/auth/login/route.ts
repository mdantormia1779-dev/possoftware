import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { verifyPassword } from "@/lib/crypto";
import { signAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth-token";
import { ensureDemoPersonas } from "@/lib/demo-auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const identifier = (body.emailOrPhone || body.email || "").trim().toLowerCase();
    const password = body.password;

    if (!identifier || !password) {
      return apiError("Email or phone number and password are required", 400);
    }

    if (identifier.includes("rahmanfashion.com.bd") || identifier.includes("xyzpos.com")) {
      await ensureDemoPersonas(identifier);
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
      },
      include: { organization: true, branch: true },
    });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return apiError("Invalid email/phone or password", 401);
    }

    if (!user.isActive) {
      return apiError("Your account has been deactivated. Please contact support.", 403);
    }

    const clientRole = user.role.toLowerCase();
    const token = signAuthToken({
      userId: user.id,
      email: user.email,
      role: clientRole,
      orgId: user.organizationId || "",
      branchId: user.branchId || undefined,
    });

    const response = apiSuccess(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: clientRole,
          organizationId: user.organizationId,
          branchId: user.branchId,
        },
        organization: user.organization,
        branch: user.branch,
        token,
      },
      "Login successful"
    );

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return apiError(error.message || "Login failed", 500);
  }
}
