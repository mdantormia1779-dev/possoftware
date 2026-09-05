import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <span className="text-6xl font-black bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            404
          </span>
          <h1 className="text-2xl font-bold tracking-tight">Page Not Found</h1>
          <p className="text-sm text-muted-foreground">
            The page you are looking for does not exist, has been removed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>
          <Link
            href="/app/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-semibold text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
