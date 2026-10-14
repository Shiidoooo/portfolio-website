"use client";

import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCopyToClipboard, type CopyStatus } from "@/hooks/useCopyToClipboard";

const STATUS_LABEL: Record<CopyStatus, string> = {
  idle: "Copy email",
  copied: "Copied!",
  failed: "Couldn't copy, select it instead",
};

export function CopyEmailButton({ email }: { email: string }) {
  const { status, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(email)}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong bg-surface-raised/60 px-5 text-sm font-medium transition-colors hover:border-paper/40"
    >
      {status === "copied" ? (
        <Check aria-hidden="true" className="size-4 text-accent" />
      ) : (
        <Copy aria-hidden="true" className="size-4" />
      )}
      <span aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={status}
            className="inline-block"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            {STATUS_LABEL[status]}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
