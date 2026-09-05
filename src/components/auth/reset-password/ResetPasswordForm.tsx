"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PasswordGuidelines } from "./PasswordGuidelines";
import { ResetPasswordInputs } from "./ResetPasswordInputs";

interface ResetPasswordFormProps {
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  error: string;
  hasMinLength: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function ResetPasswordForm({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  error,
  hasMinLength,
  hasNumber,
  hasSpecial,
  onSubmit,
}: ResetPasswordFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 text-xs">
      {error && (
        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
          {error}
        </div>
      )}

      <ResetPasswordInputs
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <PasswordGuidelines
        hasMinLength={hasMinLength}
        hasNumber={hasNumber}
        hasSpecial={hasSpecial}
      />

      <Button type="submit" variant="primary" className="w-full h-10 font-bold">
        Update Password
      </Button>

      <div className="text-center pt-2">
        <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground">
          Remember your password? <span className="font-bold text-indigo-600">Sign in</span>
        </Link>
      </div>
    </form>
  );
}
