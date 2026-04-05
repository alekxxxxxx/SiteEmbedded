"use client";

import { Reveal, RevealLine } from "@/components/motion/Reveal";
import Image from "next/image";
import {
  PROJECTS,
  SECTION_PORTFOLIO_LEAD,
  SECTION_PORTFOLIO_TITLE,
  type ProjectWave,
} from "@/lib/site";
import { useCallback, useRef, useState } from "react";

function Wave({ kind }: { kind: ProjectWave }) {
  if (kind === "sine") {
    return (
      <path
        d="M0 24 Q 16 4, 32 24 T 64 24 T 96 24 T 128 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-[#FF6B00]"
      />
    );
  }
  if (kind === "pwm") {
    return (
      <path
        d="M0 8 H20 V28 H40 V8 H60 V28 H80 V8 H100 V28 H120 V8 H128"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-[#00D2FF]"
      />
    );
  }
  return (
    <path
      d="M0 20 L6 14 L12 22 L18 12 L24 24 L30 10 L36 26 L42 16 L48 28 L54 14 L60 24 L66 18 L72 26 L78 14 L84 22 L90 16 L96 24 L102 12 L108 28 L114 18 L120 24 L128 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="text-[#00FF88]"
    />
  );
}

function WavePanel({ channel, title, wave }: { channel: string; title: string; wave: ProjectWave }) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex min-h-[6.75rem] min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 md:min-h-0">
        <span className="shrink-0 rounded border border-[#00D2FF]/40 px-2 py-0.5 font-mono text-xs text-[#00D2FF]">
          {channel}
        </span>
        <h3 className="min-w-0 max-w-full font-mono text-[13px] font-medium leading-snug tracking-tight text-white break-words md:text-sm">
          {title}
        </h3>
      </div>
      <div className="relative min-h-[68px] w-full min-w-0">
        <svg
          viewBox="0 0 128 36"
          className="h-14 w-full opacity-95 md:h-16"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <line x1="0" y1="32" x2="128" y2="32" stroke="#ffffff22" strokeWidth="0.5" />
          <Wave kind={wave} />
        </svg>
      </div>
    </div>
  );
}

function ProjectBody({
  description,
  spec,
  imageSrc,
  imageAlt,
  sizes,
}: {
  description: string;
  spec: string;
  imageSrc: string;
  imageAlt: string;
  sizes: string;
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col gap-3">
      <div className="relative aspect-[16/10] w-full min-w-0 shrink-0 overflow-hidden rounded-lg border border-[#0A1A2F]">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes={sizes} />
      </div>
      <p className="min-w-0 text-pretty font-sans text-sm leading-relaxed text-white/80 break-words">
        {description}
      </p>
      <p className="min-w-0 font-mono text-[11px] leading-relaxed text-[#00D2FF] break-words md:text-xs">
        {spec}
      </p>
    </div>
  );
}

export function PortfolioSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

  const scrollByCard = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-portfolio-card]");
    const w = card?.offsetWidth ?? 400;
    el.scrollBy({ left: dir * (w + 24), behavior: "smooth" });
  }, []);

  const cardMotion = ["left", "scale", "right", "up", "blur"] as const;

  return (
    <section
      data-pcb-layer={1}
      className="relative z-10 border-t border-[#0A1A2F] px-5 py-20 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal variant="left">
              <h2 className="font-mono text-2xl text-white glow-text md:text-3xl">
                {SECTION_PORTFOLIO_TITLE}
              </h2>
              <RevealLine className="mt-4" />
            </Reveal>
            <Reveal variant="blur" delay={0.06} className="mt-5">
              <p className="max-w-2xl text-pretty font-sans text-base leading-relaxed text-white/70 md:text-lg">
                {SECTION_PORTFOLIO_LEAD}
              </p>
            </Reveal>
          </div>
          <Reveal variant="right" delay={0.08} className="hidden shrink-0 gap-2 md:flex" aria-hidden>
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              className="rounded border border-[#0A1A2F] px-3 py-2 font-mono text-xs text-[#00D2FF] transition hover:border-[#FF6B00]/50"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="rounded border border-[#0A1A2F] px-3 py-2 font-mono text-xs text-[#00D2FF] transition hover:border-[#FF6B00]/50"
            >
              →
            </button>
          </Reveal>
        </div>

        <div
          ref={scrollerRef}
          className="mt-12 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto overflow-y-visible pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-label="Кейсы и проекты"
        >
          {PROJECTS.map((p, i) => {
            const open = mobileOpen === p.id;
            return (
              <Reveal
                key={p.id}
                variant={cardMotion[i % cardMotion.length]}
                delay={0.04 + (i % 5) * 0.07}
                amount={0.12}
                className="flex w-[min(88vw,400px)] max-w-[400px] shrink-0 snap-center md:w-auto md:max-w-none"
              >
                <article
                  data-portfolio-card
                  className="group relative flex min-h-0 w-full flex-col overflow-hidden rounded-xl border border-[#0A1A2F] bg-[#050B14]/95 shadow-lg transition-[width,box-shadow,border-color] duration-500 ease-out hover:border-[#FF6B00]/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)] md:min-h-[260px] md:w-[min(88vw,420px)] md:overflow-hidden md:hover:z-20 md:hover:w-[min(900px,calc(100vw-5rem))]"
                >
                {/* Mobile */}
                <div className="flex min-h-0 flex-1 flex-col md:hidden">
                  <div className="p-4">
                    <WavePanel channel={p.channel} title={p.title} wave={p.wave} />
                    <p className="mt-3 text-pretty font-mono text-xs leading-relaxed text-[#00FF88]/85 break-words">
                      {p.tagline}
                    </p>
                  </div>
                  {open && (
                    <div className="border-t border-[#0A1A2F] px-4 pb-4 pt-1">
                      <ProjectBody
                        description={p.description}
                        spec={p.spec}
                        imageSrc={p.imageSrc}
                        imageAlt={p.imageAlt}
                        sizes="(max-width:768px) 88vw, 400px"
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setMobileOpen(open ? null : p.id)}
                    className="w-full border-t border-[#0A1A2F] py-3.5 font-mono text-xs leading-snug text-[#FF6B00] transition hover:bg-[#0A1A2F]/50"
                  >
                    {open ? "Свернуть" : "Фото и описание проекта"}
                  </button>
                </div>

                {/* Desktop: до hover — только осциллограмма; при hover карточка расширяется, справа — скролл при длинном тексте */}
                <div className="hidden min-h-[260px] md:flex md:flex-row md:items-stretch">
                  <div className="flex w-full shrink-0 flex-col justify-center border-[#0A1A2F] p-5 transition-[width] duration-500 ease-out group-hover:w-[38%] group-hover:border-r">
                    <WavePanel channel={p.channel} title={p.title} wave={p.wave} />
                    <p className="mt-3 text-pretty font-mono text-[11px] leading-relaxed text-[#00FF88]/85 break-words md:text-xs">
                      {p.tagline}
                    </p>
                  </div>
                  <div className="flex min-h-0 w-0 min-w-0 flex-col overflow-hidden opacity-0 transition-[width,opacity] duration-500 ease-out group-hover:w-[62%] group-hover:opacity-100">
                    <div className="flex max-h-[min(72vh,540px)] min-w-0 flex-col gap-3 overflow-y-auto overflow-x-hidden p-5 pl-4">
                      <ProjectBody
                        description={p.description}
                        spec={p.spec}
                        imageSrc={p.imageSrc}
                        imageAlt={p.imageAlt}
                        sizes="(min-width:768px) 480px, 400px"
                      />
                    </div>
                  </div>
                </div>
              </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
