"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  User,
  Building2,
  Phone,
  MapPin,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const CITIES = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Other"];

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
        <Icon className="h-3.5 w-3.5 text-indigo-600" />
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClasses =
  "w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground text-xs " +
  "placeholder:text-muted-foreground/70 transition-shadow duration-150 " +
  "focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-3xl border border-border bg-card shadow-sm text-center py-14 space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="mx-auto h-14 w-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground">Message received</h3>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
            Thank you. One of our enterprise business advisors will contact you within 2 hours.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-8 pt-7 pb-5 border-b border-border">
        <h3 className="text-base font-bold text-foreground">Talk to an advisor</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Tell us about your business and we&apos;ll tailor a walkthrough for your team.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-4">
        <Field label="Your Name" icon={User}>
          <input
            type="text"
            required
            placeholder="e.g. Md. Ashraful Alam"
            className={inputClasses}
          />
        </Field>

        <Field label="Business Name" icon={Building2}>
          <input
            type="text"
            required
            placeholder="e.g. Alam Superstore"
            className={inputClasses}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Phone Number" icon={Phone}>
            <input
              type="text"
              required
              placeholder="01711-xxxxxx"
              className={inputClasses}
            />
          </Field>
          <Field label="City" icon={MapPin}>
            <select className={`${inputClasses} appearance-none`}>
              {CITIES.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="How can we help?" icon={MessageSquare}>
          <textarea
            rows={3}
            placeholder="Tell us about your branches and current challenges..."
            className="w-full p-3 rounded-lg border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground/70 transition-shadow duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 resize-none"
          />
        </Field>

        <Button type="submit" variant="primary" className="w-full h-11 gap-2">
          <Send className="h-4 w-4" /> Submit Inquiry
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
          <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
          Your details stay private and are never shared with third parties.
        </p>
      </form>
    </div>
  );
}