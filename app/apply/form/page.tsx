import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationForm } from "@/components/form/ApplicationForm";
import { DiamondRule } from "@/components/DiamondRule";
import { buttonClass } from "@/components/Button";
import { applicationsOpen, CONTACT_EMAIL } from "@/lib/config";
import { EVENT } from "@/lib/content";
import type { ApplicantType } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Application",
  description: `Apply to the ${EVENT.name} as a designer, vendor, or sponsor. Applications close ${EVENT.deadline}.`,
};

const TYPES: ApplicantType[] = ["sponsor", "designer", "vendor"];

export default async function ApplicationPage({ searchParams }: PageProps<"/apply/form">) {
  const { type } = await searchParams;
  const initialType = TYPES.find((t) => t === type);
  const open = applicationsOpen();

  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[760px] px-5 pb-12 pt-14 sm:px-8 sm:pt-16">
          <p className="caps-sm text-gold">KIFF 2027</p>
          <h1 className="mt-3 font-serif text-[clamp(3rem,8vw,4.75rem)] font-light leading-[0.95]">Application</h1>
          <DiamondRule className="mt-6 w-56" lineClassName="bg-gold/70" />
          <p className="mt-6 max-w-[52ch] text-[1.125rem] leading-relaxed text-white/80">
            {open
              ? `Tell us about you and your work. It takes about 10 minutes. Applications close ${EVENT.deadline}.`
              : `Applications closed on ${EVENT.deadline}.`}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[760px] px-5 pb-24 pt-12 sm:px-8 sm:pt-14">
        {open ? (
          <ApplicationForm key={initialType ?? "none"} initialType={initialType} />
        ) : (
          <div className="border border-gold/40 px-6 py-12 text-center sm:px-12">
            <h2 className="font-serif text-[2.25rem] font-light leading-tight">Applications are closed</h2>
            <p className="prose-serif mx-auto mt-4 text-mute">
              The application deadline for {EVENT.name} was {EVENT.deadline}. For partnership or press enquiries, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline decoration-gold underline-offset-4">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
            <Link href="/" className={buttonClass("purple", "mt-8")}>
              Back to home
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
