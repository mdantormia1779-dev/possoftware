import React from "react";
import { ContactInfo } from "@/components/public/contact/ContactInfo";
import { ContactForm } from "@/components/public/contact/ContactForm";

export default function ContactPage() {
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
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}
