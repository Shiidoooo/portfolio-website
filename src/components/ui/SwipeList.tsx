import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

// On phones: a horizontal row you swipe through (keeps long card lists from becoming
// an endless scroll). From md up it turns into a normal grid; pass the grid columns via className.
export function SwipeList({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <ul
        aria-label={label}
        className={cn(
          "-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "md:mx-0 md:grid md:snap-none md:overflow-visible md:px-0 md:pb-0",
          className,
        )}
      >
        {children}
      </ul>
      <p aria-hidden="true" className="flex items-center gap-1.5 font-mono text-xs text-muted md:hidden">
        Swipe for more <ArrowRight className="size-3.5" />
      </p>
    </div>
  );
}

// Width and snapping for each item; on md+ the grid takes over.
export const SWIPE_ITEM_CLASS = "w-[85%] shrink-0 snap-start md:w-auto";
