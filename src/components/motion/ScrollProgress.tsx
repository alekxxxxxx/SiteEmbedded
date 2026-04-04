"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Индикатор прогресса скролла вверху страницы */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  if (reduce) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-[#FF6B00] via-[#FF9940] to-[#00D2FF]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
