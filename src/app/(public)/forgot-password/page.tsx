"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Reset Your Password
          </h1>
          <p className="text-xs text-muted-foreground">
            Enter your email or phone number to receive recovery instructions
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-foreground">Recovery Link Sent</h3>
              <p className="text-xs text-muted-foreground">
                We sent a password reset link to <strong>{email}</strong>.
              </p>
              <Link href="/login" className="inline-block mt-4 text-xs font-bold text-indigo-600 hover:underline">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Account Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="owner@domain.com"
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full h-10 font-bold">
                Send Reset Link
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
