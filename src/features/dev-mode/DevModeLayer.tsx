"use client";

import { AnimatePresence } from "motion/react";
import { useDevMode } from "./DevModeProvider";
import { GlitchOverlay } from "./GlitchOverlay";
import { Terminal } from "./Terminal";

export function DevModeLayer() {
  const { phase } = useDevMode();

  return (
    <>
      {phase === "entering" && <GlitchOverlay />}
      <AnimatePresence>{phase === "on" && <Terminal key="terminal" />}</AnimatePresence>
    </>
  );
}
