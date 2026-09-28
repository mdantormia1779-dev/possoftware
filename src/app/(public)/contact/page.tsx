import React from "react";
import { ContactInfo } from "@/components/public/contact/ContactInfo";
import { ContactForm } from "@/components/public/contact/ContactForm";
import { Clock, Headset, MessageCircleMore } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Clock,
    title: "Reply within 2 hours",
    text: "Business hours, every working day.",
  },
  {
    icon: Headset,
    title: "Bangla & English support",
    text: "Talk to us in whichever you're comfortable with.",
  },
  {
    icon: MessageCircleMore,
    title: "Free onboarding call",
    text: "No obligation, just a walkthrough.",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-600/10 px-3 py-1 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
          Dhaka support team online
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Let&rsquo;s talk about growing your business
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Need a personalized demo, custom hardware integration, or multi-branch migration
          support? Reach out to our Dhaka support team.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex items-start gap-3 p-4 rounded-2xl border border-border bg-card"
          >
            <span className="h-8 w-8 shrink-0 rounded-lg bg-indigo-600/10 flex items-center justify-center">
              <Icon className="h-4 w-4 text-indigo-600" />
            </span>
            <div>
              <p className="text-xs font-bold text-foreground">{title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}