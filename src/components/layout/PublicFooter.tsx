import React from "react";
import Link from "next/link";
import { Store } from "lucide-react";

/* -------------------------------- Types -------------------------------- */

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
  path: React.ReactNode;
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

// TODO: nijer social link boshan
const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Twitter",
    href: "#",
    path: (
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    path: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: "Instagram",
    href: "#",
    path: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    path: (
      <>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </>
    ),
  },
];

/* ------------------------------ Component ------------------------------ */

export function PublicFooter(): React.JSX.Element {
  return (
    <footer className="border-t border-border bg-card text-sm text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="XYZ Business OS home"
              className="flex w-fit items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Store className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="text-[15px] font-bold tracking-tight text-foreground">
                XYZ Business OS
              </span>
            </Link>

            <p className="mt-5 max-w-xs leading-relaxed">
              Unified business operating system engineered for modern retail
              stores, super shops, and multi-branch commercial enterprises.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, path }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className={[
                    "flex size-9 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground",
                    "transition-colors duration-200 hover:bg-muted hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
                  ].join(" ")}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                  >
                    {path}
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 text-sm font-semibold text-foreground">
                {col.title}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="rounded-sm transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} XYZ Business OS Ltd. All rights
            reserved.
          </p>

          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}