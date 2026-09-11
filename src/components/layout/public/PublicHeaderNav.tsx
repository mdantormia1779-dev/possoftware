"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_NAV_LINKS } from "./PublicNavLinks";

export function PublicHeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
      {PUBLIC_NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
              isActive
                ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
