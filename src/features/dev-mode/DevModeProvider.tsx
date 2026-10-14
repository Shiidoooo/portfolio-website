"use client";

import { useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

// off → entering (page glitches out) → on (terminal) → off (terminal powers down)
export type DevModePhase = "off" | "entering" | "on";

type DevModeState = {
  phase: DevModePhase;
  isDevMode: boolean;
  enterDevMode: () => void;
  exitDevMode: () => void;
  toggleDevMode: () => void;
};

const GLITCH_DURATION_MS = 750;
// Elements hidden from keyboard and screen readers while the terminal is open.
const PAGE_REGION_SELECTORS = ["#content", "#site-header"];

const DevModeContext = createContext<DevModeState | null>(null);

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA")
  );
}

export function DevModeProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<DevModePhase>("off");
  const shouldReduceMotion = useReducedMotion();
  const lenis = useLenis();
  const glitchTimerRef = useRef<number | null>(null);
  const focusBeforeOpenRef = useRef<HTMLElement | null>(null);

  const enterDevMode = useCallback(() => {
    if (phase !== "off") return;
    focusBeforeOpenRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (shouldReduceMotion) {
      setPhase("on");
      return;
    }
    setPhase("entering");
    glitchTimerRef.current = window.setTimeout(() => setPhase("on"), GLITCH_DURATION_MS);
  }, [phase, shouldReduceMotion]);

  const exitDevMode = useCallback(() => {
    if (glitchTimerRef.current !== null) window.clearTimeout(glitchTimerRef.current);
    setPhase("off");
  }, []);

  const toggleDevMode = useCallback(() => {
    if (phase === "off") enterDevMode();
    else exitDevMode();
  }, [phase, enterDevMode, exitDevMode]);

  // Glitch styling, scroll lock and inert page while Dev Mode is active.
  useEffect(() => {
    const root = document.documentElement;
    const pageRegions = PAGE_REGION_SELECTORS.map((selector) => document.querySelector(selector));

    if (phase === "entering") root.setAttribute("data-glitching", "");
    else root.removeAttribute("data-glitching");

    if (phase === "off") {
      lenis?.start();
      pageRegions.forEach((region) => region?.removeAttribute("inert"));
      focusBeforeOpenRef.current?.focus({ preventScroll: true });
      focusBeforeOpenRef.current = null;
    } else {
      lenis?.stop();
      pageRegions.forEach((region) => region?.setAttribute("inert", ""));
    }
  }, [phase, lenis]);

  // The ` / ~ key toggles Dev Mode from anywhere on the page.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "`" && event.key !== "~") return;
      if (isTypingTarget(event.target) || event.metaKey || event.ctrlKey || event.altKey) return;
      event.preventDefault();
      toggleDevMode();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleDevMode]);

  useEffect(
    () => () => {
      if (glitchTimerRef.current !== null) window.clearTimeout(glitchTimerRef.current);
    },
    [],
  );

  const value = useMemo(
    () => ({ phase, isDevMode: phase !== "off", enterDevMode, exitDevMode, toggleDevMode }),
    [phase, enterDevMode, exitDevMode, toggleDevMode],
  );

  return <DevModeContext.Provider value={value}>{children}</DevModeContext.Provider>;
}

export function useDevMode() {
  const context = useContext(DevModeContext);
  if (!context) throw new Error("useDevMode must be used inside <DevModeProvider>");
  return context;
}
