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

// Ordered high to low; Couture is featured. Prices are in USD.
// "___" in a benefit renders as a fill-in blank on the partners page.
export const TIERS: Tier[] = [
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
    id: "atelier",
    name: "Atelier Partner",
    price: "$1,500",
    benefits: ["2 event passes", "Logo on the website and event signage", "Social media mention"],
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
