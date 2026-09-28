"use client";

import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { Heart, ArrowUp } from "lucide-react";

/* -------------------------------- Types -------------------------------- */

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

/* -------------------------------- Data --------------------------------- */

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Solutions",
    links: [
      { label: "Retail & Departmental", href: "/solutions/retail" },
      { label: "Grocery & Supermarket", href: "/solutions/grocery" },
      { label: "Fashion & Lifestyle", href: "/solutions/fashion" },
      { label: "Gadget & Electronics", href: "/solutions/electronics" },
      { label: "Restaurant & Cafe", href: "/solutions/restaurant" },
      { label: "Pharmacy & Healthcare", href: "/solutions/pharmacy" },
    ],
  },
  {
    title: "Modules",
    links: [
      { label: "Offline-First POS", href: "/features" },
      { label: "Multi-Branch Stock", href: "/features" },
      { label: "Auto-Journal Accounting", href: "/features" },
      { label: "HR, Attendance & Payroll", href: "/features" },
      { label: "SMS & WhatsApp CRM", href: "/features" },
      { label: "Thermal Barcode & Label", href: "/features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog & Guides", href: "/blog" },
      { label: "Pricing & Plans", href: "/pricing" },
      { label: "Book Demo", href: "/contact" },
      { label: "Portal Login", href: "/login" },
      { label: "Platform Admin", href: "/super-admin" },
    ],
  },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const STAGGER_MS = 90;

/* -------------------------------- Hooks -------------------------------- */

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // ekbar animate hole ar lagbe na
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ------------------------------ Sub parts ------------------------------ */

interface RevealProps {
  inView: boolean;
  index: number;
  className?: string;
  children: React.ReactNode;
}

function Reveal({ inView, index, className = "", children }: RevealProps) {
  const style: CSSProperties = {
    transitionDelay: inView ? `${index * STAGGER_MS}ms` : "0ms",
  };

  return (
    <div
      style={style}
      className={[
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function FooterNavLink({ label, href }: FooterLink) {
  return (
    <Link
      href={href}
      className={[
        "group/link relative inline-flex items-center gap-1.5 py-0.5",
        "transition-all duration-300 hover:translate-x-1 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 rounded-sm",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="h-px w-0 bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300 group-hover/link:w-3"
      />
      <span>{label}</span>
    </Link>
  );
}

/* ------------------------------ Component ------------------------------ */

export function PublicFooter(): React.JSX.Element {
  const { ref, inView } = useInView<HTMLElement>();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-border bg-card/50 text-xs text-muted-foreground"
    >
      {/* Top gradient line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"
      />

      {/* Background glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-indigo-500/10 blur-3xl motion-safe:animate-pulse"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-cyan-400/10 blur-3xl motion-safe:animate-pulse"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand column */}
          <Reveal inView={inView} index={0} className="col-span-2 space-y-4">
            <div className="group flex w-fit items-center gap-2.5">
              <div
                className={[
                  "relative flex size-9 items-center justify-center overflow-hidden rounded-xl",
                  "bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400",
                  "text-base font-black text-white shadow-md shadow-indigo-500/25 ring-1 ring-white/20",
                  "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "group-hover:-rotate-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-500/40",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-full w-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[250%]"
                />
                <span className="relative">X</span>
              </div>
              <span className="text-base font-extrabold text-foreground transition-colors duration-300 group-hover:text-indigo-500">
                XYZ Business OS
              </span>
            </div>

            <p className="max-w-sm text-xs leading-relaxed">
              Unified business operating system engineered for modern retail stores, super shops, and multi-branch commercial enterprises.
            </p>

            {/* Status pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-emerald-500/40">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              100% Offline-First POS Engine Active
            </div>
          </Reveal>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col, i) => (
            <Reveal key={col.title} inView={inView} index={i + 1}>
              <h4 className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-foreground">
                {col.title}
                <span className="mt-1 block h-[2px] w-6 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
              </h4>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink {...link} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Bottom bar */}
        <Reveal
          inView={inView}
          index={FOOTER_COLUMNS.length + 1}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-[11px] sm:flex-row"
        >
          <div>
            © {new Date().getFullYear()} XYZ Business OS Ltd. All rights reserved. Dhaka, Bangladesh.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-indigo-500 after:to-cyan-400 after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ))}

            <span className="flex items-center gap-1">
              Made with
              <Heart className="h-3 w-3 fill-rose-500 text-rose-500 motion-safe:animate-pulse" />
              for Bangladeshi Entrepreneurs
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className={[
                "group/top flex size-8 items-center justify-center rounded-full border border-border bg-background/60",
                "transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:text-foreground hover:shadow-md hover:shadow-indigo-500/20",
                "active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60",
              ].join(" ")}
            >
              <ArrowUp className="size-3.5 transition-transform duration-300 group-hover/top:-translate-y-0.5" />
            </button>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}