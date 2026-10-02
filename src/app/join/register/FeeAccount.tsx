"use client";

import { useState } from "react";
import { cn } from "@/components/ui/cn";
import { Icon } from "@/components/ui/Icons";
import { REGISTRATION_FEE_KOBO } from "@/lib/constants";
import { feeAccount } from "@/lib/content";
import { formatNaira } from "@/lib/money";

/** The registration fee and the account it is paid into, as on the paper form. */
export function FeeAccount({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(feeAccount.accountNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the number is on screen to copy by hand.
    }
  }

  return (
    <div className={cn("rounded-2xl border border-gold-500/35 bg-gold-50 p-5 sm:p-6", className)}>
      <p className="text-[0.9375rem] leading-relaxed text-ink">
        Pay the non-refundable registration fee of{" "}
        <strong className="font-semibold text-forest-900">{formatNaira(REGISTRATION_FEE_KOBO)}</strong>{" "}
        to:
      </p>
      <dl className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:gap-5">
        <div>
          <dt className="text-[0.75rem] font-medium text-ink-faint">Bank</dt>
          <dd className="mt-1 text-[0.9375rem] font-semibold text-forest-900">{feeAccount.bank}</dd>
        </div>
        <div>
          <dt className="text-[0.75rem] font-medium text-ink-faint">Account name</dt>
          <dd className="mt-1 text-[0.9375rem] font-semibold text-forest-900">{feeAccount.accountName}</dd>
        </div>
        <div>
          <dt className="text-[0.75rem] font-medium text-ink-faint">Account number</dt>
          <dd className="mt-1 flex items-center gap-2.5">
            <span className="text-[1.0625rem] font-semibold tracking-[0.02em] text-forest-900 tnum">
              {feeAccount.accountNumber}
            </span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-7 items-center gap-1 rounded-full border border-forest-900/20 bg-white px-2.5 text-[0.75rem] font-semibold text-forest-900 transition-colors hover:border-forest-900/40"
            >
              <Icon name={copied ? "check" : "file"} className="size-3.5" strokeWidth={2} />
              <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
            </button>
          </dd>
        </div>
      </dl>
    </div>
  );
}
