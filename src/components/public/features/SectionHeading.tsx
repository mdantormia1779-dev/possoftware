interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  size?: "md" | "lg";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  size = "md",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-3 font-extrabold tracking-tight text-foreground ${
          size === "lg" ? "text-4xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}