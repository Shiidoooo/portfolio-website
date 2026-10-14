"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect } from "react";
import { applyTheme, resolveTheme, saveTheme } from "./theme";

// The icons swap via CSS (the `light:` variant), so the server markup never depends on the theme.
export function ThemeToggle() {
  // In development React's Strict Mode remount clears the attribute the inline script set;
  // re-apply it before paint. A no-op in production.
  useLayoutEffect(() => {
    applyTheme(resolveTheme());
  }, []);

  function handleClick() {
    const nextTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Switch between light and dark mode"
      title="Light / dark mode"
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-raised hover:text-paper"
    >
      <Sun aria-hidden="true" className="size-5 light:hidden" />
      <Moon aria-hidden="true" className="hidden size-5 light:block" />
    </button>
  );
}
