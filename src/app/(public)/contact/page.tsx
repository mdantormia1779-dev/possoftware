import type { Metadata } from "next";
import { ContactHero } from "@/components/public/contact/ContactHero";
import { ContactInfo } from "@/components/public/contact/ContactInfo";
import { ContactForm } from "@/components/public/contact/ContactForm";
import { ContactFaq } from "@/components/public/contact/ContactFaq";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Questions about pricing, features or getting set up? Talk to our team.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="bg-background py-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start lg:px-8">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>

      <ContactFaq />
    </>
  );
}