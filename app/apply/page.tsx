import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Handshake, Mail, ShoppingBag } from "lucide-react";
import { Hero, HeroTitle } from "@/components/Hero";
import { Arrow, Button } from "@/components/Button";
import { DiamondRule } from "@/components/DiamondRule";
import { SectionLabel } from "@/components/SectionLabel";
import { DressForm } from "@/components/icons";
import { APPLICANT_ROWS, APPLY_INTRO } from "@/lib/content";
import { CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to the Kigali International Fashion Festival, March 8–14, 2027, as a designer, vendor, or sponsor. Applications close February 1, 2027.",
};

const icons = { designer: DressForm, vendor: ShoppingBag, sponsor: Handshake } as const;

export default function ApplyPage() {
  return (
    <>
      <Hero
        image="/images/photos/model-orange-gown.jpg"
        alt="A model in a flowing orange gown on a night runway"
        position="50% 40%"
        split
        className="min-h-[36rem] md:min-h-[40rem]"
      >
        <HeroTitle title="Apply">
          <p className="caps mt-6 text-[0.8125rem] leading-[1.7] text-white sm:text-base">
            Kigali International
            <br />
            Fashion Festival
          </p>
          <DiamondRule className="mt-5 w-72 max-w-full" lineClassName="bg-gold/80" />
          <p className="caps mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-white">
            <CalendarDays size={26} strokeWidth={1} className="text-gold" aria-hidden="true" />
            <time dateTime="2027-03-08/2027-03-14">March 8–14, 2027</time>
            <span className="h-4 w-px bg-white/60" aria-hidden="true" />
            <span>Kigali, Rwanda</span>
          </p>
        </HeroTitle>
      </Hero>

      <div className="mx-auto max-w-[1080px] px-5 sm:px-8">
        <p className="prose-serif mx-auto pt-14 text-center text-[1.3rem] sm:pt-16">{APPLY_INTRO}</p>

        <section aria-labelledby="types" className="pt-12">
          <SectionLabel id="types">Applicant types</SectionLabel>
          <ul className="mt-8 flex flex-col gap-3">
            {APPLICANT_ROWS.map((row) => {
              const Icon = icons[row.type];
              return (
                <li key={row.type}>
                  <Link
                    href={`/apply/form?type=${row.type}`}
                    className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-5 border border-gold/40 bg-ivory pl-5 transition-colors hover:border-gold sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,14rem)_auto] sm:gap-x-7 sm:pl-7"
                  >
                    <Icon size={40} strokeWidth={1} className="text-gold" />
                    <span className="py-6">
                      <span className="block font-serif text-[1.75rem] font-medium leading-tight">{row.title}</span>
                      <span className="mt-1 block text-[1.0625rem] leading-snug text-mute">{row.body}</span>
                    </span>
                    <span className="relative hidden h-full min-h-28 overflow-hidden sm:block">
                      <Image
                        src={row.image}
                        alt=""
                        fill
                        sizes="224px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ objectPosition: row.position }}
                      />
                      <span className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ivory to-transparent" aria-hidden="true" />
                    </span>
                    <span className="pr-5 text-gold-deep sm:pr-7">
                      <Arrow className="size-6" />
                      <span className="sr-only">
                        {row.type === "sponsor" ? "Become a Partner" : `Apply Now as a ${row.title.toLowerCase()}`}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="flex flex-col items-center gap-8 pb-20 pt-12 sm:pb-24">
          <Button href="/apply/form" arrow className="px-14">
            Apply Now
          </Button>
          <p className="flex items-center gap-3 text-center text-[1.0625rem]">
            <Mail size={20} strokeWidth={1.25} className="shrink-0 text-gold-deep" aria-hidden="true" />
            <span>
              Questions? Contact{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline decoration-gold underline-offset-4 hover:text-gold-deep">
                {CONTACT_EMAIL}
              </a>
              .
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
