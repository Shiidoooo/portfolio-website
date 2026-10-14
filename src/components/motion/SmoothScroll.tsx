"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

const SCROLL_LERP = 0.1;

// Smooth scrolling for the whole page. Children can reach the instance with `useLenis()`.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: true,
        lerp: SCROLL_LERP,
        smoothWheel: !shouldReduceMotion,
      }}
    >
      {children}
    </ReactLenis>
  );
}
