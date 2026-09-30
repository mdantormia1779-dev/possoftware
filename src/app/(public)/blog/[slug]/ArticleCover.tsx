import { BlogCover } from "@/components/public/blog/ArticleCard";

interface ArticleCoverProps {
  src?: string;
  alt: string;
  category: string;
  caption?: string;
}

export function ArticleCover({ src, alt, category, caption }: ArticleCoverProps) {
  return (
    <figure className="mx-auto max-w-[1200px] px-4 sm:px-8">
      {/* Container with Group, Smooth Elevation & Border Hover */}
      <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50 transition-all duration-500 ease-out hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/60 sm:aspect-[2.7/1] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-none">
        {/* Soft dark/light overlay gradient on hover */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Zoom Animation on Image */}
        <BlogCover
          src={src ?? ""}
          alt={alt}
          category={category}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
        />
      </div>

      {caption && (
        <figcaption className="mt-3.5 text-center text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}