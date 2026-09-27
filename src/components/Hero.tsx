"use client";

import { useState } from "react";
import Link from "next/link";
import { Crest } from "./Crest";
import { society } from "@/lib/content";

const stamps = [
  { label: "Established", value: society.established },
  { label: "Classification", value: society.tier },
  { label: "By-Laws", value: "No. R11913" },
];

export function Hero() {
  const [quickAmount, setQuickAmount] = useState<string>("50,000");

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-forest-950 text-paper"
    >
      {/* Ledger rules — structural texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(217,190,114,0.05) 0px, rgba(217,190,114,0.05) 1px, transparent 1px, transparent 104px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 85% at 12% -10%, rgba(43,115,88,0.42), transparent 58%)",
        }}
      />

      {/* Document edge, echoing the Society's printed material. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gold-500" />
      <div aria-hidden="true" className="absolute inset-x-0 top-[5px] h-px bg-gold-500/40" />

      <div className="shell relative flex min-h-[100svh] flex-col justify-center pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 border border-gold-400/30 bg-forest-900/60 px-3 py-1 rounded-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="label text-gold-400">The Housing & Wealth Operating System</span>
            </div>

            <h1 className="font-display mt-6 text-[2.5rem] leading-[1.05] font-normal tracking-[-0.025em] text-balance sm:text-[3.5rem] lg:text-[4.25rem]">
              Your Income Shouldn&apos;t Decide Whether You Can Own a Home.
            </h1>

            <p className="font-display mt-5 text-[1.25rem] leading-[1.4] text-gold-300 italic sm:text-[1.5rem]">
              Anchor turns what you can afford today into a structured pathway to what you can own tomorrow.
            </p>

            <div aria-hidden="true" className="mt-7 h-px w-24 bg-gold-500/50" />

            <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.7] text-pretty text-paper/80">
              You don&apos;t need to be wealthy, formally salaried or mortgage-ready to begin. Whether you are a market trader, artisan, consultant, or corporate worker, Anchor builds your housing capacity progressively.
            </p>

            {/* Interactive Hero CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href="#homepath"
                className="label bg-gold-400 px-7 py-4 text-center text-forest-950 transition-colors duration-200 hover:bg-gold-300 font-bold shadow-lg"
              >
                Check My HomePath™
              </a>

              <div className="flex items-center border border-paper/25 bg-forest-900/70 rounded-xs px-3 py-1.5">
                <span className="text-xs label text-gold-400 mr-2">Start with ₦</span>
                <input
                  type="text"
                  value={quickAmount}
                  onChange={(e) => setQuickAmount(e.target.value)}
                  className="w-24 bg-transparent font-mono text-paper font-semibold text-sm focus:outline-none"
                  placeholder="50,000"
                />
                <a
                  href="#homepath"
                  className="label-sm bg-forest-800 text-gold-300 px-3 py-2 hover:bg-gold-400 hover:text-forest-950 transition-colors rounded-xs"
                >
                  Go →
                </a>
              </div>

              <a
                href="#property-dna"
                className="label border border-paper/20 px-5 py-4 text-center text-paper/85 transition-colors duration-200 hover:border-paper/60 hover:bg-paper/5 text-xs"
              >
                Explore Property DNA™
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-col items-center gap-10 lg:items-end">
              <div className="relative flex items-center justify-center">
                <div
                  aria-hidden="true"
                  className="absolute h-[16rem] w-[16rem] rounded-full border border-gold-400/15 sm:h-[19rem] sm:w-[19rem]"
                />
                <Crest size={190} priority className="h-36 w-36 sm:h-48 sm:w-48" />
              </div>

              <dl className="grid w-full max-w-sm grid-cols-3 border-t border-gold-400/20">
                {stamps.map((stamp) => (
                  <div
                    key={stamp.label}
                    className="border-r border-gold-400/20 px-3 py-5 last:border-r-0"
                  >
                    <dt className="label-sm text-paper/55">{stamp.label}</dt>
                    <dd className="mt-2 text-[0.8125rem] leading-snug text-gold-300">
                      {stamp.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Pillar 15: Stage Selector Cards ("Choose where you are today") */}
        <div className="mt-16 pt-10 border-t border-gold-400/20">
          <p className="label text-gold-400 text-xs mb-4">Choose Where You Are Today</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="#pathways"
              className="group bg-forest-900/60 border border-paper/15 p-4 rounded-xs hover:border-gold-400 hover:bg-forest-900 transition-all duration-200"
            >
              <div className="flex items-center justify-between text-xs label text-gold-400 mb-1">
                <span>Stage 01</span>
                <span>Anchor START™</span>
              </div>
              <p className="font-display text-lg text-paper group-hover:text-gold-300 transition-colors">
                I want to start saving
              </p>
              <p className="text-xs text-paper/60 mt-1">From ₦10,000/mo into ₦5k slots</p>
            </a>

            <a
              href="#pathways"
              className="group bg-forest-900/60 border border-paper/15 p-4 rounded-xs hover:border-gold-400 hover:bg-forest-900 transition-all duration-200"
            >
              <div className="flex items-center justify-between text-xs label text-gold-400 mb-1">
                <span>Stage 02</span>
                <span>Anchor OWN™</span>
              </div>
              <p className="font-display text-lg text-paper group-hover:text-gold-300 transition-colors">
                I&apos;m ready to buy
              </p>
              <p className="text-xs text-paper/60 mt-1">Deposit + cooperative financing</p>
            </a>

            <a
              href="#pathways"
              className="group bg-forest-900/60 border border-paper/15 p-4 rounded-xs hover:border-gold-400 hover:bg-forest-900 transition-all duration-200"
            >
              <div className="flex items-center justify-between text-xs label text-gold-400 mb-1">
                <span>Stage 03</span>
                <span>Anchor LIVE™</span>
              </div>
              <p className="font-display text-lg text-paper group-hover:text-gold-300 transition-colors">
                I want rent-to-own
              </p>
              <p className="text-xs text-paper/60 mt-1">Convert lease payments into equity</p>
            </a>

            <a
              href="#pathways"
              className="group bg-forest-900/60 border border-paper/15 p-4 rounded-xs hover:border-gold-400 hover:bg-forest-900 transition-all duration-200"
            >
              <div className="flex items-center justify-between text-xs label text-gold-400 mb-1">
                <span>Stage 04</span>
                <span>Anchor GROW™</span>
              </div>
              <p className="font-display text-lg text-paper group-hover:text-gold-300 transition-colors">
                I want to grow wealth
              </p>
              <p className="text-xs text-paper/60 mt-1">High-yield cooperative asset pooling</p>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-12 text-paper/55 label-sm">
          <span>{society.location}</span>
          <Link href="/dashboard" className="text-gold-400 hover:text-gold-300 underline font-mono">
            Existing Member? Access My Anchor Dashboard →
          </Link>
        </div>
      </div>
    </section>
  );
}
