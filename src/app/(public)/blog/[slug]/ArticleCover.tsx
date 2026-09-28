import Image from "next/image";

interface ArticleCoverProps {
  src?: string;
  alt: string;
}

export function ArticleCover({ src, alt }: ArticleCoverProps) {
  if (!src) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 mb-6">
      <div className="relative w-full aspect-16/9 rounded-2xl overflow-hidden border border-border/60 shadow-sm">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>
    </div>
  );
}