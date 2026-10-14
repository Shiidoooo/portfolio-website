import { Bot, BrainCircuit, Sparkles, Workflow, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SWIPE_ITEM_CLASS, SwipeList } from "@/components/ui/SwipeList";
import { aiIntro, aiPillars } from "@/content/profile";

const PILLAR_ICONS: LucideIcon[] = [Bot, Workflow, Sparkles, BrainCircuit];

export function AiSection() {
  return (
    <section id="ai" aria-labelledby="ai-title" className="page-gutter py-14 md:py-20">
      <div className="flex flex-col gap-8 md:gap-10">
        <SectionHeading kicker="ai" titleId="ai-title" description={aiIntro}>
          Building with <span className="font-serif font-normal text-accent italic">AI</span>
        </SectionHeading>

        <SwipeList label="How I use AI" className="md:grid-cols-2 xl:grid-cols-4">
          {aiPillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index % PILLAR_ICONS.length];
            return (
              <li key={pillar.title} className={SWIPE_ITEM_CLASS}>
                <Reveal className="h-full" delay={index * 0.08}>
                  <SpotlightCard className="flex h-full flex-col gap-4 p-6">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-accent/25 bg-accent-soft text-accent">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="font-display text-xl font-semibold">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed text-paper/70 md:text-[15px]">{pillar.description}</p>
                    <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label={`${pillar.title} tools`}>
                      {pillar.tools.map((tool) => (
                        <li
                          key={tool}
                          className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-paper/70"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              </li>
            );
          })}
        </SwipeList>
      </div>
    </section>
  );
}
