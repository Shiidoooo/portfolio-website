"use client";

import type { PointerEvent } from "react";
import { cn } from "@/lib/cn";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
};

// A card whose glow and border light follow the pointer (styles in globals.css).
export function SpotlightCard({ children, className, as: Element = "div" }: SpotlightCardProps) {
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <Element
      onPointerMove={handlePointerMove}
      className={cn(
        "spotlight-card relative overflow-hidden rounded-card border border-line bg-surface/80 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </Element>
  );
}
