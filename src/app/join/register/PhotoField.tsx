"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/components/ui/cn";
import { Icon } from "@/components/ui/Icons";
import { PHOTO_MAX_BYTES, PHOTO_TYPES } from "@/lib/constants";

/** Long edge after downscaling — ample for a passport photo on screen or A4. */
const MAX_EDGE = 900;

/**
 * Downscales a photo in the browser and re-encodes it as JPEG, so a 5 MB
 * phone picture uploads as roughly 100 KB. Browsers apply EXIF orientation
 * when decoding, so sideways phone photos come out upright.
 */
async function preparePhoto(file: File): Promise<File> {
  const url = URL.createObjectURL(file);

  try {
    const image = new Image();
    image.src = url;
    await image.decode();

    const scale = Math.min(1, MAX_EDGE / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);

    const context = canvas.getContext("2d");
    if (!context) return file;

    // JPEG has no transparency; give a transparent PNG a white ground.
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.86),
    );

    return blob ? new File([blob], "passport.jpg", { type: "image/jpeg" }) : file;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * The passport photograph slot: a portrait box in passport proportions
 * (35 × 45 mm) that shows the chosen photo in place. It holds no form value of
 * its own — the prepared file is handed up through `onChange` and the form
 * attaches it on submit.
 */
export function PhotoField({
  error,
  onChange,
  className,
}: {
  error?: string;
  onChange: (file: File | null) => void;
  className?: string;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Release the preview's object URL when it is replaced or unmounted.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  async function handleFile(file: File | undefined) {
    setLocalError(null);
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setLocalError("Choose an image file — a JPG or PNG photograph.");
      return;
    }

    setBusy(true);
    let prepared: File;
    try {
      prepared = await preparePhoto(file);
    } catch {
      // Could not decode it here (an unusual format); let the server judge.
      prepared = file;
    } finally {
      setBusy(false);
    }

    if (prepared.size > PHOTO_MAX_BYTES) {
      setLocalError("That photograph is too large. Choose one under 2 MB.");
      return;
    }

    setPreview(URL.createObjectURL(prepared));
    onChange(prepared);
  }

  function clear() {
    setPreview(null);
    setLocalError(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  // The server's error is about the submission before this photo was chosen.
  const message = localError ?? (preview ? undefined : error);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <label
        htmlFor={inputId}
        className={cn(
          "group relative flex aspect-[7/9] w-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed text-center transition-colors focus-within:ring-2 focus-within:ring-forest-700/25 sm:w-40",
          preview
            ? "border-transparent bg-white shadow-card"
            : message
              ? "border-alert/50 bg-alert-soft/40"
              : "border-forest-900/20 bg-white hover:border-forest-700/50 hover:bg-forest-50/60",
        )}
      >
        {preview ? (
          // A local object URL: next/image has nothing to optimise here.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Your passport photograph" className="size-full object-cover" />
        ) : (
          <span className="flex flex-col items-center gap-2 px-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-forest-900/[0.06] text-forest-700">
              <Icon name="user" className="size-6" />
            </span>
            <span className="text-[0.8125rem] leading-snug font-semibold text-forest-900">
              Passport photograph<span className="text-alert"> *</span>
            </span>
            <span className="text-[0.75rem] leading-snug text-ink-faint">
              {busy ? "Preparing…" : "Tap to upload"}
            </span>
          </span>
        )}
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={PHOTO_TYPES.join(",")}
          aria-invalid={message ? true : undefined}
          aria-describedby={message ? `${inputId}-error` : `${inputId}-hint`}
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </label>

      {preview ? (
        <div className="mt-3 flex items-center gap-3 text-[0.8125rem]">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="font-medium text-forest-900 underline underline-offset-4 hover:text-forest-700"
          >
            Change
          </button>
          <span aria-hidden="true" className="text-ink-faint">·</span>
          <button
            type="button"
            onClick={clear}
            className="font-medium text-ink-soft underline underline-offset-4 hover:text-alert"
          >
            Remove
          </button>
        </div>
      ) : null}

      {message ? (
        <p
          id={`${inputId}-error`}
          className="mt-2 flex max-w-44 items-start gap-1.5 text-[0.8125rem] leading-snug text-alert"
        >
          <Icon name="info" className="mt-px size-4 shrink-0" />
          {message}
        </p>
      ) : (
        <p id={`${inputId}-hint`} className="mt-2 max-w-44 text-center text-[0.75rem] leading-snug text-ink-faint">
          Recent, head and shoulders, plain background. JPG or PNG.
        </p>
      )}
    </div>
  );
}
