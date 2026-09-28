import React from "react";
import { MapPin, Phone, Mail, Clock, Wrench } from "lucide-react";

const CONTACT_ROWS = [
  {
    icon: MapPin,
    text: "Level 8, Concord Tower, Gulshan Avenue, Gulshan 1, Dhaka-1212",
  },
  {
    icon: Phone,
    text: "+880 1711-001122 (Direct Support / WhatsApp)",
  },
  {
    icon: Mail,
    text: "support@xyzbusiness.os",
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h3 className="text-lg font-bold text-foreground">Dhaka Headquarters</h3>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Open now
          </span>
        </div>

        <div className="px-6 pb-6 space-y-3.5 text-xs text-muted-foreground">
          {CONTACT_ROWS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3">
              <span className="mt-0.5 h-7 w-7 shrink-0 rounded-lg bg-indigo-600/10 flex items-center justify-center">
                <Icon className="h-3.5 w-3.5 text-indigo-600" />
              </span>
              <span className="leading-relaxed pt-1">{text}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 px-6 py-4 border-t border-border bg-background/50">
          <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-xs text-muted-foreground">
            Sat &ndash; Thu, 9:00 AM &ndash; 7:00 PM (closed Fridays)
          </span>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="h-8 w-8 rounded-lg bg-indigo-600/15 flex items-center justify-center shrink-0">
            <Wrench className="h-4 w-4 text-indigo-600" />
          </span>
          <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300">
            Need on-site hardware setup?
          </h4>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Our technical field engineers can help configure your barcode scanners, POS receipt
          printers, and cash drawers anywhere in Dhaka, Chittagong, and Sylhet.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {["Dhaka", "Chittagong", "Sylhet"].map((city) => (
            <span
              key={city}
              className="text-[11px] font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-600/10 px-2.5 py-1 rounded-full"
            >
              {city}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}