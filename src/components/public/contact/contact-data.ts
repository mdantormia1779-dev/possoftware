import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  BriefcaseBusiness,
  Building2,
  Camera,
  type LucideIcon,
} from "lucide-react";

export interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

export interface SocialLink {
  icon: LucideIcon;
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const HERO = {
  badge: "Contact Us",
  title: "Let's Talk About Your Business",
  subtitle:
    "Questions about pricing, features or getting set up? Our team is here to help you every step of the way.",
};

export const CONTACT_INTRO = {
  title: "Contact information",
  text: "Reach us however you prefer. We reply to every message from a real human, fast.",
};

export const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@posbusinessos.com",
    href: "mailto:hello@posbusinessos.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 018-4420",
    href: "tel:+15550184420",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "240 Market Street, Suite 900, San Francisco, CA",
  },
  {
    icon: Clock,
    label: "Support",
    value: "Mon–Fri, 8am–8pm · 24/7 for Business plan",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: Globe, label: "Twitter", href: "https://twitter.com" },
  { icon: BriefcaseBusiness, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Building2, label: "Facebook", href: "https://facebook.com" },
  { icon: Camera, label: "Instagram", href: "https://instagram.com" },
];

export const DEMO_CARD = {
  title: "Book a live demo",
  text: "See POS Business OS in action with a personalised 30-minute walkthrough tailored to your business.",
  buttonLabel: "Book a Demo",
  href: "/contact?subject=demo",
};

export const FORM_CONFIG = {
  title: "Send us a message",
  text: "Fill in the form and our team will get back to you within one business day.",
  maxMessageLength: 500,
  endpoint: "/api/contact",
  subjects: [
    { value: "demo", label: "Book a demo" },
    { value: "pricing", label: "Pricing & plans" },
    { value: "support", label: "Technical support" },
    { value: "hardware", label: "Hardware integration" },
    { value: "migration", label: "Multi-branch migration" },
    { value: "other", label: "Something else" },
  ],
};

export const FAQ_SECTION = {
  badge: "FAQ",
  title: "Questions Before You Reach Out?",
  subtitle: "A few things people ask us most often. Anything else, just send a message.",
};

export const FAQS: FaqItem[] = [
  {
    question: "Is my business data secure?",
    answer:
      "Yes. All data is encrypted in transit and at rest, and every business is isolated from the others. Daily backups run automatically.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most businesses are up and running the same day. For multi-branch migrations our team will plan the rollout with you.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes. You can start with a free trial, and we are happy to walk you through the product in a live demo first.",
  },
  {
    question: "Can I talk to you in Bangla?",
    answer:
      "Of course. Our support team speaks both Bangla and English, so use whichever you are comfortable with.",
  },
  {
    question: "Does it work with my existing hardware?",
    answer:
      "Most barcode scanners, receipt printers and cash drawers work out of the box. Tell us your model and we will confirm.",
  },
];