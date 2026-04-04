"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type PcbLayerContextValue = {
  /** 0 = top, 1 = inner, 2 = bottom mirror */
  layer: number;
  setLayer: (n: number) => void;
};

const PcbLayerContext = createContext<PcbLayerContextValue | null>(null);

export function PcbLayerProvider({ children }: { children: ReactNode }) {
  const [layer, setLayerState] = useState(0);
  const setLayer = useCallback((n: number) => {
    setLayerState(Math.min(2, Math.max(0, n)));
  }, []);

  const value = useMemo(() => ({ layer, setLayer }), [layer, setLayer]);

  return (
    <PcbLayerContext.Provider value={value}>{children}</PcbLayerContext.Provider>
  );
}

export function usePcbLayer() {
  const ctx = useContext(PcbLayerContext);
  if (!ctx) {
    throw new Error("usePcbLayer must be used within PcbLayerProvider");
  }
  return ctx;
}
