import { CONTACT_INTRO, CONTACT_ITEMS } from "./contact-data";


import { BookDemoCard } from "./BookDemoCard";
import { SocialLinks } from "./SocialLinks";
import { ContactInfoCard } from "./ContactInfoCard";

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {CONTACT_INTRO.title}
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {CONTACT_INTRO.text}
        </p>
      </div>

      <div className="space-y-3">
        {CONTACT_ITEMS.map((item) => (
          <ContactInfoCard key={item.label} {...item} />
        ))}
      </div>

      <SocialLinks/>
      <BookDemoCard />
    </div>
  );
}