"use client";

import { ArrowDown, Briefcase, FileText, MapPin } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { LocalTime } from "@/components/layout/LocalTime";
import { GourdScanner } from "@/components/scene/GourdScanner";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmailMenu } from "@/components/ui/EmailMenu";
import { Marquee } from "@/components/ui/Marquee";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useDevMode } from "@/features/dev-mode/DevModeProvider";
import { freelance, portrait, profile, skillGroups, socialLinks } from "@/content/profile";

const ALL_SKILLS = skillGroups.flatMap((group) => group.items);
const SKILLS_HALF = Math.ceil(ALL_SKILLS.length / 2);

// Tiles enter one after another.
function tileMotion(index: number) {
  return {
    initial: { opacity: 0, y: 30, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.8, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  };
}

export function HeroBento() {
  const { enterDevMode } = useDevMode();

  return (
    <section id="top" aria-labelledby="hero-title" className="page-gutter pt-24 pb-20 md:pt-28">
      <div className="grid auto-rows-[minmax(10rem,auto)] grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {/* Intro */}
        <motion.div {...tileMotion(0)} className="md:col-span-2 lg:row-span-2">
          <SpotlightCard className="flex h-full flex-col justify-between gap-10 p-6 md:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-xs text-accent">
                <span aria-hidden="true" className="pulse-dot size-1.5 rounded-full bg-accent" />
                {profile.currentRole} at PhilFirst
              </span>
              {freelance.isOpen && (
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs text-teal transition-colors hover:border-teal/60"
                >
                  <Briefcase aria-hidden="true" className="size-3.5" />
                  {freelance.label}
                </a>
              )}
              <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                <MapPin aria-hidden="true" className="size-3.5" />
                {profile.location}
              </span>
            </div>

            <div className="flex flex-col gap-5">
              <h1
                id="hero-title"
                className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] font-semibold tracking-tight"
              >
                Hi, I&apos;m Josh.
                <span className="mt-1 block bg-linear-to-r from-accent via-[#9be59a] to-teal bg-clip-text pb-1 font-serif text-[0.62em] leading-tight font-normal tracking-normal text-transparent italic">
                  Full-stack developer.
                </span>
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-paper/70 md:text-lg">{profile.intro}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="grid gap-3 sm:flex">
                <ButtonLink href="#work" variant="primary">
                  See my work
                  <ArrowDown aria-hidden="true" className="size-4" />
                </ButtonLink>
                <EmailMenu email={profile.email} subject={profile.emailSubject} label="Email me" variant="secondary" />
              </div>
              <div className="flex gap-1">
                <a
                  href={socialLinks.github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-raised hover:text-paper"
                >
                  <GitHubIcon className="size-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href={socialLinks.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-raised hover:text-paper"
                >
                  <LinkedInIcon className="size-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href={socialLinks.resume.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-raised hover:text-paper"
                >
                  <FileText aria-hidden="true" className="size-5" />
                  <span className="sr-only">Resume (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* 3D gourd */}
        <motion.div {...tileMotion(1)} className="lg:row-span-2">
          <SpotlightCard className="h-full bg-[radial-gradient(ellipse_at_center,rgb(58_214_181/0.12),transparent_70%)]">
            <GourdScanner />
          </SpotlightCard>
        </motion.div>

        {/* Portrait + right now */}
        <motion.div {...tileMotion(2)} className="lg:row-span-2">
          <SpotlightCard className="group relative h-full min-h-[26rem] md:min-h-80">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              priority
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-[65%_12%] brightness-90 grayscale-[30%] transition duration-700 group-hover:scale-[1.03] group-hover:brightness-100 group-hover:grayscale-0"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink via-ink/30 via-25% to-transparent to-50%" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
              <p className="font-mono text-[11px] text-accent">{"// right now"}</p>
              <p className="font-display text-lg leading-tight font-semibold">{profile.currentRole}</p>
              <p className="text-sm text-paper/75">{profile.currentCompany}</p>
              <p className="font-mono text-[11px] text-muted">
                Manila · <LocalTime />
              </p>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Toolbox */}
        <motion.div {...tileMotion(3)} className="md:col-span-2 lg:col-span-3">
          <SpotlightCard className="flex h-full flex-col justify-center gap-3 py-6">
            <p className="px-6 font-mono text-xs text-muted">{"// what I work with"}</p>
            <Marquee items={ALL_SKILLS.slice(0, SKILLS_HALF)} durationSeconds={38} />
            <Marquee items={ALL_SKILLS.slice(SKILLS_HALF)} durationSeconds={42} isReversed />
          </SpotlightCard>
        </motion.div>

        {/* Dev Mode teaser */}
        <motion.div {...tileMotion(4)} className="md:col-span-2 lg:col-span-1">
          <button
            type="button"
            onClick={enterDevMode}
            className="group relative flex h-full w-full flex-col justify-between gap-4 overflow-hidden rounded-card border border-accent/30 bg-terminal p-6 text-left font-mono transition-colors hover:border-accent"
          >
            <span className="text-xs text-muted">{"// psst"}</span>
            <span className="text-sm leading-relaxed text-paper/85">
              There&apos;s another side to this site.{" "}
              <span className="pointer-coarse:hidden">
                Press <kbd className="rounded border border-line-strong px-1.5 text-accent">~</kbd> or click here.
              </span>
              <span className="hidden pointer-coarse:inline">Tap here to find it.</span>
            </span>
            <span className="phosphor text-sm">
              $ dev-mode --on
              <span aria-hidden="true" className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
