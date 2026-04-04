"use client";

import { Reveal, RevealLine } from "@/components/motion/Reveal";
import {
  PRINCIPLES,
  SECTION_PRINCIPLES_LEAD,
  SECTION_PRINCIPLES_TITLE,
} from "@/lib/site";

export function PrinciplesSection() {
  return (
    <section
      data-pcb-layer={1}
      className="relative z-10 border-t border-[#0A1A2F] px-5 py-20 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal variant="right">
          <h2 className="font-mono text-2xl text-white glow-text md:text-3xl">
            {SECTION_PRINCIPLES_TITLE}
          </h2>
          <RevealLine className="mt-4" />
        </Reveal>
        <Reveal variant="up" delay={0.07} className="mt-5">
          <p className="max-w-3xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
            {SECTION_PRINCIPLES_LEAD}
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} variant="scale" delay={0.04 + i * 0.1}>
              <li className="scope-magnify h-full rounded-lg border border-[#0A1A2F] bg-[#0A1A2F]/35 p-5 transition-colors hover:border-[#00D2FF]/30">
                <h3 className="font-mono text-sm text-[#FF6B00]">{p.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-white/72">{p.text}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
