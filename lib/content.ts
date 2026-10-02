// Site copy, taken from the KIFF website requirements (Sep 26, 2026).
// Participation fees are intentionally absent: the KIFF team discusses them after submission.

export const EVENT = {
  name: "Kigali International Fashion Festival",
  short: "KIFF",
  dates: "March 8–14, 2027",
  city: "Kigali, Rwanda",
  startDate: "2027-03-08",
  endDate: "2027-03-14",
  tagline: "Where African design meets the world.",
  deadline: "February 1, 2027",
  venue: "Venue announced soon",
};

export const HOME = {
  themes: ["Fashion", "Culture", "Creativity", "Opportunity"],
  about:
    "Held during International Women's Day week 2027, the Kigali International Fashion Festival brings designers, creatives, entrepreneurs, and brands from across Africa and beyond to Rwanda's capital. The festival showcases African craftsmanship, honors the women shaping the fashion industry, opens global markets for designers, and positions Kigali as a hub for the creative industry.",
  openTo: "Open to designers of every background.",
  cta: "Be Part of a Global Stage",
};

export type ApplicantType = "designer" | "vendor" | "sponsor";

export const WAYS_TO_PARTNER: { type: ApplicantType; title: string; body: string }[] = [
  {
    type: "designer",
    title: "Designers",
    body: "Showcase your collection before buyers, press, and fashion lovers.",
  },
  {
    type: "vendor",
    title: "Vendors",
    body: "Sell fashion, accessories, beauty, and lifestyle products in the festival marketplace.",
  },
  {
    type: "sponsor",
    title: "Sponsors",
    body: "Align your brand with Kigali's premier fashion event and its International Women's Day celebration.",
  },
];

export const PARTNERS_INTRO =
  "Partner with us to celebrate fashion, creativity, and International Women's Day. There are several ways to take part.";

export type Tier = {
  id: "runway" | "couture" | "atelier";
  name: string;
  price: string;
  featured?: boolean;
  benefits: string[];
};

// Ordered low to high; Couture is featured.
// "___" in a benefit renders as a fill-in blank on the partners page.
export const TIERS: Tier[] = [
  {
    id: "atelier",
    name: "Atelier Partner",
    price: "$1,500",
    benefits: ["2 event passes", "Logo on the website and event signage", "Social media mention"],
  },
  {
    id: "runway",
    name: "Runway Partner",
    price: "$5,000",
    benefits: [
      "Reserved seating for 4",
      "Logo on event materials and the website",
      "A marketplace booth",
      "Social media recognition",
    ],
  },
  {
    id: "couture",
    name: "Couture Partner",
    price: "$10,000",
    featured: true,
    benefits: [
      "VIP seating for 6",
      "Named sponsor recognition: “KIFF 2027 in partnership with ___.”",
      "Logo on all event materials and the runway backdrop",
      "Speaking opportunity at the opening",
      "Featured social media campaign",
    ],
  },
];

export const STUDIO_PARTNER = {
  title: "Studio Partner",
  subtitle: "In-Kind",
  body: "Goods and services are welcome: venue and staging, hospitality, hair and makeup, transportation, photography and media, printing, and catering. Studio Partners receive recognition at the sponsorship level that matches the value of their contribution.",
  services: [
    "Venue & Staging",
    "Hospitality",
    "Hair & Makeup",
    "Transportation",
    "Photography & Media",
    "Printing",
    "Catering",
  ] as const,
};

export const APPLY_INTRO = `Join us for the Kigali International Fashion Festival, ${EVENT.dates}. Complete the application as a designer, vendor, or sponsor, and our team will follow up. Applications close ${EVENT.deadline}.`;

export const APPLICANT_ROWS: { type: ApplicantType; title: string; body: string; image: string; alt: string; position: string }[] = [
  {
    type: "designer",
    title: "Designer",
    body: WAYS_TO_PARTNER[0].body,
    image: "/images/photos/model-beaded-crown.jpg",
    alt: "Close view of a beaded bodice in bright colors",
    position: "50% 62%",
  },
  {
    type: "vendor",
    title: "Vendor",
    body: WAYS_TO_PARTNER[1].body,
    image: "/images/photos/model-feather-gown.jpg",
    alt: "Feathered hem of a black and gold gown",
    position: "50% 88%",
  },
  {
    type: "sponsor",
    title: "Sponsor",
    body: WAYS_TO_PARTNER[2].body,
    image: "/images/photos/model-white-fringe.jpg",
    alt: "White knitted fringe coat in motion",
    position: "50% 55%",
  },
];

export const MARKETPLACE_EXPLAINER =
  "1819twenty is a curated U.S. marketplace that connects African fashion and home goods brands with customers in the United States. Brands keep their own inventory and ship directly to customers. Products are sold at per-unit wholesale pricing, with no minimum orders.";

export const CONFIRMATION_EMAIL = {
  subject: "We received your KIFF application",
  body: "Thank you for applying to the Kigali International Fashion Festival, March 8-14, 2027. Our team will review your application and follow up. Questions? Contact hello@kigalifashionfestival.com.",
};

// About page copy, final from the KIFF team.
export const ABOUT = {
  headline: "A Week of African Designers Shaping the World's Fashion",
  intro:
    "The Kigali International Fashion Festival (KIFF) is a week-long celebration of design, creativity and enterprise, held in Kigali, Rwanda, March 8–14, 2027. KIFF brings together designers, makers, buyers and fashion lovers to showcase the talent coming out of Africa and connect it to new markets.",
  culture:
    "KIFF exists to promote African culture through fashion and to fuel the growth of the designers who carry it forward. Every collection tells a story of heritage, craftsmanship and identity, and KIFF puts those stories on a global stage. Beyond the runway, the festival opens doors to new customers, partners and markets, helping designers turn creative talent into lasting, thriving businesses.",
  expect: [
    "Runway shows featuring established and emerging designers.",
    "A marketplace where guests can shop directly from designers.",
    "Networking with buyers, retailers and partners looking for the next great African brand.",
  ] as const,
  whyKigali:
    "Kigali is one of Africa's most dynamic cities: clean, safe, welcoming and growing fast as a hub for creativity and business. It's the natural home for a festival built on connection.",
  team: {
    intro:
      "The Kigali International Fashion Festival is brought to life by a team dedicated to celebrating African design, elevating creative talent, and connecting Kigali to the global fashion stage.",
    members: [
      {
        name: "Stevon Sampson",
        role: "Founder & President",
        bio: "Stevon leads KIFF's vision and strategic direction, guiding the festival's growth and its mission to showcase designers from Rwanda, across Africa, and beyond during International Women's Day week.",
      },
      {
        name: "Yvette Mutoni",
        role: "Talent Director & Operations Manager",
        bio: "Yvette oversees designer and talent relations and keeps the festival running smoothly, from applications and scheduling to on-site coordination.",
      },
      {
        name: "Maurice Niyigena",
        role: "Fashion Curator & Managing Director",
        bio: "Maurice shapes the creative heart of KIFF, curating the designers and collections featured each year and managing the festival's day-to-day direction.",
      },
      {
        name: "David Niyomukiza",
        role: "Media Director",
        bio: "David leads KIFF's media, content, and storytelling, making sure the festival's designers and moments reach audiences in Kigali and around the world.",
      },
    ],
  },
  presentedBy:
    "KIFF is presented by 1819twenty, a platform that brings African fashion brands to customers in the United States and beyond. Participating designers can choose to sell through 1819twenty, extending their reach well past festival week.",
  join: {
    designers: "Designers: applications are open through February 1, 2027.",
    partners: "Partners and sponsors: help us build something lasting.",
  },
};
