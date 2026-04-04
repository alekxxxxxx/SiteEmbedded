"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const presets = {
  up: { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -28 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.93 }, visible: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: "blur(12px)" }, visible: { opacity: 1, filter: "blur(0px)" } },
} as const;

export type RevealVariant = keyof typeof presets;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  /** Часть элемента в зоне видимости (0–1) */
  amount?: number | "some" | "all";
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  amount = 0.15,
}: RevealProps) {
  const reduce = useReducedMotion();
  const v = presets[variant];

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: "0px 0px -72px 0px" }}
      variants={v}
      transition={{ duration: 0.62, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Акцентная линия под заголовком — «дорожка» растёт при скролле */
export function RevealLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div
        className={`h-px w-28 max-w-full bg-gradient-to-r from-[#FF6B00] to-[#00D2FF] ${className ?? ""}`}
      />
    );
  }

  return (
    <motion.div
      className={`h-px w-28 max-w-full origin-left bg-gradient-to-r from-[#FF6B00] via-[#FF9940] to-[#00D2FF] ${className ?? ""}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.85, ease }}
      style={{ transformOrigin: "left center" }}
    />
  );
}
