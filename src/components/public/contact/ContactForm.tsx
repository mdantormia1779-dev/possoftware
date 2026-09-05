"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-3xl border border-border bg-card shadow-sm text-center py-12 space-y-3">
        <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
        <h3 className="text-lg font-bold text-foreground">Message Received!</h3>
        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
          Thank you. One of our enterprise business advisors will contact you within 2 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-3xl border border-border bg-card shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Your Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Md. Ashraful Alam"
            className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Business Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Alam Superstore"
            className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Phone Number</label>
            <input
              type="text"
              required
              placeholder="01711-xxxxxx"
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">City</label>
            <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Dhaka</option>
              <option>Chittagong</option>
              <option>Sylhet</option>
              <option>Rajshahi</option>
              <option>Khulna</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">How can we help?</label>
          <textarea
            rows={3}
            placeholder="Tell us about your branches and current challenges..."
            className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full">
          <Send className="h-4 w-4 mr-2" /> Submit Inquiry
        </Button>
      </form>
    </div>
  );
}
