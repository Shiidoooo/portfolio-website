import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: string[];
  isReversed?: boolean;
  durationSeconds?: number;
  className?: string;
};

// Infinite horizontal scroll. The list is rendered twice so the loop is seamless;
// the copy is hidden from screen readers.
export function Marquee({ items, isReversed = false, durationSeconds = 30, className }: MarqueeProps) {
  const style = { "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties;

  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <div className="marquee-track flex w-max" data-reverse={isReversed || undefined} style={style}>
        {[false, true].map((isCopy) => (
          <ul key={String(isCopy)} aria-hidden={isCopy || undefined} className="flex shrink-0 gap-2 pr-2">
            {items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-surface-raised/70 px-3.5 py-1.5 font-mono text-xs whitespace-nowrap text-paper/80"
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
