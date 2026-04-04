"use client";

import { BRAND_NAME } from "@/lib/site";
import { useEffect, useRef } from "react";
import { polylinesGroupedByChar, polylinesForString, type Polyline } from "./titleTracePaths";

type Props = {
  className?: string;
  lite?: boolean;
  onComplete?: () => void;
};

type Seg = { a: [number, number]; b: [number, number]; len: number };

function flattenSegments(lines: Polyline[]): Seg[] {
  const segs: Seg[] = [];
  for (const pl of lines) {
    for (let i = 1; i < pl.length; i++) {
      const a = pl[i - 1];
      const b = pl[i];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      segs.push({ a, b, len });
    }
  }
  return segs;
}

function boundsOf(lines: Polyline[]) {
  let maxX = 0;
  let maxY = 0;
  let minY = 0;
  for (const pl of lines) {
    for (const [x, y] of pl) {
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      minY = Math.min(minY, y);
    }
  }
  return { maxX: maxX || 1, maxY, minY };
}

function layoutFor(
  w: number,
  h: number,
  b: { maxX: number; maxY: number; minY: number },
) {
  const padX = w * 0.06;
  const padY = h * 0.1;
  const bw = w - padX * 2;
  const bh = h - padY * 2;
  const sx = bw / (b.maxX + 0.2);
  const sy = bh / (b.maxY - b.minY + 0.25 || 1);
  const s = Math.min(sx, sy);
  const ox = padX;
  const oy = padY - b.minY * s;
  const th = Math.max(5, Math.min(16, s * 0.24));
  const map = (p: [number, number]): [number, number] => [ox + p[0] * s, oy + p[1] * s];
  return { map, th, gridScale: s };
}

/** Крупная GND-площадка в начале буквы (зелёная маска + медь). */
function drawMainGndPad(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  th: number,
  copper: string,
) {
  const r = Math.max(7, th * 1.35);
  ctx.fillStyle = "rgba(0, 255, 136, 0.22)";
  ctx.beginPath();
  ctx.arc(x, y, r * 1.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#00FF88";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = copper;
  ctx.beginPath();
  ctx.arc(x, y, r * 0.52, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(x - r * 0.38, y);
  ctx.lineTo(x + r * 0.38, y);
  ctx.moveTo(x, y - r * 0.38);
  ctx.lineTo(x, y + r * 0.38);
  ctx.stroke();
}

/** Мелкий via / узел GND на изломе. */
function drawViaGnd(ctx: CanvasRenderingContext2D, x: number, y: number, th: number) {
  const r = Math.max(3.8, th * 0.42);
  ctx.strokeStyle = "#00FF88";
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "#00D2FF";
  ctx.lineWidth = 0.85;
  ctx.beginPath();
  ctx.arc(x, y, r * 0.72, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#050B14";
  ctx.beginPath();
  ctx.arc(x, y, r * 0.38, 0, Math.PI * 2);
  ctx.fill();
}

function drawSolidBars(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  b: { maxX: number; maxY: number; minY: number },
  letterSegs: Seg[],
) {
  ctx.clearRect(0, 0, w, h);
  const { map, th } = layoutFor(w, h, b);
  const copper = "#FF6B00";
  const hi = "#FF9940";

  for (const { a, b: bpt, len } of letterSegs) {
    const ax = map(a);
    const bx = map(bpt);

    if (len < 1e-6) {
      const r = th * 0.45;
      ctx.fillStyle = copper;
      ctx.beginPath();
      ctx.arc(ax[0], ax[1], r, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }

    const dx = bx[0] - ax[0];
    const dy = bx[1] - ax[1];

    if (Math.abs(dx) < 0.5) {
      const x = ax[0];
      const y0 = Math.min(ax[1], bx[1]);
      const y1 = Math.max(ax[1], bx[1]);
      const grd = ctx.createLinearGradient(x - th / 2, y0, x + th / 2, y0);
      grd.addColorStop(0, copper);
      grd.addColorStop(0.5, hi);
      grd.addColorStop(1, copper);
      ctx.fillStyle = grd;
      ctx.fillRect(x - th / 2, y0, th, Math.max(y1 - y0, 1));
    } else if (Math.abs(dy) < 0.5) {
      const y = ax[1];
      const x0 = Math.min(ax[0], bx[0]);
      const x1 = Math.max(ax[0], bx[0]);
      const grd = ctx.createLinearGradient(x0, y - th / 2, x0, y + th / 2);
      grd.addColorStop(0, copper);
      grd.addColorStop(0.5, hi);
      grd.addColorStop(1, copper);
      ctx.fillStyle = grd;
      ctx.fillRect(x0, y - th / 2, Math.max(x1 - x0, 1), th);
    } else {
      ctx.strokeStyle = copper;
      ctx.lineWidth = th;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(ax[0], ax[1]);
      ctx.lineTo(bx[0], bx[1]);
      ctx.stroke();
      ctx.strokeStyle = hi;
      ctx.lineWidth = Math.max(1, th * 0.22);
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.moveTo(ax[0], ax[1]);
      ctx.lineTo(bx[0], bx[1]);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }
}

function drawLetterDim(
  ctx: CanvasRenderingContext2D,
  segs: Seg[],
  mapPt: (p: [number, number]) => [number, number],
  glow: string,
  copper: string,
) {
  for (const { a, b: bpt } of segs) {
    const ax = mapPt(a);
    const bx = mapPt(bpt);
    ctx.strokeStyle = glow;
    ctx.lineWidth = 6;
    ctx.globalAlpha = 0.22;
    ctx.beginPath();
    ctx.moveTo(ax[0], ax[1]);
    ctx.lineTo(bx[0], bx[1]);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = copper;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ax[0], ax[1]);
    ctx.lineTo(bx[0], bx[1]);
    ctx.stroke();
  }
}

export function TitleTraceCanvas({ className, lite, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const completeRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const phaseRef = useRef<"anim" | "solid">("anim");
  const layoutRef = useRef<{
    b: { maxX: number; maxY: number; minY: number };
    letterSegs: Seg[];
  } | null>(null);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    completeRef.current = false;
    phaseRef.current = lite ? "solid" : "anim";

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const brand = BRAND_NAME;
    const groups = polylinesGroupedByChar(brand);
    const letterPolys = polylinesForString(brand);
    const letterSegs = flattenSegments(letterPolys);
    const b = boundsOf(letterPolys);
    const segsByLetter = groups.map((g) => flattenSegments(g.polylines));
    const letterLens = segsByLetter.map((s) => s.reduce((a, x) => a + x.len, 0));
    const totalLen = letterLens.reduce((a, x) => a + x, 0) || 1;

    layoutRef.current = { b, letterSegs };

    const copper = "#FF6B00";
    const tin = "#00D2FF";
    const glow = "rgba(255, 200, 120, 0.35)";
    const PAUSE_MS = 220;
    const drawTimeBudget = 3200 + totalLen * 48 + groups.length * 90;
    let letterMs = letterLens.map((L) => (L / totalLen) * drawTimeBudget);
    letterMs = letterMs.map((m) => Math.max(120, m));
    const sumMs = letterMs.reduce((a, b) => a + b, 0) || 1;
    letterMs = letterMs.map((m) => (m / sumMs) * drawTimeBudget);
    const durationMs =
      letterMs.reduce((a, b) => a + b, 0) + PAUSE_MS * Math.max(0, groups.length - 1);

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? 640;
      const h = Math.max(120, Math.min(220, Math.floor(w * 0.2)));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const mapPtFactory = (w: number, h: number) => {
      const { map } = layoutFor(w, h, b);
      return (p: [number, number]) => map(p);
    };

    const thFactory = (w: number, h: number) => layoutFor(w, h, b).th;

    const finish = () => {
      if (completeRef.current) return;
      completeRef.current = true;
      phaseRef.current = "solid";
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      drawSolidBars(ctx, w, h, b, letterSegs);
      onCompleteRef.current?.();
    };

    const redrawIfSolid = () => {
      resize();
      if (phaseRef.current !== "solid" || !layoutRef.current) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      drawSolidBars(ctx, w, h, layoutRef.current.b, layoutRef.current.letterSegs);
    };

    resize();
    const ro = new ResizeObserver(redrawIfSolid);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    if (lite || groups.length === 0) {
      finish();
      return () => {
        ro.disconnect();
      };
    }

    type AnimState =
      | { mode: "drawing"; completedBefore: number; active: number; localT: number }
      | { mode: "pause"; completedThrough: number }
      | { mode: "done" };

    const animStateAt = (t: number): AnimState => {
      let rem = t;
      for (let i = 0; i < groups.length; i++) {
        const lm = letterMs[i];
        if (rem < lm) {
          return { mode: "drawing", completedBefore: i, active: i, localT: rem };
        }
        rem -= lm;
        if (i < groups.length - 1) {
          if (rem < PAUSE_MS) {
            return { mode: "pause", completedThrough: i };
          }
          rem -= PAUSE_MS;
        }
      }
      return { mode: "done" };
    };

    let raf = 0;
    const t0 = performance.now();

    const draw = (now: number) => {
      if (phaseRef.current !== "anim") return;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.miterLimit = 2;

      const mapPt = mapPtFactory(w, h);
      const th = thFactory(w, h);
      const t = now - t0;

      if (t >= durationMs) {
        finish();
        return;
      }

      const st = animStateAt(t);

      if (st.mode === "done") {
        finish();
        return;
      }

      if (st.mode === "pause") {
        for (let j = 0; j <= st.completedThrough; j++) {
          drawLetterDim(ctx, segsByLetter[j], mapPt, glow, copper);
        }
        raf = requestAnimationFrame(draw);
        return;
      }

      const { completedBefore, active, localT } = st;
      const segs = segsByLetter[active];
      const lm = letterMs[active];
      const netLen = letterLens[active] || 1;
      const travel = Math.min(netLen, (localT / lm) * netLen);

      for (let j = 0; j < completedBefore; j++) {
        drawLetterDim(ctx, segsByLetter[j], mapPt, glow, copper);
      }

      if (segs.length === 0) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const gndStart = mapPt(segs[0].a);
      drawMainGndPad(ctx, gndStart[0], gndStart[1], th, copper);

      let acc = 0;
      for (const { a, b: bpt, len } of segs) {
        const ax = mapPt(a);
        const bx = mapPt(bpt);

        if (travel <= acc) break;

        if (travel >= acc + len) {
          ctx.strokeStyle = glow;
          ctx.lineWidth = 8;
          ctx.globalAlpha = 0.38;
          ctx.beginPath();
          ctx.moveTo(ax[0], ax[1]);
          ctx.lineTo(bx[0], bx[1]);
          ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = copper;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(ax[0], ax[1]);
          ctx.lineTo(bx[0], bx[1]);
          ctx.stroke();
          drawViaGnd(ctx, bx[0], bx[1], th);
        } else {
          const local = (travel - acc) / len;
          const mx = ax[0] + (bx[0] - ax[0]) * local;
          const my = ax[1] + (bx[1] - ax[1]) * local;

          ctx.strokeStyle = glow;
          ctx.lineWidth = 9;
          ctx.globalAlpha = 0.48;
          ctx.beginPath();
          ctx.moveTo(ax[0], ax[1]);
          ctx.lineTo(mx, my);
          ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = copper;
          ctx.lineWidth = 3.2;
          ctx.beginPath();
          ctx.moveTo(ax[0], ax[1]);
          ctx.lineTo(mx, my);
          ctx.stroke();

          ctx.fillStyle = tin;
          ctx.beginPath();
          ctx.arc(mx, my, 5.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "rgba(255,255,255,0.92)";
          ctx.beginPath();
          ctx.arc(mx, my, 1.9, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        acc += len;
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [lite]); // eslint-disable-line react-hooks/exhaustive-deps -- onComplete только через ref

  return (
    <div className={`relative ${className ?? ""}`}>
      <canvas ref={canvasRef} className="block w-full max-w-4xl" aria-hidden />
    </div>
  );
}
