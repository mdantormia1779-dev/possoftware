"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTenant } from "@/lib/context/TenantContext";
import { UserRole } from "@/lib/types";
import { Lock, Mail, ArrowRight, Sparkles, Shield, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentRole } = useTenant();
  const [emailOrPhone, setEmailOrPhone] = useState("owner@rahmanfashion.com.bd");
  const [password, setPassword] = useState("••••••••");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/app/dashboard");
    }, 600);
  };

  const handleQuickRoleLogin = (role: UserRole, targetRoute = "/app/dashboard") => {
    setCurrentRole(role);
    if (role === "super_admin") {
      router.push("/super-admin");
    } else if (role === "cashier") {
      router.push("/app/pos");
    } else {
      router.push(targetRoute);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="h-10 w-10 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-500/25">
            X
          </div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Sign In to XYZ Business OS
          </h1>
          <p className="text-xs text-muted-foreground">
            Access your POS, inventory, accounting, and multi-branch hub
          </p>
        </div>

        {/* Quick Persona Demo Login Buttons */}
        <div className="p-3.5 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30 space-y-2">
          <div className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Interactive Demo: Quick 1-Click Role Login</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => handleQuickRoleLogin("company_owner")}
              className="px-2.5 py-1.5 rounded-lg bg-card border border-border hover:border-indigo-400 font-semibold text-foreground text-left shadow-2xs"
            >
              🏢 Company Owner
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin("cashier", "/app/pos")}
              className="px-2.5 py-1.5 rounded-lg bg-card border border-border hover:border-indigo-400 font-semibold text-foreground text-left shadow-2xs"
            >
              🛒 Cashier (POS)
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin("accountant", "/app/accounting")}
              className="px-2.5 py-1.5 rounded-lg bg-card border border-border hover:border-indigo-400 font-semibold text-foreground text-left shadow-2xs"
            >
              📊 Accountant
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin("super_admin")}
              className="px-2.5 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 font-semibold text-purple-900 dark:text-purple-300 text-left shadow-2xs"
            >
              🛡️ Super Admin
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-5">
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Email Address or Phone</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-foreground">Password</label>
                <Link href="/forgot-password" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-border text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-muted-foreground">
                Remember this device for 30 days
              </label>
            </div>

            <Button type="submit" variant="primary" isLoading={isLoading} className="w-full h-10 font-bold">
              Sign In to Business
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-border text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
