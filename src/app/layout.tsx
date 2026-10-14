import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { AppProviders } from "@/components/layout/AppProviders";
import { BackgroundFX } from "@/components/layout/BackgroundFX";
import { Nav } from "@/components/layout/Nav";
import { DevModeLayer } from "@/features/dev-mode/DevModeLayer";
import { THEME_INIT_SCRIPT } from "@/features/theme/theme";
import { profile } from "@/content/profile";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: profile.intro,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      // The inline script below swaps data-theme before hydration.
      suppressHydrationWarning
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-(--z-skip-link) focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <AppProviders>
          <BackgroundFX />
          <Nav />
          {children}
          <DevModeLayer />
        </AppProviders>
        <div aria-hidden="true" className="grain" />
      </body>
    </html>
  );
}
