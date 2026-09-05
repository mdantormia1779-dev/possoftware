import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
        <h3 className="text-lg font-bold text-foreground">Dhaka Headquarters</h3>
        <div className="space-y-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-indigo-600 shrink-0" />
            <span>Level 8, Concord Tower, Gulshan Avenue, Gulshan 1, Dhaka-1212</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-indigo-600 shrink-0" />
            <span>+880 1711-001122 (Direct Support / WhatsApp)</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-indigo-600 shrink-0" />
            <span>support@xyzbusiness.os</span>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 space-y-2">
        <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300">
          Need on-site hardware setup?
        </h4>
        <p className="text-xs text-muted-foreground">
          Our technical field engineers can help configure your barcode scanners, POS receipt printers, and cash drawers anywhere in Dhaka, Chittagong, and Sylhet.
        </p>
      </div>
    </div>
  );
}
