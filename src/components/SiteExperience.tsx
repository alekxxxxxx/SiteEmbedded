"use client";

import { PcbLayerProvider } from "@/contexts/PcbLayerContext";
import { PcbShaderBackground } from "@/components/pcb/PcbShaderBackground";
import { ScrollLayerSync } from "@/components/effects/ScrollLayerSync";
import { IdleOscilloscope } from "@/components/effects/IdleOscilloscope";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useEffect, useState } from "react";

/** Только если WebGL недоступен — не отключаем «полный» режим по ширине экрана (на телефонах тоже нужны анимации). */
function useLiteMode() {
  const [lite, setLite] = useState(false);
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl");
        setLite(!gl);
      } catch {
        setLite(true);
      }
    });
  }, []);
  return lite;
}

export function SiteExperience() {
  const lite = useLiteMode();

  return (
    <PcbLayerProvider>
      <div className="engineer-cursor relative min-h-full bg-[#050B14] text-white">
        <ScrollProgress />
        <PcbShaderBackground lite={lite} />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[1] min-h-[100dvh]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,210,255,0.05) 0%, transparent 30%, transparent 58%, rgba(5,11,20,0.38) 100%), radial-gradient(ellipse 95% 55% at 50% 108%, rgba(0,0,0,0.32), transparent 52%)",
          }}
        />
        <ScrollLayerSync />
        <IdleOscilloscope />
        <main className="relative z-10">
          <HeroSection lite={lite} />
          <ServicesSection />
          <PrinciplesSection />
          <PortfolioSection />
          <ProcessSection />
          <ContactSection />
        </main>
      </div>
    </PcbLayerProvider>
  );
}
