"use client";

import { motion } from "motion/react";
import { useScrambleText } from "./useScrambleText";

const SCRAMBLE_DURATION_MS = 600;

// Shown for the split second between the page "breaking" and the terminal booting.
export function GlitchOverlay() {
  const label = useScrambleText("decompiling portfolio…", SCRAMBLE_DURATION_MS);

  return (
    <motion.div
      aria-hidden="true"
      data-theme="dark"
      className="pointer-events-none fixed inset-0 z-(--z-glitch) flex items-center justify-center"
      initial={{ backgroundColor: "rgba(3,5,3,0)" }}
      animate={{ backgroundColor: ["rgba(3,5,3,0)", "rgba(3,5,3,0.4)", "rgba(3,5,3,1)"] }}
      transition={{ duration: 0.75, times: [0, 0.55, 1], ease: "easeIn" }}
    >
      <div className="glitch-slices absolute inset-0" />
      <p className="rgb-split relative font-mono text-sm tracking-widest text-paper uppercase md:text-lg">{label}</p>
    </motion.div>
  );
}
