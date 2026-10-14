"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { about, education, journey, type Commit } from "@/content/profile";
import { cn } from "@/lib/cn";
import { toCommitHash } from "@/lib/commitHash";

const TAG_CLASS: Record<Commit["tag"], string> = {
  work: "border-accent/30 bg-accent-soft text-accent",
  school: "border-teal/30 bg-teal/10 text-teal",
  "side-project": "border-[#b392f0]/30 bg-[#b392f0]/10 text-[#c8b2f5]",
  learning: "border-[#e5c07b]/30 bg-[#e5c07b]/10 text-[#e5c07b]",
};

export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="page-gutter py-20 md:py-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading kicker="about" titleId="journey-title">
            Started from zero. <span className="font-serif font-normal text-accent italic">Still learning.</span>
          </SectionHeading>
          <Reveal className="flex flex-col gap-5 leading-relaxed text-paper/75">
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal className="flex flex-col gap-4 border-t border-line pt-6">
            <p className="font-mono text-xs text-muted">education</p>
            <ol className="flex flex-col gap-4">
              {education.map((entry) => (
                <li key={entry.school} className="flex flex-col gap-0.5">
                  <p className="font-mono text-xs text-accent/80">{entry.period}</p>
                  <p className="font-display text-lg font-medium">{entry.level}</p>
                  <p className="text-sm text-paper/70">{entry.school}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <SpotlightCard className="font-mono">
            <div className="flex items-center gap-3 border-b border-line px-5 py-3 text-xs text-muted">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="size-2.5 rounded-full bg-[#28c840]/80" />
              </span>
              ~/josh <span className="text-paper/60">$ git log --graph</span>
            </div>

            <ol className="relative px-5 py-6 md:px-7">
              <span aria-hidden="true" className="absolute top-8 bottom-8 left-[27px] w-px bg-linear-to-b from-accent via-teal/50 to-line md:left-[35px]" />
              {journey.map((commit, index) => {
                const isHead = index === 0;
                return (
                  <motion.li
                    key={`${commit.date}-${commit.message}`}
                    className="relative flex gap-4 pb-7 last:pb-0"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative z-10 mt-1 size-3.5 shrink-0 rounded-full border-2",
                        isHead ? "border-accent bg-accent shadow-[0_0_14px_rgb(194_236_92/0.8)]" : "border-teal/70 bg-ink",
                      )}
                    />
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                        <span className="text-[#e5c07b]">{toCommitHash(commit.message)}</span>
                        {isHead && <span className="text-teal">(HEAD -&gt; main)</span>}
                        <span className={cn("rounded-full border px-2 py-0.5 text-[10px]", TAG_CLASS[commit.tag])}>
                          {commit.tag}
                        </span>
                        <span className="text-muted">{commit.date}</span>
                      </p>
                      <p className="font-sans text-[15px] leading-snug text-paper md:text-base">{commit.message}</p>
                      {commit.details.length > 0 && (
                        <ul className="mt-1 flex flex-col gap-1.5 font-sans text-sm leading-relaxed text-paper/60">
                          {commit.details.map((detail) => (
                            <li key={detail} className="flex gap-2">
                              <span aria-hidden="true" className="text-accent/60">
                                +
                              </span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
