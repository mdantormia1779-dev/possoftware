import React from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff } from "lucide-react";

interface LoginPasswordFieldProps {
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
}

export function LoginPasswordField({
  password,
  setPassword,
  showPassword,
  setShowPassword,
}: LoginPasswordFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-foreground">Password</label>
        <Link href="/forgot-password" className="text-primary font-semibold hover:underline">
          Forgot?
        </Link>
      </div>
      <div className="relative">
        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type={showPassword ? "text" : "password"}
          required
          placeholder="Enter your account password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-10 pl-10 pr-10 rounded-lg border border-border bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
