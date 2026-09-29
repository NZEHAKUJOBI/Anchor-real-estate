import type { Metadata } from "next";
import Link from "next/link";
import { Crest } from "@/components/Crest";
import { Icon } from "@/components/ui/Icons";
import { society } from "@/lib/content";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="relative isolate flex min-h-screen flex-col items-center justify-center bg-forest-950 px-5 py-16">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(110%_70%_at_50%_0%,rgb(43_115_88/0.45),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_100%,rgb(217_190_114/0.08),transparent_70%)]" />
      </div>

      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <Crest
            size={128}
            eager
            className="size-16 rounded-full shadow-[0_0_0_1px_rgb(217_190_114/0.3),0_16px_32px_-12px_rgb(0_0_0/0.7)]"
          />
          <p className="font-display mt-6 text-[1.0625rem] font-semibold tracking-[0.08em] text-paper uppercase">
            {society.name}
          </p>
          <p className="mt-2 text-[0.625rem] font-semibold tracking-[0.18em] text-gold-400 uppercase">
            Secretariat administration
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-ivory px-6 py-8 shadow-[0_30px_60px_-24px_rgb(0_0_0/0.7)] sm:px-9 sm:py-10">
          <h1 className="font-display text-[1.625rem] leading-tight text-forest-900">Officer sign-in</h1>
          <p className="mt-1.5 mb-7 text-[0.9375rem] text-ink-soft">
            Use the credentials issued by the Society&apos;s administrator.
          </p>
          <LoginForm next={next} />
        </div>

        <div className="mt-8 flex items-center justify-between text-[0.8125rem] text-paper/55">
          <span className="flex items-center gap-2">
            <Icon name="lock" className="size-4 text-gold-400" />
            Authorised officers only
          </span>
          <Link href="/" className="flex items-center gap-1.5 transition-colors hover:text-paper">
            <Icon name="arrow-left" className="size-4" />
            Public site
          </Link>
        </div>
      </div>
    </div>
  );
}
