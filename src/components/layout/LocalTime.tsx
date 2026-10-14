"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/content/profile";

const REFRESH_INTERVAL_MS = 15_000;

const timeFormatter = new Intl.DateTimeFormat("en-PH", {
  timeZone: profile.timeZone,
  hour: "numeric",
  minute: "2-digit",
});

function subscribe(onChange: () => void) {
  const intervalId = window.setInterval(onChange, REFRESH_INTERVAL_MS);
  return () => window.clearInterval(intervalId);
}

const getSnapshot = () => timeFormatter.format(Date.now());

// Rendered empty on the server so the static HTML never shows a stale time.
const getServerSnapshot = () => "";

export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <time>{time}</time>;
}
