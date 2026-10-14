"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useDevMode } from "./DevModeProvider";

export function DevModeToggle({ className }: { className?: string }) {
  const { isDevMode, toggleDevMode } = useDevMode();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDevMode}
      onClick={toggleDevMode}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2.5 rounded-full py-1 pr-1 pl-3.5 font-mono text-xs text-muted transition-colors hover:text-paper",
        className,
      )}
    >
      <span>Dev mode</span>
      <kbd className="hidden rounded border border-line-strong px-1.5 text-[10px] text-muted lg:inline">~</kbd>
      <span
        aria-hidden="true"
        className={cn(
          "flex h-6 w-10 items-center rounded-full border p-0.5 transition-colors",
          isDevMode ? "justify-end border-accent bg-accent/20" : "justify-start border-line-strong bg-surface-raised",
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 600, damping: 32 }}
          className={cn("size-4.5 rounded-full", isDevMode ? "bg-accent" : "bg-muted group-hover:bg-paper")}
        />
      </span>
    </button>
  );
}
