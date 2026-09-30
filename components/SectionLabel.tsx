import { clsx } from "@/lib/clsx";

/** Spaced capitals centered between two thin gold lines. */
export function SectionLabel({
  children,
  as: Tag = "h2",
  id,
  className,
  reveal = false,
}: {
  children: React.ReactNode;
  as?: "h2" | "h3" | "p";
  id?: string;
  className?: string;
  /** Rise into view on scroll. */
  reveal?: boolean;
}) {
  return (
    <div data-reveal={reveal ? "rise" : undefined} className={clsx("flex items-center gap-5 sm:gap-8", className)}>
      <span className="h-px flex-1 bg-gold/60" aria-hidden="true" />
      <Tag id={id} className="caps text-[0.8125rem] text-ink sm:text-sm">
        {children}
      </Tag>
      <span className="h-px flex-1 bg-gold/60" aria-hidden="true" />
    </div>
  );
}
