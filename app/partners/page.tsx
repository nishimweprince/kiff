import type { Metadata } from "next";
import Image from "next/image";
import {
  Camera,
  Check,
  ConciergeBell,
  Handshake,
  Printer,
  Scissors,
  ShoppingBag,
  Theater,
  BusFront,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Hero, HeroTitle } from "@/components/Hero";
import { Button } from "@/components/Button";
import { DiamondRule } from "@/components/DiamondRule";
import { SectionLabel } from "@/components/SectionLabel";
import { DressForm } from "@/components/icons";
import { PARTNERS_INTRO, STUDIO_PARTNER, TIERS, WAYS_TO_PARTNER } from "@/lib/content";
import { clsx } from "@/lib/clsx";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with the Kigali International Fashion Festival as a designer, vendor, sponsor, or in-kind Studio Partner. Couture, Runway, and Atelier sponsorship levels.",
};

const wayIcons = { designer: DressForm, vendor: ShoppingBag, sponsor: Handshake } as const;

const serviceIcons: Record<(typeof STUDIO_PARTNER.services)[number], LucideIcon> = {
  "Venue & Staging": Theater,
  Hospitality: ConciergeBell,
  "Hair & Makeup": Scissors,
  Transportation: BusFront,
  "Photography & Media": Camera,
  Printing: Printer,
  Catering: UtensilsCrossed,
};

// "___" renders as a fill-in line; screen readers hear "your brand" instead of underscores.
function renderBenefit(text: string) {
  const [before, after] = text.split("___");
  if (after === undefined) return text;
  return (
    <>
      {before}
      <span className="inline-block w-[3.5em] border-b border-gold/70 align-baseline">
        <span className="sr-only">your brand</span>
      </span>
      {after}
    </>
  );
}

export default function PartnersPage() {
  return (
    <>
      <Hero
        image="/images/photos/runway-lineup.jpg"
        alt="Models in color-blocked looks walk the runway together at night"
        position="62% 45%"
        className="min-h-[34rem] md:min-h-[38rem]"
      >
        <HeroTitle title="Partners">
          <DiamondRule className="mt-6 w-64 max-w-full" lineClassName="bg-gold/80" />
          <p className="caps mt-5 flex items-center gap-3 text-sm text-white">
            Collaborate
            <span className="size-1.5 rotate-45 border border-gold" aria-hidden="true" />
            Create impact
          </p>
        </HeroTitle>
      </Hero>

      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <p className="prose-serif mx-auto pb-4 pt-14 text-center text-[1.3rem] sm:pt-16">{PARTNERS_INTRO}</p>

        <section aria-labelledby="ways" className="pt-10">
          <SectionLabel id="ways">Ways to partner</SectionLabel>
          <ul className="mt-9 grid gap-4 md:grid-cols-3 md:gap-5">
            {WAYS_TO_PARTNER.map((way) => {
              const Icon = wayIcons[way.type];
              return (
                <li key={way.type} className="flex flex-col items-center border border-gold/40 px-7 pb-9 pt-8 text-center">
                  <Icon size={40} strokeWidth={1} className="text-gold" />
                  <h3 className="mt-4 font-serif text-[1.75rem] font-medium leading-tight">{way.title}</h3>
                  <p className="mt-3 max-w-[30ch] text-[1.0625rem] leading-relaxed text-mute">{way.body}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="tiers" className="pt-20">
          <SectionLabel id="tiers">Sponsorship opportunities</SectionLabel>
          <ul className="mt-9 grid items-stretch gap-4 md:mt-14 md:grid-cols-3 md:gap-0">
            {TIERS.map((tier) => (
              <li
                key={tier.id}
                className={clsx(
                  "flex flex-col px-7 pb-10 pt-8 text-white sm:px-9",
                  tier.featured
                    ? "bg-purple ring-1 ring-gold/60 md:-my-5 md:py-12 md:z-10"
                    : "bg-ink",
                )}
              >
                <h3 className="caps text-[0.8125rem] text-white/90">
                  {tier.name}
                </h3>
                <p className="mt-3 font-serif text-[3.25rem] font-light leading-none tracking-tight [font-variant-numeric:lining-nums]">
                  {tier.price}
                  <span className="caps-sm ml-2 align-baseline text-gold-soft">USD</span>
                </p>
                <span className={clsx("mt-6 block h-px w-12", tier.featured ? "bg-gold" : "bg-gold/60")} aria-hidden="true" />
                <ul className="mt-6 space-y-3.5 text-[1.0625rem] leading-snug">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex gap-3">
                      <Check size={17} strokeWidth={1.5} className="mt-[0.2em] shrink-0 text-gold" aria-hidden="true" />
                      <span className="text-white/90">{renderBenefit(b)}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="studio" className="mt-16 bg-ink text-white md:mt-20">
          <div className="grid gap-10 px-7 py-10 sm:px-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14 md:py-12 lg:px-14">
            <div>
              <h2 id="studio" className="caps text-[0.8125rem]">
                {STUDIO_PARTNER.title} <span className="text-gold">({STUDIO_PARTNER.subtitle})</span>
              </h2>
              <p className="mt-5 max-w-[52ch] text-[1.125rem] leading-relaxed text-white/85">{STUDIO_PARTNER.body}</p>
            </div>
            <ul className="grid grid-cols-2 gap-px self-center bg-gold/25 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
              {STUDIO_PARTNER.services.map((service) => {
                const Icon = serviceIcons[service];
                return (
                  <li key={service} className="flex flex-col items-center gap-3 bg-ink px-2 py-6 text-center">
                    <Icon size={28} strokeWidth={1} className="text-gold" aria-hidden="true" />
                    <span className="caps-sm text-[0.625rem] leading-[1.6] text-white/85">{service}</span>
                  </li>
                );
              })}
              {/* Seven services; the mark fills the eighth cell so the grid closes evenly. */}
              <li aria-hidden="true" className="grid place-items-center bg-ink px-2 py-6">
                <Image src="/images/brand/kiff-horns.png" alt="" width={400} height={371} className="w-9 opacity-40" />
              </li>
            </ul>
          </div>
        </section>

        <div className="flex justify-center pb-20 pt-12 sm:pb-24">
          <Button href="/apply/form?type=sponsor" arrow>
            Become a Partner
          </Button>
        </div>
      </div>
    </>
  );
}
