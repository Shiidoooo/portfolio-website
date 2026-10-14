"use client";

import { useInView, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// WebGL only exists in the browser, and loading it separately keeps three.js out of the first bundle.
const GourdCanvas = dynamic(() => import("./GourdCanvas"), { ssr: false });

const SCAN_LABELS = ["scanning…", "gourd flower found", "♀ female", "scanning…", "gourd leaf found", "species: bottle gourd"];
const SCAN_INTERVAL_MS = 1400;

function ScanCorner({ className }: { className: string }) {
  return <span aria-hidden="true" className={cn("absolute size-5 border-accent", className)} />;
}

// Hero tile: a particle gourd with a mock GourdVision "scan" HUD over it.
export function GourdScanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isBurstingRef = useRef(false);
  const isInView = useInView(containerRef);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [labelIndex, setLabelIndex] = useState(0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;
    const intervalId = window.setInterval(
      () => setLabelIndex((index) => (index + 1) % SCAN_LABELS.length),
      SCAN_INTERVAL_MS,
    );
    return () => window.clearInterval(intervalId);
  }, [isInView, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="relative h-full min-h-80"
      onPointerEnter={() => (isBurstingRef.current = true)}
      onPointerLeave={() => (isBurstingRef.current = false)}
    >
      <div aria-hidden="true" className="absolute inset-0">
        <GourdCanvas isActive={isInView} isReducedMotion={shouldReduceMotion} isBurstingRef={isBurstingRef} />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-12 bottom-14">
        <ScanCorner className="top-0 left-0 border-t-2 border-l-2" />
        <ScanCorner className="top-0 right-0 border-t-2 border-r-2" />
        <ScanCorner className="bottom-0 left-0 border-b-2 border-l-2" />
        <ScanCorner className="right-0 bottom-0 border-r-2 border-b-2" />
      </div>

      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between font-mono text-[11px] text-muted">
        <span>gourdvision.scan()</span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-[#ff5f57]" />
          live
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 font-mono text-[11px]">
        <span className="rounded-md border border-accent/30 bg-ink/70 px-2 py-1 whitespace-nowrap text-accent backdrop-blur-sm">
          {SCAN_LABELS[labelIndex]}
        </span>
        <span className="whitespace-nowrap text-muted">
          <span className="pointer-coarse:hidden">hover me</span>
          <span className="hidden pointer-coarse:inline">tap me</span>
        </span>
      </div>
    </div>
  );
}
