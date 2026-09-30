"use client";

import { LuCheck as Check } from "react-icons/lu";
import { clsx } from "@/lib/clsx";

type Option = { value: string; label: string };

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="mt-2 text-[1rem] italic text-[#9b1c2e]">
      {message}
    </p>
  );
}

export const labelClass = "block font-serif text-[1.1875rem] font-medium leading-snug text-ink";
export const hintClass = "mt-1 block text-[1rem] leading-snug text-mute";
// The shared field skin without width or margin, so the phone row can reuse it for both controls.
export const inputBase =
  "block border border-gold/45 bg-white/60 px-4 py-3 text-[1.125rem] text-ink placeholder:text-mute/60 transition-colors focus:border-purple focus:bg-white focus:outline-none aria-[invalid=true]:border-[#9b1c2e]";
const inputClass = `mt-2.5 w-full ${inputBase}`;

export function TextField({
  id,
  label,
  hint,
  value,
  onChange,
  error,
  type = "text",
  multiline = false,
  optional = false,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  multiline?: boolean;
  optional?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const described = clsx(hint && `${id}-hint`, error && `${id}-error`) || undefined;
  const common = {
    id,
    name: id,
    value,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": described,
    "aria-required": optional ? undefined : true,
    className: inputClass,
  };
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {hint ? (
        <span id={`${id}-hint`} className={hintClass}>
          {hint}
        </span>
      ) : (
        // Reserve one hint line so inputs sharing a row stay aligned.
        <span aria-hidden="true" className={hintClass}>
          {"\u00A0"}
        </span>
      )}
      {multiline ? (
        <textarea {...common} rows={4} onChange={(e) => onChange(e.target.value)} className={clsx(inputClass, "min-h-32 resize-y")} />
      ) : (
        <input
          {...common}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <FieldError id={id} message={error} />
    </div>
  );
}

function ChoiceMark({ kind, checked }: { kind: "radio" | "checkbox"; checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "grid size-5 shrink-0 place-items-center border transition-colors",
        kind === "radio" ? "rotate-45 scale-[0.8]" : "",
        checked ? "border-purple bg-purple text-white" : "border-gold/70 bg-white/60",
      )}
    >
      {checked && (kind === "checkbox" ? <Check size={13} strokeWidth={2} aria-hidden="true" /> : <span className="size-1.5 bg-gold" />)}
    </span>
  );
}

function ChoiceGroup({
  id,
  legend,
  hint,
  options,
  error,
  kind,
  isChecked,
  onToggle,
  columns = 1,
}: {
  id: string;
  legend: React.ReactNode;
  hint?: React.ReactNode;
  options: readonly Option[];
  error?: string;
  kind: "radio" | "checkbox";
  isChecked: (v: string) => boolean;
  onToggle: (v: string) => void;
  columns?: 1 | 2 | 3 | 4;
}) {
  return (
    <fieldset id={id} tabIndex={-1} aria-describedby={error ? `${id}-error` : undefined} className="focus:outline-none">
      <legend className={labelClass}>{legend}</legend>
      {hint && <span className={hintClass}>{hint}</span>}
      <div
        className={clsx(
          "mt-3 grid gap-2",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-3",
          columns === 4 && "grid-cols-2 sm:grid-cols-4",
        )}
      >
        {options.map((o) => {
          const checked = isChecked(o.value);
          return (
            <label
              key={o.value}
              className={clsx(
                "flex cursor-pointer items-center gap-3 border px-4 py-3 text-[1.0625rem] leading-snug transition-colors has-focus-visible:outline has-focus-visible:outline-offset-2 has-focus-visible:outline-gold",
                checked ? "border-purple bg-purple/6" : "border-gold/40 bg-white/40 hover:border-gold",
              )}
            >
              <input
                type={kind}
                name={id}
                value={o.value}
                checked={checked}
                onChange={() => onToggle(o.value)}
                className="sr-only"
              />
              <ChoiceMark kind={kind} checked={checked} />
              {o.label}
            </label>
          );
        })}
      </div>
      <FieldError id={id} message={error} />
    </fieldset>
  );
}

export function RadioGroup(props: {
  id: string;
  legend: React.ReactNode;
  hint?: React.ReactNode;
  options: readonly Option[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  columns?: 1 | 2 | 3 | 4;
}) {
  return (
    <ChoiceGroup {...props} kind="radio" isChecked={(v) => v === props.value} onToggle={props.onChange} />
  );
}

export function CheckboxGroup(props: {
  id: string;
  legend: React.ReactNode;
  hint?: React.ReactNode;
  options: readonly Option[];
  value: string[];
  onChange: (v: string[]) => void;
  error?: string;
  columns?: 1 | 2 | 3 | 4;
}) {
  const toggle = (v: string) =>
    props.onChange(props.value.includes(v) ? props.value.filter((x) => x !== v) : [...props.value, v]);
  return <ChoiceGroup {...props} kind="checkbox" isChecked={(v) => props.value.includes(v)} onToggle={toggle} />;
}

export function Checkbox({
  id,
  label,
  checked,
  onChange,
  error,
}: {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3.5 text-[1.0625rem] leading-snug">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer sr-only"
        />
        <span className="mt-0.5 peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
          <ChoiceMark kind="checkbox" checked={checked} />
        </span>
        <span>{label}</span>
      </label>
      <FieldError id={id} message={error} />
    </div>
  );
}
