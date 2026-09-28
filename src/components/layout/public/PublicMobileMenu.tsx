import React from "react";
import Link from "next/link";
import { PUBLIC_NAV_LINKS } from "./PublicNavLinks";

interface PublicMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function ArrowIcon(): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PublicMobileMenu({
  isOpen,
  onClose,
}: PublicMobileMenuProps): React.JSX.Element {
  const baseDelay = 80;
  const step = 50;

  return (
    <div
      aria-hidden={!isOpen}
      className={[
        "grid lg:hidden",
        "transition-[grid-template-rows,opacity,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "motion-reduce:transition-none",
        isOpen
          ? "visible grid-rows-[1fr] opacity-100"
          : "invisible grid-rows-[0fr] opacity-0",
      ].join(" ")}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="relative space-y-4 border-t border-border/60 bg-card/95 p-4 backdrop-blur-xl">
          {/* Top soft glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
          />

          {/* Nav links */}
          <nav className="flex flex-col gap-1">
            {PUBLIC_NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                style={{
                  transitionDelay: isOpen ? `${baseDelay + i * step}ms` : "0ms",
                }}
                className={[
                  "group relative flex items-center justify-between overflow-hidden rounded-xl px-3 py-2.5",
                  "text-sm font-medium text-foreground",
                  "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-transparent",
                  "active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60",
                  "motion-reduce:transition-none",
                  isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
                ].join(" ")}
              >
                {/* Left accent bar */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-2 left-0 w-[3px] origin-center scale-y-0 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-400 transition-transform duration-300 group-hover:scale-y-100"
                />
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  {link.label}
                </span>
                <ArrowIcon />
              </Link>
            ))}
          </nav>

          {/* Action buttons */}
          <div
            style={{
              transitionDelay: isOpen
                ? `${baseDelay + PUBLIC_NAV_LINKS.length * step}ms`
                : "0ms",
            }}
            className={[
              "flex flex-col gap-2 border-t border-border/60 pt-4 sm:flex-row",
              "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "motion-reduce:transition-none",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            ].join(" ")}
          >
            <Link
              href="/login"
              onClick={onClose}
              className={[
                "flex-1 rounded-xl border border-border px-4 py-2.5 text-center text-xs font-semibold",
                "transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/50 hover:bg-muted hover:shadow-md",
                "active:translate-y-0 active:scale-95",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60",
              ].join(" ")}
            >
              Sign In
            </Link>

            <Link
              href="/register"
              onClick={onClose}
              className={[
                "group/cta relative flex-1 overflow-hidden rounded-xl px-4 py-2.5 text-center text-xs font-bold text-white",
                "bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500",
                "shadow-md shadow-indigo-500/25 ring-1 ring-white/10",
                "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40",
                "active:translate-y-0 active:scale-95",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              ].join(" ")}
            >
              {/* Shine sweep */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-full w-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover/cta:translate-x-[250%]"
              />
              <span className="relative">Start Free Trial</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}