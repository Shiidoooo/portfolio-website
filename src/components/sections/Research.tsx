import { ArrowUpRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { publication } from "@/content/profile";
import { externalLinkProps } from "@/lib/links";

export function Research() {
  const [leadAuthor, ...coAuthors] = publication.authors;

  return (
    <section id="research" aria-labelledby="research-title" className="page-gutter py-14 md:py-20">
      <div className="flex flex-col gap-8 md:gap-10">
        <SectionHeading kicker="research" titleId="research-title">
          Published <span className="font-serif font-normal text-accent italic">research</span>
        </SectionHeading>

        <Reveal>
          <SpotlightCard as="article" className="grid gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12">
            <span aria-hidden="true" className="border-beam" />

            <div className="flex flex-col gap-5">
              <p className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-accent">
                  <BookOpen aria-hidden="true" className="size-3.5" />
                  Peer-reviewed · {publication.role}
                </span>
                <span className="text-muted">{publication.date}</span>
              </p>
              <h3 className="font-display text-2xl leading-snug font-semibold tracking-tight md:text-3xl">
                {publication.title}
              </h3>
              <p className="text-sm text-muted">{publication.venue}</p>
              <p className="leading-relaxed text-paper/75">{publication.summary}</p>
              <p className="text-sm text-paper/60">
                <span className="font-medium text-paper">{leadAuthor}</span>, {coAuthors.join(", ")}
              </p>
            </div>

            <div className="flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-3">
                <p className="font-mono text-xs text-muted">{"// what we found"}</p>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  {publication.findings.map((finding) => (
                    <li
                      key={finding}
                      className="rounded-xl border border-line bg-ink/50 px-4 py-3 font-display text-base font-medium text-paper/90"
                    >
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="flex flex-wrap gap-x-5">
                {publication.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...externalLinkProps(link.href)}
                      className="group inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-paper"
                    >
                      {link.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
