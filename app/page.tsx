import Image from "next/image";
import { CalendarDays, ChevronDown } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/Button";
import { DiamondRule } from "@/components/DiamondRule";
import { Brand1819 } from "@/components/Brand1819";
import { EVENT, HOME } from "@/lib/content";
import { BRAND_URL, SITE_URL } from "@/lib/config";

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: EVENT.name,
  description: HOME.about,
  startDate: EVENT.startDate,
  endDate: EVENT.endDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Kigali",
    address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
  },
  image: [`${SITE_URL}/opengraph-image.png`],
  organizer: { "@type": "Organization", name: "1819twenty", url: BRAND_URL },
  url: SITE_URL,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      <Hero
        image="/images/photos/runway-arena.jpg"
        alt="A spiral runway lit in violet at night, lined with guests"
        position="70% 40%"
        className="min-h-[calc(100svh-4.5rem)] sm:min-h-[calc(100svh-5rem)]"
      >
        <div className="flex max-w-[34rem] flex-col justify-center pb-28 pt-14 sm:pt-16">
          <h1 className="sr-only">{EVENT.name}</h1>
          <Image
            src="/images/brand/kiff-logo.png"
            alt=""
            width={1200}
            height={769}
            priority
            sizes="(min-width: 640px) 416px, 80vw"
            className="hero-enter-logo -ml-[3%] w-[min(88%,26rem)]"
          />
          <p className="hero-enter-tagline mt-8 font-serif text-[clamp(2.3rem,5vw,3.6rem)] font-normal italic leading-[1.04] text-gold">
            Where African design
            <br />
            meets the world.
          </p>
          <DiamondRule animate className="mt-7 w-52" lineClassName="bg-gold/70" />
          <div className="hero-enter-meta">
            <p className="mt-7 flex items-center gap-4">
              <CalendarDays size={30} strokeWidth={1} className="shrink-0 text-gold" aria-hidden="true" />
              <span className="caps leading-[1.7] text-white">
                <time dateTime="2027-03-08/2027-03-14">March 8–14, 2027</time>
                <br />
                Kigali, Rwanda
              </span>
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="/partners" variant="gold-outline">
                Become a Partner
              </Button>
              <Button href="/apply">Apply Now</Button>
            </div>
          </div>
        </div>
        <a
          href="#about"
          className="caps-sm absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-white/80 transition-colors hover:text-gold"
        >
          Scroll to explore
          <ChevronDown size={20} strokeWidth={1} aria-hidden="true" />
        </a>
      </Hero>

      <section aria-label="Festival themes" className="bg-ink text-white">
        <div className="imigongo opacity-70" aria-hidden="true" />
        {/* Pairs keep a balanced 2 × 2 on phones and join into one line from sm up. */}
        <ul className="mx-auto flex max-w-[1320px] flex-col items-center gap-y-2 px-5 py-6 sm:flex-row sm:justify-center">
          {[HOME.themes.slice(0, 2), HOME.themes.slice(2)].map((pair, p) => (
            <li key={p} className="flex items-center">
              {p > 0 && <Dot className="hidden sm:block" />}
              <span className="caps text-[0.8125rem] sm:text-sm">{pair[0]}</span>
              <Dot />
              <span className="caps text-[0.8125rem] sm:text-sm">{pair[1]}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="about" aria-labelledby="about-title" className="scroll-mt-20">
        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[46rem]">
            <Image
              src="/images/photos/model-beaded-crown.jpg"
              alt="A model in a beaded crown and a multicolored beaded bodice on the runway"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
          </div>
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-12 md:py-20 lg:px-20">
            <Image src="/images/brand/kiff-mark.png" alt="" width={451} height={234} className="w-48 sm:w-56" />
            <h2 id="about-title" className="caps mt-7 text-base leading-[1.6] text-ink sm:text-lg">
              Kigali International
              <br />
              Fashion Festival
            </h2>
            <div className="mt-4 flex w-full max-w-xs items-center gap-4">
              <span className="h-px flex-1 bg-gold/70" aria-hidden="true" />
              <p className="caps-sm whitespace-nowrap text-gold-deep">
                Presented by <Brand1819>1819twenty</Brand1819>
              </p>
              <span className="h-px flex-1 bg-gold/70" aria-hidden="true" />
            </div>
            <p className="prose-serif mt-9 text-ink/90">{HOME.about}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="cta-title" className="bg-purple text-white">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center px-5 py-16 text-center sm:py-20">
          <Image src="/images/brand/kiff-horns.png" alt="" width={400} height={371} className="w-14" />
          <h2 id="cta-title" className="mt-5 font-serif text-[clamp(2.1rem,4.5vw,3.25rem)] font-light leading-tight">
            {HOME.cta}
          </h2>
          <Button href="/apply" variant="light-outline" arrow className="mt-8">
            Apply Now
          </Button>
        </div>
      </section>
    </>
  );
}

function Dot({ className = "" }: { className?: string }) {
  return <span className={`mx-5 size-1 shrink-0 rotate-45 bg-gold sm:mx-8 ${className}`} aria-hidden="true" />;
}
