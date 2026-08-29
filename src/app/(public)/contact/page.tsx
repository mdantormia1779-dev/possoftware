"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Let’s Talk About Growing Your Business
        </h1>
        <p className="text-base text-muted-foreground">
          Need a personalized demo, custom hardware integration, or multi-branch migration support? Reach out to our Dhaka support team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <h3 className="text-lg font-bold text-foreground">Dhaka Headquarters</h3>
            <div className="space-y-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-indigo-600" />
                <span>Level 8, Concord Tower, Gulshan Avenue, Gulshan 1, Dhaka-1212</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-indigo-600" />
                <span>+880 1711-001122 (Direct Support / WhatsApp)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-indigo-600" />
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

        {/* Contact Form */}
        <div className="p-8 rounded-3xl border border-border bg-card shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-foreground">Message Received!</h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                Thank you. One of our enterprise business advisors will contact you within 2 hours.
              </p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
