import { Crest } from "./Crest";
import { cn } from "./ui/cn";
import { registrationSociety } from "@/lib/content";

/**
 * The head of the membership registration form: the seal centred over the
 * Society's name, with the form title in gold beneath — the layout of the
 * paper form, with the seal added. Shared by the online form and the printed
 * copy so the two always match.
 */
export function FormLetterhead({ className }: { className?: string }) {
  return (
    <header className={cn("text-center", className)}>
      <Crest
        size={176}
        eager
        className="mx-auto size-18 rounded-full shadow-[0_0_0_1px_rgb(166_134_47/0.35),0_8px_20px_-10px_rgb(7_31_23/0.45)] sm:size-22 print:size-20 print:shadow-none"
      />
      <p className="font-display mt-5 text-[1.3125rem] leading-tight font-semibold tracking-[0.04em] text-forest-900 uppercase sm:text-[1.625rem]">
        {registrationSociety.name}
      </p>
      <p className="font-display mt-1 text-[1rem] leading-tight font-semibold tracking-[0.06em] text-forest-900 uppercase sm:text-[1.25rem]">
        {registrationSociety.descriptor}
      </p>
      <div aria-hidden="true" className="mx-auto mt-4 flex max-w-xs items-center gap-3">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-gold-500/70" />
        <span className="size-1.5 rotate-45 bg-gold-500" />
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-gold-500/70" />
      </div>
      <h2 className="eyebrow mt-4 text-[0.8125rem] text-gold-700 sm:text-[0.875rem]">
        {registrationSociety.formTitle}
      </h2>
    </header>
  );
}
