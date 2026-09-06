import { NextResponse } from "next/server";
import { apiSuccess } from "@/lib/api-response";
import { AUTH_COOKIE_NAME } from "@/lib/auth-token";

export async function POST() {
  const response = apiSuccess(null, "Logged out successfully");
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return response;
}
