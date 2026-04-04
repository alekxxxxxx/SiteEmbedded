"use client";

import { useEffect, useState } from "react";

export function IdleOscilloscope() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(t);
      setOn(false);
      t = setTimeout(() => setOn(true), 10_000);
    };
    reset();
    const ev = () => reset();
    window.addEventListener("mousemove", ev);
    window.addEventListener("keydown", ev);
    window.addEventListener("scroll", ev, { passive: true });
    window.addEventListener("touchstart", ev, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", ev);
      window.removeEventListener("keydown", ev);
      window.removeEventListener("scroll", ev);
      window.removeEventListener("touchstart", ev);
    };
  }, []);

  if (!on) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-6 right-6 z-30 w-56 opacity-40 md:w-72 md:opacity-55"
      aria-hidden
    >
      <svg viewBox="0 0 200 48" className="h-12 w-full text-[#00FF88] md:h-14">
        <defs>
          <filter id="scopeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x="1" y="1" width="198" height="46" rx="4" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <text x="8" y="14" className="fill-[#00D2FF] font-mono text-[9px]">
          DC/DC · idle
        </text>
        <path
          filter="url(#scopeGlow)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          d="M4 32 Q 24 18, 44 30 T 84 28 T 124 22 T 164 30 T 196 26"
          className="animate-scope-drift"
        />
      </svg>
    </div>
  );
}
