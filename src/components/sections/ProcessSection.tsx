"use client";

import { Reveal, RevealLine } from "@/components/motion/Reveal";
import { PROCESS_STEPS, SECTION_PROCESS_LEAD, SECTION_PROCESS_TITLE } from "@/lib/site";

export function ProcessSection() {
  return (
    <section
      data-pcb-layer={1}
      className="relative z-10 overflow-hidden border-t border-[#0A1A2F] bg-[#050B14]/85 px-5 py-20 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal variant="left">
          <h2 className="font-mono text-2xl text-white glow-text md:text-3xl">
            {SECTION_PROCESS_TITLE}
          </h2>
          <RevealLine className="mt-4" />
        </Reveal>
        <Reveal variant="blur" delay={0.06} className="mt-5">
          <p className="max-w-3xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
            {SECTION_PROCESS_LEAD}
          </p>
        </Reveal>

        <Reveal variant="scale" delay={0.08} className="relative mt-16">
          <div className="rounded-xl border border-[#0A1A2F] bg-[#0A1A2F]/30 p-6 md:p-10">
            <div
              className="pointer-events-none absolute left-[8%] right-[8%] top-[42%] hidden h-0.5 bg-[#FF6B00]/25 md:block"
              aria-hidden
            />
            <div className="pick-head pointer-events-none absolute left-[6%] top-8 z-20 hidden h-10 w-16 rounded border border-[#00D2FF]/50 bg-[#050B14]/90 shadow-[0_0_20px_rgba(0,210,255,0.2)] md:block" />

            <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <Reveal key={step.n} variant="up" delay={0.06 + i * 0.11}>
                  <li className="scope-magnify relative flex h-full flex-col rounded-lg border border-[#0A1A2F] bg-[#050B14]/80 p-4 transition-transform hover:-translate-y-0.5">
                    <span className="font-mono text-xs text-[#FF6B00]">{step.n}</span>
                    <span className="mt-2 font-mono text-sm text-white">{step.title}</span>
                    <span className="mt-2 font-sans text-xs leading-relaxed text-white/60">{step.text}</span>
                    <span
                      className="mt-3 inline-block h-2 w-2 rounded-full border border-[#00FF88] bg-[#00FF88]/30"
                      title="pad"
                      aria-hidden
                    />
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal variant="blur" delay={0.2} className="mt-10">
              <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-[#FF0055]/40 bg-[#050B14]/60 p-6 md:flex-row md:justify-between">
                <span className="font-mono text-sm text-[#FF0055]">Итог для вас</span>
                <span className="max-w-xl text-center font-sans text-sm leading-relaxed text-white/65 md:text-left">
                  Рабочие платы, стабильная прошивка, комплект документов под производство и возможность
                  закрепить нас на сопровождении следующих ревизий.
                </span>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
