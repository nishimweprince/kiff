import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SITE_URL } from "@/lib/config";
import { EVENT } from "@/lib/content";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const avantGarde = localFont({
  src: "../public/fonts/vogue-avant-garde-light.otf",
  weight: "300",
  variable: "--font-avant",
  display: "swap",
});

const description = `${EVENT.tagline} ${EVENT.name}, ${EVENT.dates}, during International Women's Day week in ${EVENT.city}. Presented by 1819twenty.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${EVENT.name} | KIFF 2027`,
    template: `%s | KIFF 2027`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: EVENT.name,
    title: `${EVENT.name} | KIFF 2027`,
    description,
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1e1a1d",
};

// Runs before first paint so scroll-reveal content starts hidden instead of flashing.
// If the page never hydrates (ScrollReveal adds reveal-live), everything is shown again.
const revealScript = `(function(){var d=document.documentElement;if(!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("reveal-ready");setTimeout(function(){if(!d.classList.contains("reveal-live"))d.classList.remove("reveal-ready")},3000)}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${avantGarde.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="caps-sm sr-only z-[60] bg-purple px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <SmoothScroll />
        <ScrollReveal />
      </body>
    </html>
  );
}
