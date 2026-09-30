import { z } from "zod";
import { isPhoneValid } from "./phone";

// Question wording shared by the form and the submission email.
export const QUESTIONS = {
  type: "I'm applying as",
  fullName: "Full name",
  email: "Email",
  phone: "Phone (WhatsApp)",
  company: "Company or brand name",
  country: "Country",
  website: "Website or social media",

  title: "Your title",
  level: "Sponsorship level",
  inKind: "Describe the goods or services you'd provide and their estimated value.",
  goals: "What would you like your brand to get from the festival?",
  logo: "Upload your logo (high resolution).",

  designerNames: "Designer name(s)",
  yearsInBusiness: "Years in business",
  aesthetic: "Describe your brand and aesthetic.",
  participation: "Participation",
  looks: "Number of looks you plan to present",
  lookbook: "Upload a lookbook or share a link.",
  previousShows: "Previous shows or features (optional)",

  category: "Product category",
  categoryOther: "Other product category",
  products: "Describe your products.",
  days: "Which days will you attend (March 8–14)?",
  booth: "Booth needs",
  boothOther: "Other booth needs",
  photos: "Upload 2–3 product photos.",

  marketplace: "Would you be interested in selling your products through 1819twenty?",

  heardFrom: "How did you hear about the festival?",
  accurate: "I confirm the information provided is accurate.",
  consent:
    "I agree that the Kigali International Fashion Festival may store my information and use the photos and materials I submit to review my application and promote the festival.",
} as const;

export const APPLICANT_TYPES = [
  { value: "designer", label: "Designer" },
  { value: "vendor", label: "Vendor" },
  { value: "sponsor", label: "Sponsor" },
] as const;

export const SPONSOR_LEVELS = [
  { value: "couture", label: "Couture ($10,000)" },
  { value: "runway", label: "Runway ($5,000)" },
  { value: "atelier", label: "Atelier ($1,500)" },
  { value: "studio", label: "Studio Partner (In-Kind)" },
] as const;

export const PARTICIPATION = [
  { value: "runway", label: "Runway" },
  { value: "showcase", label: "Showcase" },
  { value: "both", label: "Both" },
] as const;

export const CATEGORIES = [
  { value: "fashion", label: "Fashion" },
  { value: "accessories", label: "Accessories" },
  { value: "beauty", label: "Beauty" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "other", label: "Other" },
] as const;

export const BOOTH_NEEDS = [
  { value: "table", label: "Table" },
  { value: "electricity", label: "Electricity" },
  { value: "rack", label: "Rack" },
  { value: "other", label: "Other" },
] as const;

export const FESTIVAL_DAYS = [
  { value: "2027-03-08", label: "Mon, Mar 8" },
  { value: "2027-03-09", label: "Tue, Mar 9" },
  { value: "2027-03-10", label: "Wed, Mar 10" },
  { value: "2027-03-11", label: "Thu, Mar 11" },
  { value: "2027-03-12", label: "Fri, Mar 12" },
  { value: "2027-03-13", label: "Sat, Mar 13" },
  { value: "2027-03-14", label: "Sun, Mar 14" },
] as const;

export const MARKETPLACE = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "more-info", label: "I'd like more information" },
] as const;

const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

const required = (msg: string) => z.string().trim().min(1, msg);
// Conditional checks run even when other fields are invalid, so every error shows on the first attempt.
const always = { when: () => true };

const choose = <T extends readonly { value: string }[]>(opts: T, msg: string) =>
  z.enum(values(opts), { error: msg });

export const uploadedFile = z.object({
  url: z
    .string()
    .url()
    .refine((u) => u.startsWith("https://res.cloudinary.com/"), "Upload the file again."),
  name: z.string(),
});
export type UploadedFile = z.infer<typeof uploadedFile>;

export const sectionOne = z.object({
  type: choose(APPLICANT_TYPES, "Choose how you're applying."),
  fullName: required("Enter your full name."),
  email: z.string().trim().email("Enter an email address like name@example.com."),
  phone: z
    .string()
    .trim()
    .min(1, "Enter a phone number we can reach on WhatsApp.")
    .max(40)
    .refine(isPhoneValid, "Enter a valid phone number, including the country code."),
  company: required("Enter your company or brand name."),
  country: required("Enter your country."),
  website: required("Enter a website or social media handle."),
});

export const sponsorSection = z
  .object({
    title: required("Enter your title."),
    level: choose(SPONSOR_LEVELS, "Choose a sponsorship level."),
    inKind: z.string().trim().optional(),
    goals: required("Tell us what you'd like your brand to get from the festival."),
    logo: z.array(uploadedFile).length(1, "Upload your logo."),
  })
  .refine((v) => v.level !== "studio" || !!v.inKind?.trim(), {
    path: ["inKind"],
    message: "Describe the goods or services and their estimated value.",
    ...always,
  });

export const designerSection = z
  .object({
    designerNames: required("Enter the designer name or names."),
    yearsInBusiness: required("Enter how many years you've been in business."),
    aesthetic: required("Describe your brand and aesthetic."),
    participation: choose(PARTICIPATION, "Choose runway, showcase, or both."),
    looks: z.coerce
      .number({ error: "Enter the number of looks." })
      .int("Enter a whole number.")
      .min(1, "Enter at least 1 look."),
    lookbook: z.array(uploadedFile).max(1),
    lookbookLink: z.string().trim().optional(),
    previousShows: z.string().trim().optional(),
    marketplace: choose(MARKETPLACE, "Choose an answer."),
  })
  .refine((v) => !!v.lookbook?.length || !!v.lookbookLink?.trim(), {
    path: ["lookbook"],
    message: "Upload a lookbook or paste a link to one.",
    ...always,
  });

export const vendorSection = z
  .object({
    category: choose(CATEGORIES, "Choose a product category."),
    categoryOther: z.string().trim().optional(),
    products: required("Describe your products."),
    days: z.array(z.enum(values(FESTIVAL_DAYS))).min(1, "Choose at least one day."),
    booth: z.array(z.enum(values(BOOTH_NEEDS))),
    boothOther: z.string().trim().optional(),
    photos: z
      .array(uploadedFile)
      .min(2, "Upload at least 2 product photos.")
      .max(3, "Upload no more than 3 product photos."),
    marketplace: choose(MARKETPLACE, "Choose an answer."),
  })
  .refine((v) => v.category !== "other" || !!v.categoryOther?.trim(), {
    path: ["categoryOther"],
    message: "Tell us your product category.",
    ...always,
  })
  .refine((v) => !v.booth?.includes("other") || !!v.boothOther?.trim(), {
    path: ["boothOther"],
    message: "Tell us what else your booth needs.",
    ...always,
  });

export const sectionThree = z.object({
  heardFrom: required("Tell us how you heard about the festival."),
  accurate: z.literal(true, { error: "Confirm the information is accurate." }),
  consent: z.literal(true, { error: "Agree to this to submit your application." }),
});

export const sectionTwo = {
  sponsor: sponsorSection,
  designer: designerSection,
  vendor: vendorSection,
} as const;

export type ApplicantType = z.infer<typeof sectionOne>["type"];
export type SectionOne = z.infer<typeof sectionOne>;
export type SponsorSection = z.infer<typeof sponsorSection>;
export type DesignerSection = z.infer<typeof designerSection>;
export type VendorSection = z.infer<typeof vendorSection>;
export type SectionThree = z.infer<typeof sectionThree>;

export type Application = SectionOne & {
  details: SponsorSection | DesignerSection | VendorSection;
} & SectionThree;

/** Flatten zod issues into { "field": "message" }, first message wins. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

export const labelFor = (opts: readonly { value: string; label: string }[], v: string) =>
  opts.find((o) => o.value === v)?.label ?? v;
