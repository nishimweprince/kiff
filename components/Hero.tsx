import Image from "next/image";
import { clsx } from "@/lib/clsx";

/**
 * Full-width dark photo hero. Text sits on the left; the overlay darkens more on small
 * screens, where the text covers more of the photo. `split` keeps portrait photos on the
 * right half from md up instead of stretching (and blurring) them across the full width.
 */
export function Hero({
  image,
  alt,
  position = "center",
  split = false,
  fade = false,
  className,
  children,
}: {
  image: string;
  alt: string;
  position?: string;
  split?: boolean;
  /** Black fade that slides in from the left on load, dimming the text side of the photo. */
  fade?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={clsx("relative isolate overflow-hidden bg-ink text-white", className)}>
      <div className={clsx("absolute inset-y-0 right-0 -z-20 w-full", split && "md:w-[62%] lg:w-[56%]")}>
        <Image
          src={image}
          alt={alt}
          fill
          priority
          quality={90}
          sizes={split ? "(min-width: 768px) 60vw, 100vw" : "100vw"}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
      <div
        aria-hidden="true"
        className={clsx(
          "absolute inset-0 -z-10",
          fade
            ? // Text spans the full width on phones, so the fade only opens up to the right from md.
              "hero-fade bg-[linear-gradient(90deg,rgb(0_0_0/0.82)_0%,rgb(0_0_0/0.7)_60%,rgb(0_0_0/0.5)_100%)] md:bg-[linear-gradient(90deg,rgb(0_0_0/0.85)_0%,rgb(0_0_0/0.72)_30%,rgb(0_0_0/0.35)_55%,rgb(0_0_0/0)_82%)]"
            : "bg-[linear-gradient(90deg,rgb(30_26_29/0.9)_0%,rgb(30_26_29/0.78)_60%,rgb(30_26_29/0.6)_100%)]",
          !fade &&
            (split
              ? "md:bg-[linear-gradient(90deg,var(--color-ink)_38%,rgb(30_26_29/0.55)_52%,rgb(30_26_29/0)_70%)] lg:bg-[linear-gradient(90deg,var(--color-ink)_44%,rgb(30_26_29/0.5)_56%,rgb(30_26_29/0)_72%)]"
              : "md:bg-[linear-gradient(90deg,rgb(30_26_29/0.88)_0%,rgb(30_26_29/0.5)_42%,rgb(30_26_29/0)_75%)]"),
        )}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink/70 to-transparent"
      />
      <div className="mx-auto flex h-full w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">{children}</div>
    </section>
  );
}

/** Page title block used on Partners and Apply. */
export function HeroTitle({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex max-w-xl flex-col justify-end pb-14 pt-32 sm:pb-20">
      <h1 className="font-serif text-[clamp(4rem,11vw,7.5rem)] font-light leading-[0.9] tracking-[-0.015em]">
        {title}
      </h1>
      {children}
    </div>
  );
}
