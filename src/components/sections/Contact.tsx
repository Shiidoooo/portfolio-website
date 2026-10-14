import { FileText } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { EmailMenu } from "@/components/ui/EmailMenu";
import { Reveal } from "@/components/ui/Reveal";
import { freelance, profile, socialLinks } from "@/content/profile";
import { CopyEmailButton } from "./CopyEmailButton";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="page-gutter py-14 md:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-card border border-line bg-surface px-6 py-12 text-center md:px-12 md:py-16">
          <div aria-hidden="true" className="dot-grid absolute inset-0" />
          <div
            aria-hidden="true"
            className="absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <p className="font-mono text-xs text-accent">{"// contact"}</p>
            <h2
              id="contact-title"
              className="font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1] font-semibold tracking-tight"
            >
              Say <span className="font-serif font-normal text-accent italic">hi</span>
            </h2>
            <p className="max-w-md leading-relaxed text-paper/70 md:text-lg">
              Whether it&apos;s a job, a project you have in mind, or a question about something I built, my inbox is
              open.
            </p>
            {freelance.isOpen && (
              <div className="flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-teal/25 bg-teal/5 px-5 py-4">
                <p className="inline-flex items-center gap-2 font-mono text-xs text-teal">
                  <span aria-hidden="true" className="pulse-dot size-1.5 rounded-full bg-teal" />
                  {freelance.label}
                </p>
                <p className="text-sm leading-relaxed text-paper/75">{freelance.pitch}</p>
                <ul className="flex flex-wrap justify-center gap-1.5" aria-label="Freelance services">
                  {freelance.services.map((service) => (
                    <li key={service} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-paper/70">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="font-display text-[clamp(1.25rem,4vw,2.25rem)] font-medium break-all select-all">
              {profile.email}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <EmailMenu
                email={profile.email}
                subject={profile.emailSubject}
                label="Write me an email"
                variant="primary"
                align="center"
              />
              <CopyEmailButton email={profile.email} />
            </div>
            <div className="flex gap-2 pt-2">
              <a
                href={socialLinks.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-muted transition-colors hover:bg-surface-raised hover:text-paper"
              >
                <GitHubIcon className="size-4" /> GitHub
              </a>
              <a
                href={socialLinks.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-muted transition-colors hover:bg-surface-raised hover:text-paper"
              >
                <LinkedInIcon className="size-4" /> LinkedIn
              </a>
              <a
                href={socialLinks.resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-muted transition-colors hover:bg-surface-raised hover:text-paper"
              >
                <FileText aria-hidden="true" className="size-4" /> Resume
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
