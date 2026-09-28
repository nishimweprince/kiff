import {
  APPLICANT_TYPES,
  BOOTH_NEEDS,
  CATEGORIES,
  FESTIVAL_DAYS,
  MARKETPLACE,
  PARTICIPATION,
  QUESTIONS as Q,
  SPONSOR_LEVELS,
  labelFor,
  type ApplicantType,
  type DesignerSection,
  type SectionOne,
  type SectionThree,
  type SponsorSection,
  type UploadedFile,
  type VendorSection,
} from "./schema";

export type Answer = string | UploadedFile[];
export type Row = { question: string; answer: Answer };
export type Section = { title: string; rows: Row[] };

const list = (opts: readonly { value: string; label: string }[], vs: string[]) =>
  vs.map((v) => labelFor(opts, v)).join(", ");

/** Turn a validated application into titled question/answer sections for the notification email. */
export function toSections(
  s1: SectionOne,
  details: SponsorSection | DesignerSection | VendorSection,
  s3: SectionThree,
): Section[] {
  const type: ApplicantType = s1.type;
  const typeLabel = labelFor(APPLICANT_TYPES, type);

  const first: Section = {
    title: "All applicants",
    rows: [
      { question: Q.type, answer: typeLabel },
      { question: Q.fullName, answer: s1.fullName },
      { question: Q.email, answer: s1.email },
      { question: Q.phone, answer: s1.phone },
      { question: Q.company, answer: s1.company },
      { question: Q.country, answer: s1.country },
      { question: Q.website, answer: s1.website },
    ],
  };

  let rows: Row[];
  if (type === "sponsor") {
    const d = details as SponsorSection;
    rows = [
      { question: Q.title, answer: d.title },
      { question: Q.level, answer: labelFor(SPONSOR_LEVELS, d.level) },
      ...(d.level === "studio" ? [{ question: Q.inKind, answer: d.inKind ?? "" }] : []),
      { question: Q.goals, answer: d.goals },
      { question: "Logo", answer: d.logo },
    ];
  } else if (type === "designer") {
    const d = details as DesignerSection;
    rows = [
      { question: Q.designerNames, answer: d.designerNames },
      { question: Q.yearsInBusiness, answer: d.yearsInBusiness },
      { question: Q.aesthetic, answer: d.aesthetic },
      { question: Q.participation, answer: labelFor(PARTICIPATION, d.participation) },
      { question: Q.looks, answer: String(d.looks) },
      ...(d.lookbook.length ? [{ question: "Lookbook (upload)", answer: d.lookbook }] : []),
      ...(d.lookbookLink ? [{ question: "Lookbook (link)", answer: d.lookbookLink }] : []),
      { question: "Previous shows or features", answer: d.previousShows || "None given" },
      { question: Q.marketplace, answer: labelFor(MARKETPLACE, d.marketplace) },
    ];
  } else {
    const d = details as VendorSection;
    rows = [
      {
        question: Q.category,
        answer: d.category === "other" ? `Other: ${d.categoryOther}` : labelFor(CATEGORIES, d.category),
      },
      { question: Q.products, answer: d.products },
      { question: "Days attending", answer: list(FESTIVAL_DAYS, d.days) },
      {
        question: Q.booth,
        answer:
          [list(BOOTH_NEEDS, d.booth.filter((b) => b !== "other")), d.booth.includes("other") ? `Other: ${d.boothOther}` : ""]
            .filter(Boolean)
            .join(", ") || "None",
      },
      { question: "Product photos", answer: d.photos },
      { question: Q.marketplace, answer: labelFor(MARKETPLACE, d.marketplace) },
    ];
  }

  return [
    first,
    { title: `${typeLabel} details`, rows },
    {
      title: "Final questions",
      rows: [
        { question: Q.heardFrom, answer: s3.heardFrom },
        { question: "Confirmed information is accurate", answer: s3.accurate ? "Yes" : "No" },
        { question: "Agreed to storage and use of materials", answer: s3.consent ? "Yes" : "No" },
      ],
    },
  ];
}
