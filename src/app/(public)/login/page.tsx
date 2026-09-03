"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTenant } from "@/lib/context/TenantContext";
import { UserRole } from "@/lib/types";
import {
  Lock,
  Mail,
  Sparkles,
  Building2,
  ShoppingCart,
  BarChart3,
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

// Demo personas with corresponding role and test credentials
const DEMO_PERSONAS: {
  role: UserRole;
  title: string;
  email: string;
  icon: typeof Building2;
  colorClass: string;
  bgClass: string;
  targetRoute: string;
}[] = [
  {
    role: "company_owner",
    title: "Company Owner",
    email: "owner@rahmanfashion.com.bd",
    icon: Building2,
    colorClass: "text-indigo-600 dark:text-indigo-400",
    bgClass: "hover:border-indigo-400 dark:hover:border-indigo-600",
    targetRoute: "/app/dashboard",
  },
  {
    role: "cashier",
    title: "Cashier (POS)",
    email: "cashier@rahmanfashion.com.bd",
    icon: ShoppingCart,
    colorClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "hover:border-emerald-400 dark:hover:border-emerald-600",
    targetRoute: "/app/pos",
  },
  {
    role: "accountant",
    title: "Accountant",
    email: "accountant@rahmanfashion.com.bd",
    icon: BarChart3,
    colorClass: "text-blue-600 dark:text-blue-400",
    bgClass: "hover:border-blue-400 dark:hover:border-blue-600",
    targetRoute: "/app/accounting",
  },
  {
    role: "super_admin",
    title: "Super Admin",
    email: "admin@xyzpos.com.bd",
    icon: Shield,
    colorClass: "text-purple-600 dark:text-purple-400",
    bgClass: "hover:border-purple-400 dark:hover:border-purple-600",
    targetRoute: "/super-admin",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentRole } = useTenant();

  const [emailOrPhone, setEmailOrPhone] = useState("owner@rahmanfashion.com.bd");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeRoleLoading, setActiveRoleLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!emailOrPhone.trim()) {
      setErrorMessage("Please enter your email or phone number.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);

    // Default to company_owner if not set via persona
    setCurrentRole("company_owner");

    setTimeout(() => {
      setIsLoading(false);
      router.push("/app/dashboard");
    }, 600);
  };

  const handleQuickRoleLogin = (
    role: UserRole,
    email: string,
    targetRoute: string
  ) => {
    setEmailOrPhone(email);
    setPassword("password123");
    setActiveRoleLoading(role);
    setCurrentRole(role);

    setTimeout(() => {
      router.push(targetRoute);
    }, 450);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/15 via-cyan-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md space-y-5"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="h-11 w-11 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/25">
            X
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Sign In to XYZ Business OS
          </h1>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Access your POS terminal, inventory, double-entry accounting, and multi-branch network
          </p>
        </div>

        {/* Quick Persona Demo Login Buttons */}
        <div className="p-4 rounded-3xl border border-indigo-200/80 dark:border-indigo-800/60 bg-indigo-50/40 dark:bg-indigo-950/30 space-y-2.5 shadow-subtle-xs backdrop-blur-sm">
          <div className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
              <span>Interactive Demo: 1-Click Role Login</span>
            </div>
            <span className="text-[10px] text-indigo-600/80 dark:text-indigo-400/80 font-medium">
              Click to jump
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {DEMO_PERSONAS.map((persona) => {
              const Icon = persona.icon;
              const isSelected = activeRoleLoading === persona.role;

              return (
                <button
                  key={persona.role}
                  type="button"
                  disabled={isLoading || activeRoleLoading !== null}
                  onClick={() =>
                    handleQuickRoleLogin(
                      persona.role,
                      persona.email,
                      persona.targetRoute
                    )
                  }
                  className={`p-2.5 rounded-xl bg-card border border-border/80 ${persona.bgClass} font-bold text-foreground text-left shadow-subtle-xs hover:shadow-subtle-sm transition-all flex items-center justify-between gap-1.5 active:scale-95 disabled:opacity-70`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className={`h-4 w-4 ${persona.colorClass} shrink-0`} />
                    <span className="truncate text-xs">{persona.title}</span>
                  </div>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card/95 backdrop-blur-xl shadow-xl shadow-indigo-500/5 space-y-5">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {/* Email or Phone */}
            <div className="space-y-1.5">
              <label className="font-bold text-foreground">Email Address or Phone</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="owner@domain.com or 01711-xxxxxx"
                  value={emailOrPhone}
                  onChange={(e) => {
                    setEmailOrPhone(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full h-10 pl-10 pr-3 rounded-xl border border-border/80 bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-foreground">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your account password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full h-10 pl-10 pr-10 rounded-xl border border-border/80 bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-xs text-muted-foreground cursor-pointer select-none"
                >
                  Remember device for 30 days
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full h-11 font-bold shadow-md shadow-indigo-500/25 text-xs flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <span>Sign In to Business</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Footer link to register */}
          <div className="text-center pt-3 border-t border-border/70 text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5 ml-1"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
