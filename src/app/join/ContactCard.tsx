import { Icon } from "@/components/ui/Icons";
import { email, offices, phones } from "@/lib/content";

/** The Secretariat's telephone, email and office, beside each join form. */
export function ContactCard() {
  return (
    <div className="rounded-3xl bg-forest-950 p-6 text-paper sm:p-7">
      <h3 className="text-[1rem] font-semibold">Prefer to speak to someone?</h3>
      <div className="mt-4 space-y-2.5">
        {phones.map((phone) => (
          <a
            key={phone}
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 text-[0.9375rem] text-paper/85 tnum transition-colors hover:text-gold-300"
          >
            <Icon name="phone" className="size-4 text-gold-400" />
            {phone}
          </a>
        ))}
        <a
          href={`mailto:${email.address}`}
          className="flex items-center gap-3 text-[0.9375rem] break-all text-paper/85 transition-colors hover:text-gold-300"
        >
          <Icon name="mail" className="size-4 shrink-0 text-gold-400" />
          {email.address}
        </a>
      </div>
      <p className="mt-5 flex gap-3 border-t border-white/10 pt-5 text-[0.875rem] leading-relaxed text-paper/60">
        <Icon name="map-pin" className="mt-0.5 size-4 shrink-0 text-gold-400" />
        {offices[0].lines.join(", ")}
      </p>
    </div>
  );
}
