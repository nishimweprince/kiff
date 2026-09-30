import Link from "next/link";
import { LuArrowRight as ArrowRight } from "react-icons/lu";
import { clsx } from "@/lib/clsx";

type Variant = "purple" | "gold-outline" | "light-outline";

const variants: Record<Variant, string> = {
  purple: "bg-purple text-white border border-purple hover:bg-purple-deep hover:border-gold/70",
  "gold-outline": "border border-gold text-white hover:bg-gold hover:text-ink",
  "light-outline": "border border-white/80 text-white hover:bg-white hover:text-purple",
};

export function buttonClass(variant: Variant = "purple", className?: string) {
  return clsx(
    "group inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 px-8 py-2.5 font-serif text-[1.1875rem] leading-none tracking-[0.01em] transition-colors duration-300",
    variants[variant],
    className,
  );
}

export function Button({
  href,
  children,
  variant = "purple",
  arrow = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      size={18}
      strokeWidth={1.25}
      aria-hidden="true"
      className={clsx("transition-transform duration-300 group-hover:translate-x-1", className)}
    />
  );
}
