"use client";

import React from "react";
import { useResetPassword } from "@/components/auth/reset-password/useResetPassword";
import { ResetPasswordHeader } from "@/components/auth/reset-password/ResetPasswordHeader";
import { ResetPasswordSuccess } from "@/components/auth/reset-password/ResetPasswordSuccess";
import { ResetPasswordForm } from "@/components/auth/reset-password/ResetPasswordForm";

export default function ResetPasswordPage() {
  const r = useResetPassword();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <ResetPasswordHeader />

        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm">
          {r.submitted ? (
            <ResetPasswordSuccess />
          ) : (
            <ResetPasswordForm
              password={r.password}
              setPassword={r.setPassword}
              confirmPassword={r.confirmPassword}
              setConfirmPassword={r.setConfirmPassword}
              showPassword={r.showPassword}
              setShowPassword={r.setShowPassword}
              error={r.error}
              hasMinLength={r.hasMinLength}
              hasNumber={r.hasNumber}
              hasSpecial={r.hasSpecial}
              onSubmit={r.handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
