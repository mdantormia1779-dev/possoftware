"use client";

import React from "react";
import Link from "next/link";
import { Menu, X, Sparkles, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface PublicHeaderActionsProps {
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

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
    <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
      {/* Theme toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={[
          "group relative flex size-9 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl",
          "text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground",
          "hover:-translate-y-0.5 hover:shadow-md hover:shadow-amber-500/10 active:scale-90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60",
        ].join(" ")}
      >
        {/* Hover glow */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-xl bg-gradient-to-tr from-amber-400/0 via-amber-400/10 to-amber-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <Sun
          className={[
            "absolute size-[18px] text-amber-500 transition-all duration-500",
            EASE,
            "rotate-0 scale-100 opacity-100 group-hover:rotate-45",
            "dark:-rotate-90 dark:scale-0 dark:opacity-0",
            "motion-reduce:transition-none",
          ].join(" ")}
        />
        <Moon
          className={[
            "absolute size-[18px] text-amber-400 transition-all duration-500",
            EASE,
            "rotate-90 scale-0 opacity-0",
            "dark:rotate-0 dark:scale-100 dark:opacity-100 dark:group-hover:-rotate-12",
            "motion-reduce:transition-none",
          ].join(" ")}
        />
      </button>

      {/* Sign In */}
      <Link
        href="/login"
        className={[
          "group/signin relative hidden shrink-0 overflow-hidden rounded-xl px-3.5 py-2 text-xs font-semibold text-foreground md:inline-flex",
          "transition-all duration-300 hover:bg-muted active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60",
        ].join(" ")}
      >
        <span className="relative">
          Sign In
          <span
            aria-hidden="true"
            className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-transform duration-300 group-hover/signin:scale-x-100"
          />
        </span>
      </Link>

      {/* CTA */}
      <Link
        href="/register"
        className={[
          "group/cta relative hidden shrink-0 items-center gap-1.5 overflow-hidden rounded-xl sm:inline-flex",
          "px-3.5 py-1.5 text-xs font-bold text-white sm:px-4 sm:py-2",
          "bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-[length:200%_100%] bg-left",
          "shadow-md shadow-indigo-500/25 ring-1 ring-white/10",
          "transition-all duration-500 hover:-translate-y-0.5 hover:bg-right hover:shadow-lg hover:shadow-indigo-500/40",
          "active:translate-y-0 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ].join(" ")}
      >
        {/* Shine sweep */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 -left-full w-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover/cta:translate-x-[250%]"
        />
        <Sparkles className="relative size-3.5 shrink-0 transition-transform duration-500 group-hover/cta:rotate-[20deg] group-hover/cta:scale-125" />
        <span className="relative">Start Free Trial</span>
      </Link>

      {/* Mobile menu button */}
      <button
        type="button"
        onClick={onToggleMobile}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileOpen}
        className={[
          "relative flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl lg:hidden",
          "text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground active:scale-90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60",
          mobileOpen ? "bg-muted text-foreground" : "",
        ].join(" ")}
      >
        <Menu
          className={[
            "absolute size-5 transition-all duration-300",
            EASE,
            mobileOpen
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100",
            "motion-reduce:transition-none",
          ].join(" ")}
        />
        <X
          className={[
            "absolute size-5 transition-all duration-300",
            EASE,
            mobileOpen
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0",
            "motion-reduce:transition-none",
          ].join(" ")}
        />
      </button>
    </div>
  );
}