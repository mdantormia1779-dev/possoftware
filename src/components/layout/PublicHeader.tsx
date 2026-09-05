"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { PUBLIC_NAV_LINKS } from "./public/PublicNavLinks";
import { PublicMobileMenu } from "./public/PublicMobileMenu";

export function PublicHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    const currentTheme = resolvedTheme || theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-500/20">
            X
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-foreground flex items-center gap-1.5">
              XYZ Business OS
            </span>
            <span className="text-[10px] text-muted-foreground block -mt-1 font-medium">
              Offline-First SaaS Platform
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {PUBLIC_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                pathname === link.href ? "text-indigo-600 dark:text-indigo-400 font-semibold" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute top-2 left-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
          <Link
            href="/login"
            className="px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted rounded-xl transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25 transition-transform active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Start Free Trial</span>
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors relative"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute top-2 left-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            className="p-2 rounded-xl text-muted-foreground hover:bg-muted"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <PublicMobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
