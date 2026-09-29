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
      <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 sm:aspect-[2.7/1] dark:border-slate-800">
        <BlogCover
          src={src ?? ""}
          alt={alt}
          category={category}
          className="h-full w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}