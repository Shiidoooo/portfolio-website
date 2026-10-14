import { profile } from "@/content/profile";
import { LocalTime } from "./LocalTime";

export function Footer() {
  return (
    <footer className="page-gutter flex flex-col gap-2 border-t border-line py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
      <span>{profile.fullName}</span>
      <span>
        Manila · <LocalTime />
      </span>
      <span>
        Built with Next.js, Motion & Three.js · try <kbd className="rounded border border-line-strong px-1.5 text-accent">~</kbd>
      </span>
    </footer>
  );
}
