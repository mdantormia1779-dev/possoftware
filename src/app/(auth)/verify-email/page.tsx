"use client";

import React from "react";
import Link from "next/link";
import { useVerifyEmail } from "@/components/auth/verify-email/useVerifyEmail";
import { VerifyEmailHeader } from "@/components/auth/verify-email/VerifyEmailHeader";
import { VerifyEmailSuccess } from "@/components/auth/verify-email/VerifyEmailSuccess";
import { VerifyEmailOtpForm } from "@/components/auth/verify-email/VerifyEmailOtpForm";

export default function VerifyEmailPage() {
  const v = useVerifyEmail();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <VerifyEmailHeader />

        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm">
          {v.isVerified ? (
            <VerifyEmailSuccess />
          ) : (
            <VerifyEmailOtpForm
              otp={v.otp}
              isVerifying={v.isVerifying}
              resendCooldown={v.resendCooldown}
              resendSent={v.resendSent}
              onOtpChange={v.handleOtpChange}
              onKeyDown={v.handleKeyDown}
              onVerify={v.handleVerify}
              onResend={v.handleResend}
            />
          )}
        </div>

        <div className="text-center">
          <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground">
            Want to use a different email? <span className="font-bold text-indigo-600">Switch Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
