"use client";

import { Check, ChevronUp, Copy, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/cn";
import { buildEmailComposeOptions } from "@/lib/emailCompose";
import { externalLinkProps } from "@/lib/links";
import { buttonClassName, type ButtonVariant } from "./ButtonLink";

type EmailMenuProps = {
  email: string;
  subject: string;
  label: string;
  variant: ButtonVariant;
  align?: "start" | "center";
};

const ITEM_CLASS =
  "flex min-h-11 w-full items-center justify-between gap-6 rounded-xl px-3.5 text-left text-sm text-paper/90 transition-colors hover:bg-accent-soft hover:text-accent focus-visible:bg-accent-soft";

// "Email me" button that lets visitors choose Gmail, Outlook, their mail app, or copying the address.
// Opens upward because both places it lives sit near the bottom of a clipped card.
export function EmailMenu({ email, subject, label, variant, align = "start" }: EmailMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { status, copy } = useCopyToClipboard();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const options = buildEmailComposeOptions(email, subject);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    containerRef.current?.querySelector<HTMLElement>("[data-email-option]")?.focus();
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
        className={buttonClassName(variant)}
      >
        <Mail aria-hidden="true" className="size-4" />
        {label}
        <ChevronUp aria-hidden="true" className={cn("size-4 transition-transform", !isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute bottom-full z-20 mb-2 w-60 rounded-2xl border border-line-strong bg-surface-raised/95 p-1.5 shadow-[0_20px_50px_-12px_rgb(0_0_0/0.9)] backdrop-blur-xl",
              align === "center" ? "left-1/2 -translate-x-1/2" : "left-0",
            )}
          >
            <p className="px-3.5 pt-2 pb-1.5 font-mono text-[11px] text-muted">write with…</p>
            <ul>
              {options.map((option) => (
                <li key={option.id}>
                  <a
                    data-email-option
                    href={option.href}
                    {...externalLinkProps(option.href)}
                    onClick={() => setIsOpen(false)}
                    className={ITEM_CLASS}
                  >
                    {option.label}
                    <span aria-hidden="true" className="text-muted">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
              <li className="mt-1 border-t border-line pt-1">
                <button type="button" onClick={() => copy(email)} className={ITEM_CLASS}>
                  <span aria-live="polite">
                    {status === "copied" ? "Copied!" : status === "failed" ? "Couldn't copy" : "Copy address"}
                  </span>
                  {status === "copied" ? (
                    <Check aria-hidden="true" className="size-4 text-accent" />
                  ) : (
                    <Copy aria-hidden="true" className="size-4 text-muted" />
                  )}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
