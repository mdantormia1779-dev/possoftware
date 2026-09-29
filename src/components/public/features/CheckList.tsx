import { Check } from "lucide-react";

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 text-base text-foreground/90">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600/15 text-blue-500">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}