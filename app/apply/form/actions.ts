"use server";

import { Resend } from "resend";
import { applicationsOpen, CONTACT_EMAIL } from "@/lib/config";
import { CONFIRMATION_EMAIL } from "@/lib/content";
import { toSections } from "@/lib/format";
import { APPLICANT_TYPES, fieldErrors, labelFor, sectionOne, sectionThree, sectionTwo } from "@/lib/schema";
import { SubmissionEmail } from "@/emails/SubmissionEmail";
import { ConfirmationEmail } from "@/emails/ConfirmationEmail";

export type SubmitResult =
  | { ok: true }
  | { ok: false; message: string; errors?: Record<string, string>; step?: number };

type Payload = { s1: unknown; details: unknown; s3: unknown; nickname?: string };

export async function submitApplication(payload: Payload): Promise<SubmitResult> {
  // Honeypot: people never see this field, bots fill it in. Pretend it worked.
  if (payload?.nickname) return { ok: true };

  if (!applicationsOpen()) {
    return { ok: false, message: "Applications closed on February 1, 2027." };
  }

  const one = sectionOne.safeParse(payload?.s1);
  if (!one.success) {
    return { ok: false, message: "Check the highlighted answers.", errors: fieldErrors(one.error), step: 0 };
  }
  const two = sectionTwo[one.data.type].safeParse(payload.details);
  if (!two.success) {
    return { ok: false, message: "Check the highlighted answers.", errors: fieldErrors(two.error), step: 1 };
  }
  const three = sectionThree.safeParse(payload.s3);
  if (!three.success) {
    return { ok: false, message: "Check the highlighted answers.", errors: fieldErrors(three.error), step: 2 };
  }

  const { RESEND_API_KEY, APPLICATION_TO_EMAIL, RESEND_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !APPLICATION_TO_EMAIL || !RESEND_FROM_EMAIL) {
    console.error("Application email is not configured: set RESEND_API_KEY, APPLICATION_TO_EMAIL and RESEND_FROM_EMAIL.");
    return {
      ok: false,
      message: `We couldn't send your application. Email ${CONTACT_EMAIL} and we'll help you apply.`,
    };
  }

  const resend = new Resend(RESEND_API_KEY);
  const s1 = one.data;
  const typeLabel = labelFor(APPLICANT_TYPES, s1.type);
  const heading = `${typeLabel}: ${s1.company}`;
  const submittedAt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Kigali",
  }).format(new Date());

  const notification = await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: APPLICATION_TO_EMAIL.split(",").map((s) => s.trim()),
    replyTo: s1.email,
    subject: `New KIFF application from ${s1.fullName} (${typeLabel})`,
    react: SubmissionEmail({ heading, sections: toSections(s1, two.data, three.data), submittedAt }),
  });

  if (notification.error) {
    console.error("Resend notification failed", notification.error);
    return {
      ok: false,
      message: `We couldn't send your application. Try again in a few minutes, or email ${CONTACT_EMAIL}.`,
    };
  }

  // The application is in; a failed confirmation shouldn't make the applicant resubmit.
  const confirmation = await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: s1.email,
    replyTo: CONTACT_EMAIL,
    subject: CONFIRMATION_EMAIL.subject,
    text: CONFIRMATION_EMAIL.body,
    react: ConfirmationEmail(),
  });
  if (confirmation.error) console.error("Resend confirmation failed", confirmation.error);

  return { ok: true };
}
