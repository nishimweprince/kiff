"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuMenu as Menu, LuX as X } from "react-icons/lu";
import { SOCIAL } from "@/lib/config";
import { clsx } from "@/lib/clsx";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/partners", label: "Partners" },
  { href: "/apply", label: "Apply" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

// Sweep underline ported from 1819twenty's NavLink: hover draws an ink
// underline sweeping in from the left, the current page draws a solid gold
// one, so the two states stay distinguishable.
const sweep =
  "relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-150 motion-reduce:after:transition-none";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the mobile menu after navigating.
  if (open && openedAt !== pathname) setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/25 bg-ivory">
      <div className="mx-auto flex h-[4.5rem] max-w-[1320px] items-center gap-4 px-5 sm:h-20 sm:px-8 lg:px-12">
        <Link href="/" aria-label="KIFF home" className="shrink-0">
          <Image
            src="/images/brand/kiff-mark.png"
            alt="KIFF"
            width={451}
            height={234}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-9 md:flex">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "caps-sm py-2 transition-colors",
                  sweep,
                  active
                    ? "text-gold-deep after:scale-x-100 after:bg-gold"
                    : "text-ink after:bg-ink/40 hover:text-gold-deep hover:after:scale-x-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={SOCIAL.hashtag}
            target="_blank"
            rel="noopener"
            className={clsx(
              "caps-sm py-2 text-ink transition-colors after:bg-ink/40 hover:text-gold-deep hover:after:scale-x-100",
              sweep,
            )}
          >
            #KIFF2027
          </a>
        </nav>

        <Link
          href="/apply"
          className="caps-sm ml-auto inline-flex h-10 cursor-pointer items-center border border-purple bg-purple px-4 text-white transition-colors hover:bg-purple-deep sm:px-6 md:ml-4"
        >
          Apply Now
        </Link>

        <button
          type="button"
          onClick={() => {
            setOpenedAt(pathname);
            setOpen((v) => !v);
          }}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 grid size-10 cursor-pointer place-items-center text-ink md:hidden"
        >
          {open ? (
            <X size={24} strokeWidth={1.25} aria-hidden="true" />
          ) : (
            <Menu size={24} strokeWidth={1.25} aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="fixed inset-x-0 bottom-0 top-[4.5rem] flex flex-col border-t border-gold/25 bg-ivory px-5 pt-10 sm:top-20 md:hidden"
        >
          <ul className="flex flex-col">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-gold/25">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "block py-5 font-serif text-4xl font-light",
                      active ? "text-gold-deep" : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="border-b border-gold/25">
              <a href={SOCIAL.hashtag} target="_blank" rel="noopener" className="block py-5 font-serif text-4xl font-light text-ink">
                #KIFF2027
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
