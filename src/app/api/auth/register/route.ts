import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { hashPassword } from "@/lib/crypto";
import { signAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth-token";
import { seedOrganizationAccounts } from "@/lib/auth-seed";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ownerName, name, email, password, companyName, businessType, branchName, city, phone } = body;
    const finalName = (ownerName || name || "").trim();
    const finalEmail = (email || "").trim().toLowerCase();

    if (!finalName || !finalEmail || !password) {
      return apiError("Name, email and password are required", 400);
    }
    if (password.length < 6) {
      return apiError("Password must be at least 6 characters long", 400);
    }

    const existingUser = await prisma.user.findUnique({ where: { email: finalEmail } });
    if (existingUser) {
      return apiError("An account with this email address already exists", 409);
    }

    const orgName = (companyName || `${finalName}'s Business`).trim();
    const slug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.floor(1000 + Math.random() * 9000);

    const org = await prisma.organization.create({
      data: {
        name: orgName,
        slug,
        businessType: businessType || "Retail",
        currency: "BDT",
        currencySymbol: "৳",
        phone: phone || null,
        email: finalEmail,
        branches: {
          create: {
            name: (branchName || "Main Branch").trim(),
            code: "BR-01",
            address: `${city || "Dhaka"} Outlet`,
            city: city || "Dhaka",
            isMainBranch: true,
          },
        },
      },
      include: { branches: true },
    });

    await seedOrganizationAccounts(org.id);

    const user = await prisma.user.create({
      data: {
        name: finalName,
        email: finalEmail,
        phone: phone || null,
        passwordHash: hashPassword(password),
        role: "COMPANY_OWNER",
        organizationId: org.id,
        branchId: org.branches[0]?.id,
      },
    });

    const token = signAuthToken({
      userId: user.id,
      email: user.email,
      role: "company_owner",
      orgId: org.id,
      branchId: org.branches[0]?.id,
    });

    const response = apiSuccess(
      {
        user: { id: user.id, name: user.name, email: user.email, role: "company_owner", phone: user.phone },
        organization: org,
        branch: org.branches[0],
        token,
      },
      "Registration successful",
      201
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
    return apiError(error.message || "Registration failed", 500);
  }
}
