"use client";

import { useState, useEffect } from "react";

export function useVerifyEmail() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(45);
  const [resendSent, setResendSent] = useState(false);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOtpChange = (index: number, val: string) => {
    const char = val.length > 1 ? val.slice(-1) : val;
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    if (char && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1200);
  };

  const handleResend = () => {
    if (resendCooldown === 0) {
      setResendCooldown(60);
      setResendSent(true);
      setTimeout(() => setResendSent(false), 4000);
    }
  };

  return {
    otp,
    isVerifying,
    isVerified,
    resendCooldown,
    resendSent,
    handleOtpChange,
    handleKeyDown,
    handleVerify,
    handleResend,
  };
}
