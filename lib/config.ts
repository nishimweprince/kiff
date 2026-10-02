export const SITE_URL = "https://kigalifashionfestival.com";
export const BRAND_URL = "https://1819twenty.com";
export const CONTACT_EMAIL = "hello@kigalifashionfestival.com";

export const SOCIAL = {
  instagram: "https://www.instagram.com/kiffkigali/",
  facebook: "https://www.facebook.com/share/1LSCgown8G/",
  tiktok: "https://www.tiktok.com/@kigali.intl.fashio",
} as const;

export const HASHTAGS = ["#KigaliFashionFestival", "#KIFF2027", "#1819twenty"] as const;

/** End of Feb 1, 2027 in Kigali (CAT, UTC+2). Override with APPLICATIONS_CLOSE_AT for testing. */
export function applicationsCloseAt(): Date {
  return new Date(process.env.APPLICATIONS_CLOSE_AT || "2027-02-01T23:59:59+02:00");
}

export function applicationsOpen(now = new Date()): boolean {
  return now.getTime() <= applicationsCloseAt().getTime();
}
