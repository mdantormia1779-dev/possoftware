import { SOCIAL_LINKS } from "./contact-data";

export function SocialLinks() {
  return (
    <div>
      <p className="text-sm font-semibold text-foreground">Follow us</p>
      <div className="mt-3 flex gap-2">
        {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-blue-500/50 hover:text-foreground"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  );
}