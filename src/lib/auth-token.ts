import crypto from "crypto";
import { NextRequest } from "next/server";

const SECRET = process.env.NEXTAUTH_SECRET || "pos-secret-2026-xyz";
export const AUTH_COOKIE_NAME = "xyz_auth_token";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  orgId: string;
  branchId?: string;
  exp: number;
}

export function signAuthToken(data: Omit<TokenPayload, "exp">): string {
  const exp = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
  const payload: TokenPayload = { ...data, exp };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(encoded)
    .digest("base64url");
  return `${encoded}.${signature}`;
}

export function verifyAuthToken(token: string): TokenPayload | null {
  try {
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return null;
    const expectedSig = crypto
      .createHmac("sha256", SECRET)
      .update(encoded)
      .digest("base64url");
    if (signature !== expectedSig) return null;
    const payload: TokenPayload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf-8")
    );
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getAuthPayload(req: NextRequest): TokenPayload | null {
  const cookie = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (cookie) {
    const verified = verifyAuthToken(cookie);
    if (verified) return verified;
  }
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return verifyAuthToken(authHeader.substring(7));
  }
  return null;
}
