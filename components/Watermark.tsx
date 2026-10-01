import { clsx } from "@/lib/clsx";

/**
 * Faint gorilla-and-horns watermark cut from the KIFF badge, bleeding off one edge of a section.
 * The artwork is a white alpha mask, so the tone only sets the fill colour. The parent needs
 * `relative isolate overflow-hidden`; pass a width in `className` to override the default size.
 */
export function Watermark({
  tone,
  side = "right",
  align = "center",
  className,
}: {
  tone: "ivory" | "ink";
  side?: "left" | "right";
  /** `top` pins it to the top of a long section so it sits behind the opening text. */
  align?: "center" | "top";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "watermark pointer-events-none absolute -z-10 aspect-[1000/714]",
        align === "center" ? "top-1/2 -translate-y-1/2" : "top-0",
        tone === "ivory" ? "bg-gold-deep/[0.09]" : "bg-gold/[0.08]",
        side === "right" ? "-right-[18%] md:-right-[8%]" : "-left-[18%] md:-left-[8%]",
        className ?? "w-[130%] sm:w-[85%] md:w-[58%]",
      )}
    />
  );
}
