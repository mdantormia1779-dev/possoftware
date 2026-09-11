"use client";

import React, { useState } from "react";
import { PublicHeaderBrand } from "./public/PublicHeaderBrand";
import { PublicHeaderNav } from "./public/PublicHeaderNav";
import { PublicHeaderActions } from "./public/PublicHeaderActions";
import { PublicMobileMenu } from "./public/PublicMobileMenu";

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        <PublicHeaderBrand />
        <PublicHeaderNav />
        <PublicHeaderActions
          mobileOpen={mobileOpen}
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
        />
      </div>

      <PublicMobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
