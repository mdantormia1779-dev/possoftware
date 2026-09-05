import React from "react";
import Link from "next/link";
import { PUBLIC_NAV_LINKS } from "./PublicNavLinks";

interface PublicMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PublicMobileMenu({ isOpen, onClose }: PublicMobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-b border-border bg-card p-4 space-y-3 animate-in slide-in-from-top-2">
      <nav className="flex flex-col space-y-2">
        {PUBLIC_NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-sm font-medium py-2 px-3 rounded-lg hover:bg-muted"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="pt-3 border-t border-border flex flex-col gap-2">
        <Link
          href="/login"
          onClick={onClose}
          className="text-center py-2 text-xs font-semibold rounded-lg border border-border"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          onClick={onClose}
          className="text-center py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white"
        >
          Start Free Trial
        </Link>
      </div>
    </div>
  );
}
