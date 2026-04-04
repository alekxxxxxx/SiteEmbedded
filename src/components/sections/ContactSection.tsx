"use client";

import { Reveal, RevealLine } from "@/components/motion/Reveal";
import { BRAND_NAME, PINOUT, SECTION_CONTACT_LEAD, SECTION_CONTACT_TITLE } from "@/lib/site";
import { useState } from "react";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <footer
      data-pcb-layer={2}
      className="relative z-10 border-t border-[#0A1A2F] px-5 py-20 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal variant="left">
          <h2 className="font-mono text-2xl text-white glow-text md:text-3xl">
            {SECTION_CONTACT_TITLE}
          </h2>
          <RevealLine className="mt-4" />
        </Reveal>
        <Reveal variant="blur" delay={0.06} className="mt-5">
          <p className="max-w-2xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
            {SECTION_CONTACT_LEAD}
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="relative flex w-full flex-col items-center lg:max-w-none">
            <Reveal variant="scale" delay={0.08}>
              <div className="relative rounded-lg border-2 border-[#00D2FF]/40 bg-[#0A1A2F]/80 px-10 py-8 shadow-[0_0_40px_rgba(0,210,255,0.08)]">
                <div className="font-mono text-xl text-[#00FF88] md:text-2xl">{BRAND_NAME}</div>
                <div className="mt-1 text-center font-mono text-[10px] text-white/40">инженерный контур</div>
                <div className="pointer-events-none absolute -left-3 top-1/2 flex -translate-y-1/2 flex-col gap-6">
                  {PINOUT.slice(0, 2).map((p) => (
                    <span
                      key={p.label}
                      className="h-px w-3 bg-[#FF6B00]/60"
                      aria-hidden
                    />
                  ))}
                </div>
                <div className="pointer-events-none absolute -right-3 top-1/2 flex -translate-y-1/2 flex-col gap-6">
                  {PINOUT.slice(2).map((p) => (
                    <span key={p.label} className="h-px w-3 bg-[#FF6B00]/60" aria-hidden />
                  ))}
                </div>
              </div>
            </Reveal>

            <ul className="mt-10 grid w-full max-w-md gap-4 sm:grid-cols-2">
              {PINOUT.map((p, i) => (
                <Reveal key={p.label} variant="up" delay={0.05 + i * 0.09}>
                  <li className="scope-magnify flex h-full flex-col rounded border border-[#0A1A2F] bg-[#050B14]/80 p-3">
                    <span className="font-mono text-xs text-[#00D2FF]">{p.label}</span>
                    <a
                      href={p.href}
                      className="mt-1 break-all font-sans text-sm text-white/85 underline-offset-2 hover:text-[#00FF88] hover:underline"
                    >
                      {p.value}
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal variant="right" delay={0.1} className="w-full max-w-md">
            <form
              className="w-full max-w-md space-y-4 rounded-xl border border-[#0A1A2F] bg-[#0A1A2F]/25 p-6"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="block font-mono text-xs text-[#00D2FF]">
                Сообщение
                <textarea
                  className="mt-2 w-full rounded border border-[#0A1A2F] bg-[#050B14] px-3 py-2 font-sans text-sm text-white outline-none ring-[#FF6B00]/0 transition focus:border-[#FF6B00]/60 focus:ring-2 focus:ring-[#FF6B00]/20"
                  rows={4}
                  placeholder="Кратко: задача, сроки, объём, есть ли уже схема или только идея"
                  required
                />
              </label>
              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded border border-[#FF0055] bg-[#FF0055]/15 px-4 py-3 font-mono text-sm text-[#FF0055] transition hover:bg-[#FF0055]/25"
              >
                <span className="relative z-10">
                  {sent ? "Заявка отправлена (демо)" : "Отправить запрос"}
                </span>
                <span
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#FF0055]/30 to-transparent transition group-hover:translate-x-full duration-700"
                  aria-hidden
                />
              </button>
            </form>
          </Reveal>
        </div>

        <Reveal variant="blur" delay={0.05} className="mt-16">
          <p className="text-center font-mono text-xs text-white/35">
            © {new Date().getFullYear()} {BRAND_NAME}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
