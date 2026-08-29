import React from "react";
import Link from "next/link";
import { Sparkles, Shield, Heart } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-card/50 text-muted-foreground text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-base shadow-sm">
                X
              </div>
              <span className="font-extrabold text-base text-foreground">XYZ Business OS</span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed">
              “একটা Login, পুরো Business Control — Online ও Offline, দুই অবস্থায়ই।”
              Modern multi-tenant SaaS ERP crafted specifically for Bangladeshi SMBs, retail stores, super shops, and multi-branch enterprises.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-foreground font-semibold">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              100% Offline-First POS Engine Active
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider mb-3">
              Solutions
            </h4>
            <ul className="space-y-2">
              <li><Link href="/solutions/retail" className="hover:text-foreground">Retail & Departmental</Link></li>
              <li><Link href="/solutions/grocery" className="hover:text-foreground">Grocery & Supermarket</Link></li>
              <li><Link href="/solutions/fashion" className="hover:text-foreground">Fashion & Lifestyle</Link></li>
              <li><Link href="/solutions/electronics" className="hover:text-foreground">Gadget & Electronics</Link></li>
              <li><Link href="/solutions/restaurant" className="hover:text-foreground">Restaurant & Cafe</Link></li>
              <li><Link href="/solutions/pharmacy" className="hover:text-foreground">Pharmacy & Healthcare</Link></li>
            </ul>
          </div>

          {/* Modules */}
          <div>
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider mb-3">
              Modules
            </h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="hover:text-foreground">Offline-First POS</Link></li>
              <li><Link href="/features" className="hover:text-foreground">Multi-Branch Stock</Link></li>
              <li><Link href="/features" className="hover:text-foreground">Auto-Journal Accounting</Link></li>
              <li><Link href="/features" className="hover:text-foreground">HR, Attendance & Payroll</Link></li>
              <li><Link href="/features" className="hover:text-foreground">SMS & WhatsApp CRM</Link></li>
              <li><Link href="/features" className="hover:text-foreground">Thermal Barcode & Label</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider mb-3">
              Company
            </h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground">Pricing & Plans</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Book Demo</Link></li>
              <li><Link href="/login" className="hover:text-foreground">Portal Login</Link></li>
              <li><Link href="/super-admin" className="hover:text-foreground">Platform Admin</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} XYZ Business OS Ltd. All rights reserved. Dhaka, Bangladesh.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for Bangladeshi Entrepreneurs
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
