import Image from "next/image";
import type { Project } from "@/content/profile";
import { ProjectCoverArt } from "./ProjectCoverArt";

// Screenshot when we have one, otherwise an illustration, otherwise the project's initials.
export function ProjectCover({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative h-full overflow-hidden">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent" />
      </div>
    );
  }

  // The illustrations are drawn for a dark canvas, so they stay dark in light mode too.
  if (project.art) {
    return (
      <div data-theme="dark" className="h-full bg-surface">
        <ProjectCoverArt art={project.art} />
      </div>
    );
  }

  const initials = project.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
  return (
    <div aria-hidden="true" className="flex h-full items-center justify-center font-display text-6xl font-semibold text-paper/15">
      {initials}
    </div>
  );
}
