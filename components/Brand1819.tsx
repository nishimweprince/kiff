import { Fragment } from "react";
import { BRAND_URL } from "@/lib/config";
import { clsx } from "@/lib/clsx";

/** Every mention of 1819twenty on the site links to the 1819twenty store. */
export function Brand1819({ children = "1819twenty", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <a
      href={BRAND_URL}
      target="_blank"
      rel="noopener"
      className={clsx("underline decoration-current/40 underline-offset-[0.2em] transition-colors hover:decoration-current", className)}
    >
      {children}
    </a>
  );
}

/** Render a string, turning each "1819twenty" into a Brand1819 link. */
export function With1819({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(1819twenty)/i);
  return (
    <>
      {parts.map((part, i) =>
        /^1819twenty$/i.test(part) ? (
          <Brand1819 key={i} className={className}>
            {part}
          </Brand1819>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
