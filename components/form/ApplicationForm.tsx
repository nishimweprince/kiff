"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { LuArrowLeft as ArrowLeft, LuLoaderCircle as LoaderCircle } from "react-icons/lu";
import { PiDressLight, PiHandshakeLight, PiShoppingBagLight } from "react-icons/pi";
import { submitApplication } from "@/app/apply/form/actions";
import { With1819 } from "@/components/Brand1819";
import { Arrow, buttonClass } from "@/components/Button";
import { CONTACT_EMAIL } from "@/lib/config";
import { MARKETPLACE_EXPLAINER } from "@/lib/content";
import { clsx } from "@/lib/clsx";
import {
  APPLICANT_TYPES,
  BOOTH_NEEDS,
  CATEGORIES,
  FESTIVAL_DAYS,
  MARKETPLACE,
  PARTICIPATION,
  QUESTIONS as Q,
  SPONSOR_LEVELS,
  fieldErrors,
  labelFor,
  sectionOne,
  sectionThree,
  sectionTwo,
  type ApplicantType,
  type UploadedFile,
} from "@/lib/schema";
import { Checkbox, CheckboxGroup, FieldError, RadioGroup, TextField } from "./fields";
import { FileUpload } from "./FileUpload";
import { PhoneField } from "./PhoneInput";

type S1 = { type: ApplicantType | ""; fullName: string; email: string; phone: string; company: string; country: string; website: string };
type Sponsor = { title: string; level: string; inKind: string; goals: string; logo: UploadedFile[] };
type Designer = {
  designerNames: string;
  yearsInBusiness: string;
  aesthetic: string;
  participation: string;
  looks: string;
  lookbook: UploadedFile[];
  lookbookLink: string;
  previousShows: string;
  marketplace: string;
};
type Vendor = {
  category: string;
  categoryOther: string;
  products: string;
  days: string[];
  booth: string[];
  boothOther: string;
  photos: UploadedFile[];
  marketplace: string;
};
type S2 = { sponsor: Sponsor; designer: Designer; vendor: Vendor };
type S3 = { heardFrom: string; accurate: boolean; consent: boolean };

const initialS2: S2 = {
  sponsor: { title: "", level: "", inKind: "", goals: "", logo: [] },
  designer: {
    designerNames: "",
    yearsInBusiness: "",
    aesthetic: "",
    participation: "",
    looks: "",
    lookbook: [],
    lookbookLink: "",
    previousShows: "",
    marketplace: "",
  },
  vendor: { category: "", categoryOther: "", products: "", days: [], booth: [], boothOther: "", photos: [], marketplace: "" },
};

const TYPE_ICONS = { designer: PiDressLight, vendor: PiShoppingBagLight, sponsor: PiHandshakeLight } as const;

const marketplaceLegend = <With1819 text={Q.marketplace} />;
const marketplaceHint = <With1819 text={MARKETPLACE_EXPLAINER} />;

export function ApplicationForm({ initialType }: { initialType?: ApplicantType }) {
  const [step, setStep] = useState(0);
  const [s1, setS1] = useState<S1>({ type: initialType ?? "", fullName: "", email: "", phone: "", company: "", country: "", website: "" });
  const [s2, setS2] = useState<S2>(initialS2);
  const [s3, setS3] = useState<S3>({ heardFrom: "", accurate: false, consent: false });
  const [nickname, setNickname] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>();
  const [busy, setBusy] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);

  const type = s1.type;
  const typeLabel = type ? labelFor(APPLICANT_TYPES, type) : "";
  const uploading = Object.values(busy).some(Boolean);
  const steps = ["About you", type ? `${typeLabel} details` : "Your details", "Final questions"];

  // Move focus to the new step's heading so keyboard and screen reader users land in the right place.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, done]);

  const onBusy = useCallback((id: string, b: boolean) => setBusy((prev) => (prev[id] === b ? prev : { ...prev, [id]: b })), []);

  function clearError(key: string) {
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  const set1 = <K extends keyof S1>(k: K) => (v: S1[K]) => {
    setS1((p) => ({ ...p, [k]: v }));
    clearError(k);
  };
  const set3 = <K extends keyof S3>(k: K) => (v: S3[K]) => {
    setS3((p) => ({ ...p, [k]: v }));
    clearError(k);
  };
  function set2<T extends ApplicantType, K extends keyof S2[T]>(t: T, k: K) {
    return (v: S2[T][K]) => {
      setS2((p) => ({ ...p, [t]: { ...p[t], [k]: v } }));
      clearError(k as string);
    };
  }
  function setFiles<T extends ApplicantType>(t: T, k: keyof S2[T]) {
    return (update: (prev: UploadedFile[]) => UploadedFile[]) => {
      setS2((p) => ({ ...p, [t]: { ...p[t], [k]: update(p[t][k] as UploadedFile[]) } }));
      clearError(k as string);
    };
  }

  function showErrors(errs: Record<string, string>) {
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) requestAnimationFrame(() => document.getElementById(first)?.focus());
  }

  function validate(which: number) {
    const result =
      which === 0 ? sectionOne.safeParse(s1) : which === 1 && type ? sectionTwo[type].safeParse(s2[type]) : sectionThree.safeParse(s3);
    if (!result.success) {
      showErrors(fieldErrors(result.error));
      return false;
    }
    setErrors({});
    return true;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(undefined);
    if (uploading) {
      setFormError("Wait for your files to finish uploading.");
      return;
    }
    if (!validate(step)) return;
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    if (!type) return;
    startTransition(async () => {
      try {
        const result = await submitApplication({ s1, details: s2[type], s3, nickname });
        if (result.ok) {
          setDone(true);
          return;
        }
        setFormError(result.message);
        if (result.step !== undefined) setStep(result.step);
        if (result.errors) showErrors(result.errors);
      } catch {
        setFormError(`We couldn't send your application. Check your connection and try again, or email ${CONTACT_EMAIL}.`);
      }
    });
  }

  if (done) {
    return (
      <div className="border border-gold/40 bg-white/40 px-6 py-14 text-center sm:px-12">
        <h2 ref={headingRef} tabIndex={-1} className="font-serif text-[2.5rem] font-light leading-tight focus:outline-none">
          Application submitted
        </h2>
        <p className="prose-serif mx-auto mt-5 text-mute">
          We sent a confirmation to <span className="text-ink">{s1.email}</span>. Our team will review your application
          and follow up.
        </p>
        <Link href="/" className={buttonClass("purple", "mt-9")}>
          Back to home
        </Link>
      </div>
    );
  }

  const errorFor = (k: string) => errors[k];

  return (
    <form onSubmit={onSubmit} noValidate>
      <ol className="grid grid-cols-3 gap-2 sm:gap-3" aria-label="Application progress">
        {steps.map((label, i) => (
          <li key={i} aria-current={i === step ? "step" : undefined}>
            <span className={clsx("block h-0.5 transition-colors duration-500", i <= step ? "bg-purple" : "bg-gold/30")} />
            <span className={clsx("caps-sm mt-3 block text-[0.625rem] sm:text-[0.6875rem]", i === step ? "text-ink" : "text-mute")}>
              <span className="text-gold-deep">{i + 1}</span>
              <span className="hidden sm:inline">&ensp;{label}</span>
            </span>
          </li>
        ))}
      </ol>

      <h2 ref={headingRef} tabIndex={-1} className="mt-10 scroll-mt-28 font-serif text-[2.25rem] font-light leading-tight focus:outline-none sm:text-[2.75rem]">
        {steps[step]}
      </h2>
      <p className="mt-1 text-[1.0625rem] text-mute">
        Step {step + 1} of 3. All questions are required unless marked optional.
      </p>

      <div className="mt-9 space-y-8">
        {step === 0 && (
          <>
            <fieldset id="type" tabIndex={-1} aria-describedby={errors.type ? "type-error" : undefined} className="focus:outline-none">
              <legend className="font-serif text-[1.1875rem] font-medium">
                {Q.type}
                {!type && <span className="font-normal italic text-mute"> (choose one to continue)</span>}
              </legend>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                {APPLICANT_TYPES.map((o) => {
                  const Icon = TYPE_ICONS[o.value];
                  const checked = type === o.value;
                  return (
                    <label
                      key={o.value}
                      className={clsx(
                        "flex cursor-pointer flex-col items-center gap-3 border px-2 pb-5 pt-6 text-center transition-colors has-focus-visible:outline has-focus-visible:outline-offset-2 has-focus-visible:outline-gold",
                        checked ? "border-purple bg-purple text-white" : "border-gold/40 bg-white/40 hover:border-gold",
                      )}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={o.value}
                        checked={checked}
                        onChange={() => {
                          set1("type")(o.value);
                          setErrors({});
                        }}
                        className="sr-only"
                      />
                      <Icon size={34} className={checked ? "text-gold" : "text-gold-deep"} aria-hidden="true" />
                      <span className="font-serif text-[1.25rem] leading-none">{o.label}</span>
                    </label>
                  );
                })}
              </div>
              <FieldError id="type" message={errors.type} />
            </fieldset>
            <TextField id="fullName" label={Q.fullName} value={s1.fullName} onChange={set1("fullName")} error={errorFor("fullName")} autoComplete="name" />
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-5">
              <TextField id="email" label={Q.email} type="email" value={s1.email} onChange={set1("email")} error={errorFor("email")} autoComplete="email" />
              <PhoneField id="phone" label={Q.phone} hint="Include the country code" value={s1.phone} onChange={set1("phone")} error={errorFor("phone")} />
            </div>
            <TextField id="company" label={Q.company} value={s1.company} onChange={set1("company")} error={errorFor("company")} autoComplete="organization" />
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-5">
              <TextField id="country" label={Q.country} value={s1.country} onChange={set1("country")} error={errorFor("country")} autoComplete="country-name" />
              <TextField id="website" label={Q.website} hint="A URL or @handle" value={s1.website} onChange={set1("website")} error={errorFor("website")} />
            </div>
          </>
        )}

        {step === 1 && type === "sponsor" && (
          <>
            <TextField id="title" label={Q.title} value={s2.sponsor.title} onChange={set2("sponsor", "title")} error={errorFor("title")} autoComplete="organization-title" />
            <RadioGroup id="level" legend={Q.level} options={SPONSOR_LEVELS} columns={2} value={s2.sponsor.level} onChange={set2("sponsor", "level")} error={errorFor("level")} />
            {s2.sponsor.level === "studio" && (
              <TextField id="inKind" label={Q.inKind} multiline value={s2.sponsor.inKind} onChange={set2("sponsor", "inKind")} error={errorFor("inKind")} />
            )}
            <TextField id="goals" label={Q.goals} multiline value={s2.sponsor.goals} onChange={set2("sponsor", "goals")} error={errorFor("goals")} />
            <FileUpload
              id="logo"
              label={Q.logo}
              hint="PNG, SVG, or PDF up to 20 MB. A transparent background works best."
              applicantType="sponsor"
              accept="images-pdf"
              max={1}
              value={s2.sponsor.logo}
              onChange={setFiles("sponsor", "logo")}
              onBusy={onBusy}
              error={errorFor("logo")}
            />
          </>
        )}

        {step === 1 && type === "designer" && (
          <>
            <TextField id="designerNames" label={Q.designerNames} value={s2.designer.designerNames} onChange={set2("designer", "designerNames")} error={errorFor("designerNames")} />
            <TextField id="yearsInBusiness" label={Q.yearsInBusiness} inputMode="numeric" value={s2.designer.yearsInBusiness} onChange={set2("designer", "yearsInBusiness")} error={errorFor("yearsInBusiness")} />
            <TextField id="aesthetic" label={Q.aesthetic} multiline value={s2.designer.aesthetic} onChange={set2("designer", "aesthetic")} error={errorFor("aesthetic")} />
            <RadioGroup id="participation" legend={Q.participation} options={PARTICIPATION} columns={3} value={s2.designer.participation} onChange={set2("designer", "participation")} error={errorFor("participation")} />
            <TextField id="looks" label={Q.looks} type="number" inputMode="numeric" value={s2.designer.looks} onChange={set2("designer", "looks")} error={errorFor("looks")} />
            <FileUpload
              id="lookbook"
              label={Q.lookbook}
              hint="PDF or image up to 20 MB, or paste a link below."
              applicantType="designer"
              accept="images-pdf"
              max={1}
              value={s2.designer.lookbook}
              onChange={setFiles("designer", "lookbook")}
              onBusy={onBusy}
              error={errorFor("lookbook")}
            />
            <TextField
              id="lookbookLink"
              label="Lookbook link"
              hint="Google Drive, Dropbox, or website"
              type="url"
              optional
              value={s2.designer.lookbookLink}
              onChange={(v) => {
                set2("designer", "lookbookLink")(v);
                clearError("lookbook");
              }}
              error={errorFor("lookbookLink")}
            />
            <TextField id="previousShows" label={Q.previousShows} multiline optional value={s2.designer.previousShows} onChange={set2("designer", "previousShows")} />
            <RadioGroup id="marketplace" legend={marketplaceLegend} hint={marketplaceHint} options={MARKETPLACE} columns={3} value={s2.designer.marketplace} onChange={set2("designer", "marketplace")} error={errorFor("marketplace")} />
          </>
        )}

        {step === 1 && type === "vendor" && (
          <>
            <RadioGroup id="category" legend={Q.category} options={CATEGORIES} columns={3} value={s2.vendor.category} onChange={set2("vendor", "category")} error={errorFor("category")} />
            {s2.vendor.category === "other" && (
              <TextField id="categoryOther" label="What do you sell?" value={s2.vendor.categoryOther} onChange={set2("vendor", "categoryOther")} error={errorFor("categoryOther")} />
            )}
            <TextField id="products" label={Q.products} multiline value={s2.vendor.products} onChange={set2("vendor", "products")} error={errorFor("products")} />
            <CheckboxGroup id="days" legend={Q.days} options={FESTIVAL_DAYS} columns={4} value={s2.vendor.days} onChange={set2("vendor", "days")} error={errorFor("days")} />
            <CheckboxGroup id="booth" legend={Q.booth} hint="Choose any that apply." options={BOOTH_NEEDS} columns={4} value={s2.vendor.booth} onChange={set2("vendor", "booth")} error={errorFor("booth")} />
            {s2.vendor.booth.includes("other") && (
              <TextField id="boothOther" label="What else does your booth need?" value={s2.vendor.boothOther} onChange={set2("vendor", "boothOther")} error={errorFor("boothOther")} />
            )}
            <FileUpload
              id="photos"
              label={Q.photos}
              hint="JPG, PNG, or WebP up to 20 MB each."
              applicantType="vendor"
              accept="images"
              max={3}
              value={s2.vendor.photos}
              onChange={setFiles("vendor", "photos")}
              onBusy={onBusy}
              error={errorFor("photos")}
            />
            <RadioGroup id="marketplace" legend={marketplaceLegend} hint={marketplaceHint} options={MARKETPLACE} columns={3} value={s2.vendor.marketplace} onChange={set2("vendor", "marketplace")} error={errorFor("marketplace")} />
          </>
        )}

        {step === 2 && (
          <>
            <TextField id="heardFrom" label={Q.heardFrom} value={s3.heardFrom} onChange={set3("heardFrom")} error={errorFor("heardFrom")} />
            <div className="space-y-5 border-t border-gold/30 pt-8">
              <Checkbox id="accurate" label={Q.accurate} checked={s3.accurate} onChange={set3("accurate")} error={errorFor("accurate")} />
              <Checkbox id="consent" label={Q.consent} checked={s3.consent} onChange={set3("consent")} error={errorFor("consent")} />
            </div>
          </>
        )}

        {/* Honeypot, hidden from people and assistive tech. Inline styles keep it hidden even if the stylesheet
            fails, and the neutral label and new-password hint stop browser autofill from filling it for real
            applicants, whose submission would otherwise be silently dropped as spam. */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
        >
          <label>
            Leave this field empty
            <input
              type="text"
              name="kiff_check"
              tabIndex={-1}
              autoComplete="new-password"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </label>
        </div>
      </div>

      {formError && (
        <p role="alert" className="mt-8 border-l-2 border-[#9b1c2e] bg-white/50 px-4 py-3 text-[1.0625rem] text-[#9b1c2e]">
          {formError}
        </p>
      )}

      <div className="mt-10 flex flex-col-reverse items-stretch gap-4 border-t border-gold/30 pt-8 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setErrors({});
              setFormError(undefined);
              setStep(step - 1);
            }}
            className="caps-sm inline-flex cursor-pointer items-center justify-center gap-2 py-3 text-ink hover:text-gold-deep"
          >
            <ArrowLeft size={16} strokeWidth={1.25} aria-hidden="true" />
            Back
          </button>
        ) : (
          <span />
        )}
        <button type="submit" disabled={pending || uploading} className={buttonClass("purple", "disabled:cursor-wait disabled:opacity-70")}>
          {pending ? (
            <>
              <LoaderCircle size={18} strokeWidth={1.25} className="animate-spin" aria-hidden="true" />
              Submitting application…
            </>
          ) : uploading ? (
            "Uploading files…"
          ) : step < 2 ? (
            <>
              Continue
              <Arrow />
            </>
          ) : (
            "Submit application"
          )}
        </button>
      </div>
    </form>
  );
}
