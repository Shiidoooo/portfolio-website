import { cn } from "@/lib/cn";
import { externalLinkProps } from "@/lib/links";

export type ButtonVariant = "primary" | "secondary";

type ButtonLinkProps = {
  href: string;
  variant: ButtonVariant;
  children: React.ReactNode;
  className?: string;
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-ink shadow-[0_0_0_1px_rgb(194_236_92/0.4),0_8px_30px_-6px_rgb(194_236_92/0.5)] hover:shadow-[0_0_0_1px_rgb(194_236_92/0.6),0_10px_40px_-4px_rgb(194_236_92/0.7)]",
  secondary: "border border-line-strong bg-surface-raised/60 text-paper hover:border-paper/40 hover:bg-surface-raised",
};

// Shared by links and buttons that should look like this one (e.g. EmailMenu's trigger).
export function buttonClassName(variant: ButtonVariant, className?: string) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
    VARIANT_CLASS[variant],
    className,
  );
}

export function ButtonLink({ href, variant, children, className }: ButtonLinkProps) {
  return (
    <a href={href} {...externalLinkProps(href)} className={buttonClassName(variant, className)}>
      {children}
    </a>
  );
}
