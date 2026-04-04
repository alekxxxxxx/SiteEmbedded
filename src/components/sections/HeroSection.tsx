"use client";

import { BRAND_NAME, HERO_KICKER, HERO_VALUE, TAGLINE } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { TitleTraceCanvas } from "@/components/pcb/TitleTraceCanvas";

type Props = { lite?: boolean };

export function HeroSection({ lite }: Props) {
  return (
    <section
      data-pcb-layer={0}
      className="relative z-10 px-5 pb-10 pt-8 md:px-10 md:pb-16 md:pt-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex min-w-0 max-w-3xl flex-col">
          <Reveal variant="blur" amount={0.05}>
            <p className="mb-3 font-mono text-xs tracking-[0.12em] text-[#00D2FF]/90 md:text-sm">
              {HERO_KICKER}
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.06} className="scope-magnify group relative min-h-[3.25rem] md:min-h-[4.5rem]">
            <h1 className="sr-only">{BRAND_NAME}</h1>
            <TitleTraceCanvas
              lite={lite}
              className="mt-1 transition-transform duration-300 group-hover:scale-[1.02] md:mt-0"
            />
          </Reveal>
          <Reveal variant="up" delay={0.12}>
            <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-white/80 md:text-xl">
              {TAGLINE}
            </p>
          </Reveal>
          <Reveal variant="right" delay={0.18}>
            <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-[#00FF88]/90 md:text-base">
              {HERO_VALUE}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
