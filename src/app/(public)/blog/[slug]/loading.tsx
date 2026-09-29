import React from "react";

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted ${className}`} />;
}

export default function BlogDetailsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] space-y-10 px-4 pb-16 pt-28 sm:px-8">
        <div className="mx-auto flex max-w-[680px] flex-col items-center gap-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-4/5" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-64" />
        </div>
         {/* article cover */}
        <Skeleton className="aspect-[16/9] w-full rounded-2xl sm:aspect-[2.7/1]" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-[76px]">
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
          <Skeleton className="hidden h-96 rounded-2xl lg:block" />
        </div>
      </div>
    </div>
  );
}