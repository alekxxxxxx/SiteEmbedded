"use client";

import { Reveal, RevealLine } from "@/components/motion/Reveal";
import { SECTION_SERVICES_LEAD, SECTION_SERVICES_TITLE, SERVICES } from "@/lib/site";
import { useState } from "react";

const cardVariants = ["up", "right", "up", "left"] as const;

export function ServicesSection() {
  const [open, setOpen] = useState<string | null>(SERVICES[0]?.id ?? null);

  return (
    <section
      data-pcb-layer={1}
      className="relative z-10 border-t border-[#0A1A2F] bg-[#050B14]/80 px-5 py-20 backdrop-blur-sm md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal variant="left">
          <h2 className="font-mono text-2xl text-white glow-text md:text-3xl">
            {SECTION_SERVICES_TITLE}
          </h2>
          <RevealLine className="mt-4" />
        </Reveal>
        <Reveal variant="blur" delay={0.06} className="mt-5">
          <p className="max-w-3xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
            {SECTION_SERVICES_LEAD}
          </p>
        </Reveal>

        <div className="relative mt-14 grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full text-[#FF6B00]/35 lg:block"
            aria-hidden
          >
            <line x1="12%" y1="28%" x2="38%" y2="28%" stroke="currentColor" strokeWidth="1" />
            <line x1="38%" y1="28%" x2="62%" y2="28%" stroke="currentColor" strokeWidth="1" />
            <line x1="62%" y1="28%" x2="88%" y2="28%" stroke="currentColor" strokeWidth="1" />
            <line x1="25%" y1="28%" x2="25%" y2="72%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="50%" y1="28%" x2="50%" y2="72%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="75%" y1="28%" x2="75%" y2="72%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
          </svg>

          {SERVICES.map((s, i) => {
            const active = open === s.id;
            return (
              <Reveal
                key={s.id}
                variant={cardVariants[i % 4]}
                delay={0.05 + i * 0.09}
                className="h-full"
              >
                <button
                  type="button"
                  onClick={() => setOpen(active ? null : s.id)}
                  className={`scope-magnify relative flex h-full w-full flex-col rounded-lg border p-5 text-left transition-all duration-300 ${
                    active
                      ? "border-[#00D2FF] bg-[#0A1A2F]/90 shadow-[0_0_24px_rgba(0,210,255,0.15)]"
                      : "border-[#0A1A2F] bg-[#050B14]/90 hover:border-[#FF6B00]/50"
                  }`}
                >
                <span
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded border font-mono text-xs ${
                    active
                      ? "border-[#00D2FF] text-[#00D2FF]"
                      : "border-[#FF6B00]/40 text-[#FF6B00]"
                  }`}
                  aria-hidden
                >
                  {s.id === "sch" && "⌘"}
                  {s.id === "bom" && "§"}
                  {s.id === "pcb" && "◉"}
                  {s.id === "fw" && "01"}
                </span>
                <span className="font-mono text-sm text-[#00D2FF]/80">{s.hint}</span>
                <span className="mt-1 font-mono text-lg text-white">{s.title}</span>
                <span
                  className={`mt-3 block h-px w-full origin-left scale-x-0 transition-transform duration-300 ${
                    active ? "scale-x-100 bg-gradient-to-r from-[#00D2FF] to-[#FF6B00]" : "bg-[#FF6B00]/40"
                  }`}
                  aria-hidden
                />
                {active && (
                  <p className="mt-4 font-sans text-sm leading-relaxed text-white/75">{s.body}</p>
                )}
              </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
