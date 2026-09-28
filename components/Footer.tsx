import Image from "next/image";
import Link from "next/link";
import { SOCIAL } from "@/lib/config";
import { Brand1819 } from "./Brand1819";
import { Facebook, Instagram, TikTok } from "./icons";

const socials = [
  { href: SOCIAL.instagram, label: "Instagram", Icon: Instagram },
  { href: SOCIAL.facebook, label: "Facebook", Icon: Facebook },
  { href: SOCIAL.tiktok, label: "TikTok", Icon: TikTok },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:gap-10 lg:px-12">
        <Link href="/" className="flex items-center gap-4" aria-label="Kigali International Fashion Festival, home">
          <Image src="/images/brand/kiff-mark.png" alt="" width={451} height={234} className="h-11 w-auto" />
          <span className="h-9 w-px bg-gold/60" aria-hidden="true" />
          <span className="caps-sm leading-[1.6] text-gold">
            Kigali International
            <br />
            Fashion Festival
          </span>
        </Link>

        <p className="flex flex-wrap gap-x-5 gap-y-1 font-serif text-[0.95rem] italic text-gold md:ml-auto">
          <span>#KigaliFashionFestival</span>
          <span>#KIFF2027</span>
          <span>
            #<Brand1819 className="decoration-gold/40">1819twenty</Brand1819>
          </span>
        </p>

        <ul className="flex items-center gap-2 md:-mr-2">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener"
                aria-label={`KIFF on ${label}`}
                className="grid size-10 place-items-center text-gold transition-colors hover:text-gold-soft"
              >
                <Icon size={22} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/10">
        <p className="caps-sm mx-auto max-w-[1320px] px-5 py-5 text-white/55 sm:px-8 lg:px-12">
          Presented by <Brand1819 className="text-white/80 decoration-white/30">1819twenty</Brand1819>
        </p>
      </div>
    </footer>
  );
}
