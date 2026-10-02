import type { Metadata } from "next";
import Image from "next/image";
import { PiDressLight, PiHandshakeLight, PiShoppingBagLight } from "react-icons/pi";
import { Button } from "@/components/Button";
import { DiamondRule } from "@/components/DiamondRule";
import { Watermark } from "@/components/Watermark";
import { With1819 } from "@/components/Brand1819";
import { ABOUT } from "@/lib/content";
import { SOCIAL } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description:
    "KIFF is a week-long celebration of African design, creativity and enterprise in Kigali, Rwanda, March 8–14, 2027. Runway shows, a designer marketplace, and networking with buyers and partners.",
};

// Same order as ABOUT.expect: runway, marketplace, networking.
const expectIcons = [PiDressLight, PiShoppingBagLight, PiHandshakeLight];

const container = "mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12";
const h2 = "font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal leading-[1.1]";

export default function AboutPage() {
  return (
    <>
      {/* Type-led hero: the other pages open on a dark photo, this one on the headline itself. */}
      <section className={`${container} grid items-center gap-10 pb-16 pt-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-14 md:pb-24 md:pt-20 lg:gap-20`}>
        <div data-reveal="stagger">
          <h1 className="font-serif text-[clamp(3rem,7.5vw,6.5rem)] font-light leading-[0.95] tracking-[-0.015em] text-balance text-ink">
            {ABOUT.headline}
          </h1>
          <DiamondRule className="mt-8 w-52" lineClassName="bg-gold/70" />
          <p className="prose-serif mt-8 text-ink/90">{ABOUT.intro}</p>
          <p className="caps mt-8 leading-[1.8] text-gold-deep">
            <time dateTime="2027-03-08/2027-03-14">March 8–14, 2027</time>
            <br />
            Kigali, Rwanda
          </p>
        </div>
        <div data-reveal="unveil" className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
          <Image
            src="/images/photos/model-white-fringe.jpg"
            alt="A model in a long white fringed coat studded with pearls walks the runway barefoot"
            fill
            priority
            quality={90}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "50% 70%" }}
          />
        </div>
      </section>

      <div className="imigongo bg-ink" aria-hidden="true" />

      <div className="relative isolate overflow-hidden">
        <Watermark tone="ivory" side="left" />

        <section data-reveal="stagger" aria-labelledby="culture" className={`${container} grid gap-6 pb-14 pt-16 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-14 md:pt-24`}>
          <h2 id="culture" className={h2}>
            Culture and growth
          </h2>
          <p className="prose-serif text-ink/90">{ABOUT.culture}</p>
        </section>

        <section aria-labelledby="expect" className={`${container} pb-20 pt-6 md:pb-28`}>
          <h2 id="expect" data-reveal="rise" className={h2}>
            What to expect
          </h2>
          <ul data-reveal="stagger" className="mt-10 grid gap-10 border-t border-gold/40 pt-10 md:grid-cols-3 md:gap-12">
            {ABOUT.expect.map((item, i) => {
              const Icon = expectIcons[i];
              return (
                <li key={item} className="flex flex-col gap-4">
                  <Icon size={40} className="text-gold" aria-hidden="true" />
                  <p className="max-w-[34ch] text-[1.25rem] leading-snug text-ink">{item}</p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <section aria-labelledby="kigali" className="bg-ink text-white">
        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div data-reveal="unveil" className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-[38rem]">
            <Image
              src="/images/photos/model-feather-gown.jpg"
              alt="A model in a green gown with a raffia hem walks beneath a lit arch as guests look on"
              fill
              quality={90}
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 65%" }}
            />
          </div>
          <div className="relative isolate overflow-hidden">
            <Watermark tone="ink" className="w-[130%] sm:w-[90%] md:w-[85%]" />
            <div data-reveal="stagger" className="flex h-full flex-col justify-center px-5 py-16 sm:px-12 md:py-20 lg:px-20">
              <h2 id="kigali" className={h2}>
                Why Kigali
              </h2>
              <DiamondRule className="mt-6 w-40" lineClassName="bg-gold/70" />
              <p className="prose-serif mt-7 text-white/85">{ABOUT.whyKigali}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative isolate overflow-hidden">
        <Watermark tone="ivory" />

        {/* Set like a festival programme's credits page: no portraits, the names carry it. */}
        {/* The heading holds the left column alone; the roster nests under the intro, so names read as entries, not headings. */}
        <section
          aria-labelledby="team"
          className={`${container} grid gap-6 pt-20 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-14 md:pt-24`}
        >
          <h2 id="team" data-reveal="rise" className={h2}>
            Meet the team
          </h2>
          <div>
            <p data-reveal="rise" className="prose-serif text-ink/90">
              {ABOUT.team.intro}
            </p>
            <ul data-reveal="stagger" className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2">
              {ABOUT.team.members.map((m) => (
                <li key={m.name} className="border-t border-gold/40 pt-6">
                  <h3 className="font-serif text-[1.75rem] font-normal italic leading-[1.1] text-purple">{m.name}</h3>
                  <p className="caps-sm mt-2.5 leading-[1.7] text-gold-deep">{m.role}</p>
                  <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-[1.65] text-ink/80">{m.bio}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section data-reveal="stagger" aria-labelledby="presented" className={`${container} grid gap-6 py-20 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-14 md:py-24`}>
          <h2 id="presented" className={h2}>
            Presented by 1819twenty
          </h2>
          <p className="prose-serif text-ink/90">
            <With1819 text={ABOUT.presentedBy} className="decoration-gold/60" />
          </p>
        </section>
      </div>

      <section aria-labelledby="join" className="bg-purple text-white">
        <div data-reveal="stagger" className={`${container} py-16 sm:py-20`}>
          <Image src="/images/brand/kiff-badge-sm.png" alt="" width={256} height={256} className="size-16" />
          <h2 id="join" className={`${h2} mt-5`}>
            Join us
          </h2>
          <div className="mt-10 grid gap-px bg-gold/40 md:grid-cols-2">
            <div className="flex flex-col items-start gap-6 bg-purple py-8 md:pr-12">
              <p className="max-w-[36ch] text-[1.3rem] leading-snug">{ABOUT.join.designers}</p>
              <Button href="/apply/form?type=designer" variant="gold-outline">
                Apply Now
              </Button>
            </div>
            <div className="flex flex-col items-start gap-6 bg-purple py-8 md:pl-12">
              <p className="max-w-[36ch] text-[1.3rem] leading-snug">{ABOUT.join.partners}</p>
              <Button href="/partners" variant="light-outline">
                Become a Partner
              </Button>
            </div>
          </div>
          <p className="mt-10 font-serif text-[1.125rem] italic text-white/80">
            Follow along on Instagram{" "}
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener"
              className="text-gold-soft underline decoration-gold/50 underline-offset-4 transition-colors hover:text-white"
            >
              @kiffkigali
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
