"use client";

import { Briefcase, ChevronDown, GraduationCap, MapPin, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { about, education, experience } from "@/content/profile";
import { cn } from "@/lib/cn";

function EntryIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface-raised text-accent">
      <Icon aria-hidden="true" className="size-5" />
    </span>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-xl font-semibold">{children}</h3>;
}

// Experience laid out like a LinkedIn profile: company first, then each role with a timeline.
function ExperienceCard() {
  return (
    <SpotlightCard className="flex flex-col gap-6 p-6 md:p-7">
      <CardTitle>Experience</CardTitle>
      {experience.map((employer) => (
        <div key={employer.company} className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <EntryIcon icon={Briefcase} />
            <div className="flex flex-col gap-0.5">
              <p className="font-display text-lg leading-tight font-semibold">{employer.company}</p>
              <p className="inline-flex items-center gap-1.5 text-sm text-muted">
                <MapPin aria-hidden="true" className="size-3.5" />
                {employer.location}
              </p>
            </div>
          </div>

          <ol className="flex flex-col">
            {employer.roles.map((role, index) => {
              const isCurrent = index === 0;
              const isLast = index === employer.roles.length - 1;
              return (
                <li key={role.title} className="relative flex gap-4 pb-6 last:pb-0">
                  {/* Timeline column, centred under the company icon like LinkedIn's. */}
                  <span aria-hidden="true" className="relative flex w-12 shrink-0 justify-center">
                    <span
                      className={cn(
                        "relative z-10 mt-1.5 size-3 rounded-full border-2",
                        isCurrent ? "border-accent bg-accent" : "border-line-strong bg-surface",
                      )}
                    />
                    {!isLast && <span className="absolute top-5 -bottom-1 w-px bg-line-strong" />}
                  </span>
                  <div className="flex min-w-0 flex-col gap-1">
                    <h4 className="font-semibold text-paper">{role.title}</h4>
                    <p className="text-sm text-muted">
                      {role.employmentType} · {role.period}
                    </p>
                    <ul className="mt-1.5 flex flex-col gap-1.5 text-sm leading-relaxed text-paper/75 md:text-[15px]">
                      {role.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2">
                          <span aria-hidden="true" className="text-accent">
                            •
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </SpotlightCard>
  );
}

function EducationCard() {
  return (
    <SpotlightCard className="flex flex-col gap-5 p-6 md:p-7">
      <CardTitle>Education</CardTitle>
      <ol className="flex flex-col gap-5">
        {education.map((entry) => (
          <li key={entry.school} className="flex gap-4">
            <EntryIcon icon={GraduationCap} />
            <div className="flex flex-col gap-0.5">
              <p className="font-semibold leading-snug text-paper">{entry.school}</p>
              <p className="text-sm text-paper/75">{entry.level}</p>
              <p className="text-sm text-muted">{entry.period}</p>
            </div>
          </li>
        ))}
      </ol>
    </SpotlightCard>
  );
}

export function About() {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  return (
    <section id="about" aria-labelledby="about-title" className="page-gutter py-14 md:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading kicker="about" titleId="about-title">
            Started from zero. <span className="font-serif font-normal text-accent italic">Still learning.</span>
          </SectionHeading>
          <Reveal className="flex max-w-2xl flex-col gap-5 leading-relaxed text-paper/75">
            {about.map((paragraph, index) => (
              <p key={paragraph} className={cn(index > 0 && !isAboutExpanded && "hidden lg:block")}>
                {paragraph}
              </p>
            ))}
            {/* Below lg the story collapses to its first paragraph, to keep the page short. */}
            <button
              type="button"
              aria-expanded={isAboutExpanded}
              onClick={() => setIsAboutExpanded((expanded) => !expanded)}
              className="inline-flex min-h-11 items-center gap-1.5 self-start font-mono text-xs text-accent lg:hidden"
            >
              {isAboutExpanded ? "Show less" : "Read more"}
              <ChevronDown aria-hidden="true" className={cn("size-4 transition-transform", isAboutExpanded && "rotate-180")} />
            </button>
          </Reveal>
        </div>

        <div className="flex flex-col gap-3">
          <Reveal delay={0.1}>
            <ExperienceCard />
          </Reveal>
          <Reveal delay={0.15}>
            <EducationCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
