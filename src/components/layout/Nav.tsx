import { DevModeToggle } from "@/features/dev-mode/DevModeToggle";
import { profile } from "@/content/profile";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { label: "About", href: "#journey" },
  { label: "AI", href: "#ai" },
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <header id="site-header" className="fixed inset-x-0 top-3 z-(--z-nav) px-3">
      <nav
        aria-label="Primary"
        className="relative mx-auto flex max-w-3xl items-center justify-between gap-2 rounded-full border border-line bg-ink/70 py-1 pr-1 pl-2 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl"
      >
        <a href="#top" className="inline-flex min-h-11 items-center rounded-full px-3 font-display text-base font-semibold">
          {profile.shortName}
        </a>
        <ul className="hidden items-center gap-1 text-sm text-muted md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-full px-3.5 transition-colors hover:bg-surface-raised hover:text-paper"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <DevModeToggle />
          <MobileMenu links={NAV_LINKS} />
        </div>
      </nav>
    </header>
  );
}
