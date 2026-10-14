"use client";

import { MotionConfig } from "motion/react";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { DevModeProvider } from "@/features/dev-mode/DevModeProvider";

// reducedMotion="user": Motion skips transform animations for visitors who ask for less motion.
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <MotionConfig reducedMotion="user">
        <DevModeProvider>{children}</DevModeProvider>
      </MotionConfig>
    </SmoothScroll>
  );
}
