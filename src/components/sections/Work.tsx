"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SWIPE_ITEM_CLASS, SwipeList } from "@/components/ui/SwipeList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, socialLinks, type Project, type ProjectLanguage } from "@/content/profile";
import { cn } from "@/lib/cn";
import { externalLinkProps } from "@/lib/links";
import { ProjectCover } from "./ProjectCover";

// Decorative GitHub-style contribution graph (a fixed pattern, not real activity).
const GRAPH_WEEKS = 52;
const GRAPH_LEVEL_CLASS = ["bg-paper/[0.06]", "bg-accent/20", "bg-accent/40", "bg-accent/65", "bg-accent"];
const GRAPH_CELLS = Array.from({ length: GRAPH_WEEKS * 7 }, (_, index) => {
  const week = Math.floor(index / 7);
  const wave = Math.sin(week / 3.2) + Math.sin(index * 1.7);
  return Math.max(0, Math.min(4, Math.round(wave + 1.6)));
});

function ContributionGraph() {
  return (
    <div aria-hidden="true" className="marquee-mask overflow-hidden">
      <div className="grid w-max grid-flow-col grid-rows-7 gap-1">
        {GRAPH_CELLS.map((level, index) => (
          <span key={index} className={cn("size-3 rounded-[3px]", GRAPH_LEVEL_CLASS[level])} />
        ))}
      </div>
    </div>
  );
}

// From md up, projects past this count wait behind "Show more" (phones swipe through them all).
// With the featured card spanning two columns, 4 projects plus the GitHub card fill two rows.
const INITIAL_PROJECT_COUNT = 4;

// GitHub's language colors.
const LANGUAGE_COLOR: Record<ProjectLanguage, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  PHP: "#8892bf",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard
      as="article"
      className={cn("group flex h-full flex-col", project.isFeatured && "lg:grid lg:grid-cols-2")}
    >
      {project.isFeatured && <span aria-hidden="true" className="border-beam" />}
      <div
        className={cn(
          "h-44 border-b border-line",
          project.isFeatured && "lg:order-2 lg:h-auto lg:min-h-[26rem] lg:border-b-0 lg:border-l",
        )}
      >
        <ProjectCover project={project} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
        <p className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-mono text-xs text-muted">
          <span className={cn("whitespace-nowrap", project.isFeatured && "text-accent")}>
            {project.isFeatured ? `★ ${project.context}` : project.context}
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span
              aria-hidden="true"
              className="size-2 rounded-full"
              style={{ backgroundColor: LANGUAGE_COLOR[project.language] }}
            />
            {project.language} · {project.period}
          </span>
        </p>
        <h3
          className={cn(
            "font-display font-semibold tracking-tight",
            project.isFeatured ? "text-3xl md:text-4xl" : "text-2xl",
          )}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-paper/70 md:text-[15px]">{project.description}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="Tech stack">
          {project.stack.map((item) => (
            <li key={item} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-paper/70">
              {item}
            </li>
          ))}
        </ul>
        {project.links.length > 0 && (
          <ul className="flex flex-wrap gap-x-5">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...externalLinkProps(link.href)}
                  className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-paper"
                >
                  {link.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                  <span className="sr-only"> for {project.title} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SpotlightCard>
  );
}

function GitHubCard() {
  return (
    <div className="@container flex h-full flex-col justify-between gap-8 rounded-card border border-dashed border-line-strong p-6 md:p-7">
      <ContributionGraph />
      <div className="flex flex-col gap-6 @2xl:flex-row @2xl:items-end @2xl:justify-between">
        <div className="flex items-center gap-4">
          <GitHubIcon className="size-9 shrink-0 text-paper/80" />
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-2xl font-semibold">More on GitHub</h3>
            <p className="text-sm text-paper/60">Group projects and smaller experiments, split across two accounts.</p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-2">
          {[socialLinks.github, socialLinks.githubOld].map((account) => (
            <li key={account.href}>
              <a
                href={account.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm transition-colors hover:border-accent/60 hover:bg-accent-soft"
              >
                {account.href.replace("https://", "")}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Work() {
  const [isExpanded, setIsExpanded] = useState(false);
  const hiddenProjectCount = Math.max(0, projects.length - INITIAL_PROJECT_COUNT);

  return (
    <section id="work" aria-labelledby="work-title" className="page-gutter py-14 md:py-20">
      <div className="flex flex-col gap-8 md:gap-10">
        <SectionHeading
          kicker="work"
          titleId="work-title"
          description="School projects, side projects, and our thesis. Most started as an excuse to learn something new."
        >
          Things I&apos;ve <span className="font-serif font-normal text-accent italic">made</span>
        </SectionHeading>

        <SwipeList label="Projects" className="md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li
              key={project.slug}
              className={cn(
                SWIPE_ITEM_CLASS,
                project.isFeatured && "md:col-span-2",
                !isExpanded && index >= INITIAL_PROJECT_COUNT && "md:hidden",
              )}
            >
              <Reveal className="h-full" delay={(index % 3) * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
          {/* One tile while collapsed so it completes the second row; a wide closing row once expanded. */}
          <li className={cn(SWIPE_ITEM_CLASS, isExpanded && "md:col-span-2")}>
            <Reveal className="h-full">
              <GitHubCard />
            </Reveal>
          </li>
        </SwipeList>

        {hiddenProjectCount > 0 && (
          <button
            type="button"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((expanded) => !expanded)}
            className="hidden min-h-11 items-center gap-2 self-center rounded-full border border-line-strong px-5 text-sm font-medium transition-colors hover:border-accent/60 hover:bg-accent-soft md:inline-flex"
          >
            {isExpanded ? "Show fewer projects" : `Show ${hiddenProjectCount} more projects`}
            <ChevronDown aria-hidden="true" className={cn("size-4 transition-transform", isExpanded && "rotate-180")} />
          </button>
        )}
      </div>
    </section>
  );
}
