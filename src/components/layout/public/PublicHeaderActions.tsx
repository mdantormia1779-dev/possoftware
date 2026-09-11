"use client";

import React from "react";
import Link from "next/link";
import { Menu, X, Sparkles, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface PublicHeaderActionsProps {
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

export function PublicHeaderActions({
  mobileOpen,
  onToggleMobile,
}: PublicHeaderActionsProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    const currentTheme = resolvedTheme || theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative shrink-0 cursor-pointer"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
        <Moon className="absolute top-2 left-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-amber-400" />
      </button>

      <Link
        href="/login"
        className="hidden md:inline-flex px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted rounded-xl transition-colors shrink-0"
      >
        Sign In
      </Link>

      <Link
        href="/register"
        className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/25 transition-transform active:scale-95 shrink-0"
      >
        <Sparkles className="h-3.5 w-3.5 shrink-0" />
        <span>Start Free Trial</span>
      </Link>

      <button
        onClick={onToggleMobile}
        aria-label="Toggle navigation menu"
        className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted shrink-0 cursor-pointer"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  );
}
