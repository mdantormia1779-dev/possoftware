"use client";

import React from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

interface ResetPasswordInputsProps {
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
}

export function ResetPasswordInputs({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
}: ResetPasswordInputsProps) {
  return (
    <>
      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">New Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter at least 8 characters"
            className="w-full h-10 pl-9 pr-10 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Confirm New Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat password"
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </>
  );
}
