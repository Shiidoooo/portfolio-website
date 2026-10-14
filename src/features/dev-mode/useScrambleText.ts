"use client";

import { useEffect, useState } from "react";

const SCRAMBLE_CHARACTERS = "!<>-_\\/[]{}—=+*^?#01";

// Reveals `target` left to right, with unresolved characters flickering as random symbols.
export function useScrambleText(target: string, durationMs: number) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    let frameId = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / durationMs);
      const resolvedCount = Math.floor(progress * target.length);
      const scrambled = Array.from(target, (character, index) => {
        if (index < resolvedCount || character === " ") return character;
        return SCRAMBLE_CHARACTERS[Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)];
      }).join("");

      setDisplay(scrambled);
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, durationMs]);

  return display;
}
