"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useLoginForm } from "@/components/auth/login/useLoginForm";
import { LoginHeader } from "@/components/auth/login/LoginHeader";
import { LoginDemoPersonas } from "@/components/auth/login/LoginDemoPersonas";
import { LoginFormFields } from "@/components/auth/login/LoginFormFields";
import { LoginFooter } from "@/components/auth/login/LoginFooter";

export default function LoginPage() {
  const form = useLoginForm();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/15 via-cyan-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md space-y-5"
      >
        <LoginHeader />

        <LoginDemoPersonas
          isLoading={form.isLoading}
          activeRoleLoading={form.activeRoleLoading}
          onSelectPersona={form.handleQuickRoleLogin}
        />

        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-subtle-lg space-y-5">
          {form.errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{form.errorMessage}</span>
            </motion.div>
          )}

          <form onSubmit={form.handleLogin} className="space-y-4 text-xs">
            <LoginFormFields
              emailOrPhone={form.emailOrPhone}
              setEmailOrPhone={form.setEmailOrPhone}
              password={form.password}
              setPassword={form.setPassword}
              showPassword={form.showPassword}
              setShowPassword={form.setShowPassword}
              rememberMe={form.rememberMe}
              setRememberMe={form.setRememberMe}
              isLoading={form.isLoading}
            />
          </form>

          <LoginFooter />
        </div>
      </motion.div>
    </div>
  );
}
