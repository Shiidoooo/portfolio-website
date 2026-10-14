import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  kicker: string;
  titleId: string;
  children: React.ReactNode;
  description?: string;
};

export function SectionHeading({ kicker, titleId, children, description }: SectionHeadingProps) {
  return (
    <Reveal className="flex max-w-2xl flex-col gap-4">
      <p className="font-mono text-xs text-accent">{`// ${kicker}`}</p>
      <h2
        id={titleId}
        className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-tight"
      >
        {children}
      </h2>
      {description && <p className="text-base leading-relaxed text-muted md:text-lg">{description}</p>}
    </Reveal>
  );
}
