"use client";

import React from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface PublicHeaderActionsProps {
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

export function PublicHeaderActions({
  mobileOpen,
  onToggleMobile,
}: PublicHeaderActionsProps): React.JSX.Element {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = (): void => {
    const currentTheme = resolvedTheme || theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
      {/* Theme toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={[
          "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg",
          "border border-border text-muted-foreground",
          "transition-colors duration-200 hover:bg-muted hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
        ].join(" ")}
      >
        {/* Dark mode-e Sun, light mode-e Moon dekhabe */}
        <Sun className="hidden size-[18px] dark:block" aria-hidden="true" />
        <Moon className="block size-[18px] dark:hidden" aria-hidden="true" />
      </button>

      {/* Sign In */}
      <Link
        href="/login"
        className={[
          "hidden shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground md:inline-flex",
          "transition-colors duration-200 hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
        ].join(" ")}
      >
        Sign In
      </Link>

      {/* CTA */}
      <Link
        href="/register"
        className={[
          "hidden shrink-0 items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white sm:inline-flex",
          "transition-colors duration-200 hover:bg-blue-500",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ].join(" ")}
      >
        Start Free Trial
      </Link>

      {/* Mobile menu button */}
      <button
        type="button"
        onClick={onToggleMobile}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileOpen}
        className={[
          "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg lg:hidden",
          "border border-border text-muted-foreground",
          "transition-colors duration-200 hover:bg-muted hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
          mobileOpen ? "bg-muted text-foreground" : "",
        ].join(" ")}
      >
        {mobileOpen ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}