"use client";

import React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface VerifyEmailOtpFormProps {
  otp: string[];
  isVerifying: boolean;
  resendCooldown: number;
  resendSent: boolean;
  onOtpChange: (index: number, val: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onVerify: (e: React.FormEvent) => void;
  onResend: () => void;
}

export function VerifyEmailOtpForm({
  otp,
  isVerifying,
  resendCooldown,
  resendSent,
  onOtpChange,
  onKeyDown,
  onVerify,
  onResend,
}: VerifyEmailOtpFormProps) {
  return (
    <form onSubmit={onVerify} className="space-y-6 text-xs">
      <div className="space-y-3 text-center">
        <label className="font-semibold text-foreground block">
          Enter 6-digit Verification Code
        </label>
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-input-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => onOtpChange(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              className="w-10 h-12 sm:w-11 sm:h-13 text-center text-lg font-black rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-xs"
            />
          ))}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={otp.join("").length < 6 || isVerifying}
        className="w-full h-10 font-bold"
      >
        {isVerifying ? (
          <span className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" /> Verifying Code...
          </span>
        ) : (
          "Verify & Activate Workspace"
        )}
      </Button>

      {resendSent && (
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-center text-[11px] font-medium">
          A fresh 6-digit code has been dispatched to your email inbox.
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-border text-[11px] text-muted-foreground">
        <span>Didn&apos;t receive code?</span>
        <button
          type="button"
          onClick={onResend}
          disabled={resendCooldown > 0}
          className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50 disabled:no-underline"
        >
          {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend code now"}
        </button>
      </div>
    </form>
  );
}
