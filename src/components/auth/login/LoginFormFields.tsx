import React from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LoginPasswordField } from "./LoginPasswordField";

interface LoginFormFieldsProps {
  emailOrPhone: string;
  setEmailOrPhone: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  rememberMe: boolean;
  setRememberMe: (v: boolean) => void;
  isLoading: boolean;
}

export function LoginFormFields({
  emailOrPhone,
  setEmailOrPhone,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  isLoading,
}: LoginFormFieldsProps) {
  return (
    <>
      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Email Address or Phone</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            required
            placeholder="owner@domain.com or 01711-xxxxxx"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="w-full h-10 pl-10 pr-3 rounded-lg border border-border bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
          />
        </div>
      </div>

      <LoginPasswordField
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <div className="flex items-center justify-between pt-0.5">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
          />
          <label htmlFor="remember" className="ml-2 text-xs text-muted-foreground cursor-pointer select-none">
            Remember device for 30 days
          </label>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        className="w-full h-10 font-bold shadow-subtle-sm text-xs flex items-center justify-center gap-2 active:scale-[0.99]"
      >
        <span>Sign In to Business</span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </>
  );
}
