"use client";

import { usePcbLayer } from "@/contexts/PcbLayerContext";
import { useEffect } from "react";

export function ScrollLayerSync() {
  const { setLayer } = usePcbLayer();

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-pcb-layer]");
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target) return;
        const raw = visible.target.getAttribute("data-pcb-layer");
        const n = parseInt(raw ?? "0", 10);
        if (!Number.isNaN(n)) setLayer(n);
      },
      { root: null, rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [setLayer]);

  return null;
}
