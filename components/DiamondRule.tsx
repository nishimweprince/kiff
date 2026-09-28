import { clsx } from "@/lib/clsx";

/**
 * The logo's gold rule with a purple diamond at its center. The site's one recurring divider.
 */
export function DiamondRule({
  className,
  lineClassName,
  animate = false,
}: {
  className?: string;
  lineClassName?: string;
  animate?: boolean;
}) {
  return (
    <div
      className={clsx("flex items-center", animate && "hero-enter-rule", className)}
      aria-hidden="true"
    >
      <span className={clsx("h-px flex-1 bg-gold", lineClassName)} />
      <svg width="14" height="14" viewBox="0 0 14 14" className="mx-1.5 shrink-0">
        <rect x="3" y="3" width="8" height="8" transform="rotate(45 7 7)" fill="var(--color-purple)" stroke="var(--color-gold)" strokeWidth="1" />
      </svg>
      <span className={clsx("h-px flex-1 bg-gold", lineClassName)} />
    </div>
  );
}
