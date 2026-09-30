"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  LuFileText as FileText,
  LuImage as ImageIcon,
  LuLoaderCircle as LoaderCircle,
  LuUpload as Upload,
  LuX as X,
} from "react-icons/lu";
import type { UploadedFile } from "@/lib/schema";
import { FieldError } from "./fields";
import { clsx } from "@/lib/clsx";

const MAX_BYTES = 20 * 1024 * 1024;

type Pending = { key: string; name: string; progress: number };
type Signed = { signature: string; timestamp: number; folder: string; apiKey: string; cloudName: string };

async function sign(applicantType: string): Promise<Signed> {
  const res = await fetch("/api/cloudinary-sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: applicantType }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error ?? "Upload failed. Try again.");
  return json as Signed;
}

function uploadToCloudinary(file: File, s: Signed, onProgress: (p: number) => void) {
  return new Promise<UploadedFile>((resolve, reject) => {
    const data = new FormData();
    data.append("file", file);
    data.append("api_key", s.apiKey);
    data.append("timestamp", String(s.timestamp));
    data.append("signature", s.signature);
    data.append("folder", s.folder);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${s.cloudName}/auto/upload`);
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(e.loaded / e.total);
    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && json.secure_url) {
          resolve({ url: json.secure_url, name: file.name });
        } else {
          reject(new Error(json.error?.message ?? "Upload failed. Try again."));
        }
      } catch {
        reject(new Error("Upload failed. Try again."));
      }
    };
    xhr.onerror = () => reject(new Error("Upload failed. Check your connection and try again."));
    xhr.send(data);
  });
}

export function FileUpload({
  id,
  label,
  hint,
  applicantType,
  accept,
  max,
  value,
  onChange,
  error,
  onBusy,
}: {
  id: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  applicantType: string;
  accept: "images" | "images-pdf";
  max: number;
  value: UploadedFile[];
  onChange: (update: (prev: UploadedFile[]) => UploadedFile[]) => void;
  error?: string;
  onBusy?: (id: string, busy: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hintId = useId();
  const [pending, setPending] = useState<Pending[]>([]);
  const [localError, setLocalError] = useState<string>();
  const [dragging, setDragging] = useState(false);

  const busy = pending.length > 0;
  useEffect(() => onBusy?.(id, busy), [id, busy, onBusy]);

  const acceptAttr = accept === "images" ? "image/*" : "image/*,application/pdf";
  const remaining = max - value.length - pending.length;

  async function handleFiles(list: FileList | null) {
    if (!list?.length) return;
    setLocalError(undefined);
    const files = Array.from(list).slice(0, Math.max(remaining, 0));
    if (list.length > remaining) {
      setLocalError(max === 1 ? "You can upload 1 file." : `You can upload up to ${max} files.`);
    }
    for (const file of files) {
      const okType = file.type.startsWith("image/") || (accept === "images-pdf" && file.type === "application/pdf");
      if (!okType) {
        setLocalError(accept === "images" ? `${file.name} isn't an image. Choose a JPG, PNG, or WebP.` : `${file.name} isn't an image or PDF.`);
        continue;
      }
      if (file.size > MAX_BYTES) {
        setLocalError(`${file.name} is larger than 20 MB. Choose a smaller file.`);
        continue;
      }
      const key = `${file.name}-${file.size}-${Math.random()}`;
      setPending((p) => [...p, { key, name: file.name, progress: 0 }]);
      try {
        const signed = await sign(applicantType);
        const uploaded = await uploadToCloudinary(file, signed, (progress) =>
          setPending((p) => p.map((x) => (x.key === key ? { ...x, progress } : x))),
        );
        onChange((prev) => [...prev, uploaded].slice(0, max));
      } catch (e) {
        setLocalError(e instanceof Error ? e.message : "Upload failed. Try again.");
      } finally {
        setPending((p) => p.filter((x) => x.key !== key));
      }
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  const message = localError ?? error;

  return (
    <div id={id} tabIndex={-1} className="focus:outline-none">
      <p className="font-serif text-[1.1875rem] font-medium leading-snug text-ink">{label}</p>
      {hint && (
        <p id={hintId} className="mt-1 text-[1rem] leading-snug text-mute">
          {hint}
        </p>
      )}

      {remaining > 0 && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={clsx(
            "mt-3 flex flex-col items-center gap-3 border px-6 py-7 text-center transition-colors sm:flex-row sm:text-left",
            dragging ? "border-purple bg-purple/5" : message ? "border-[#9b1c2e]" : "border-gold/45 bg-white/40",
          )}
        >
          <Upload size={24} strokeWidth={1} className="shrink-0 text-gold-deep" aria-hidden="true" />
          <p className="flex-1 text-[1.0625rem] text-mute">
            Drag {max === 1 ? "a file" : "files"} here, or
          </p>
          <label className="caps-sm cursor-pointer border border-purple px-5 py-2.5 text-purple transition-colors hover:bg-purple hover:text-white has-focus-visible:outline has-focus-visible:outline-offset-2 has-focus-visible:outline-gold">
            Choose {max === 1 ? "file" : "files"}
            <input
              ref={inputRef}
              type="file"
              accept={acceptAttr}
              multiple={max > 1}
              aria-describedby={clsx(hint && hintId, message && `${id}-error`) || undefined}
              onChange={(e) => handleFiles(e.target.files)}
              className="sr-only"
            />
          </label>
        </div>
      )}

      {(value.length > 0 || pending.length > 0) && (
        <ul className="mt-3 space-y-2" aria-live="polite">
          {value.map((f) => (
            <li key={f.url} className="flex items-center gap-3 border border-gold/30 bg-white/60 px-4 py-2.5">
              {/\.pdf$/i.test(f.url) ? (
                <FileText size={18} strokeWidth={1.25} className="shrink-0 text-gold-deep" aria-hidden="true" />
              ) : (
                <ImageIcon size={18} strokeWidth={1.25} className="shrink-0 text-gold-deep" aria-hidden="true" />
              )}
              <span className="min-w-0 flex-1 truncate text-[1.0625rem]">{f.name}</span>
              <span className="caps-sm text-gold-deep">Uploaded</span>
              <button
                type="button"
                onClick={() => onChange((prev) => prev.filter((x) => x.url !== f.url))}
                aria-label={`Remove ${f.name}`}
                className="-mr-2 grid size-8 cursor-pointer place-items-center text-mute hover:text-ink"
              >
                <X size={16} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </li>
          ))}
          {pending.map((p) => (
            <li key={p.key} className="relative overflow-hidden border border-gold/30 bg-white/60 px-4 py-2.5">
              <span className="flex items-center gap-3">
                <LoaderCircle size={18} strokeWidth={1.25} className="shrink-0 animate-spin text-gold-deep" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-[1.0625rem]">{p.name}</span>
                <span className="caps-sm text-mute">Uploading {Math.round(p.progress * 100)}%</span>
              </span>
              <span
                className="absolute bottom-0 left-0 h-0.5 bg-purple transition-[width]"
                style={{ width: `${p.progress * 100}%` }}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      )}

      <FieldError id={id} message={message} />
    </div>
  );
}
