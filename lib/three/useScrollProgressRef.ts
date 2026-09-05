"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

/**
 * Tracks how far an element has scrolled past the top of the viewport, as a
 * 0–1 ref (not state) so 3D scenes can read it inside useFrame without
 * triggering React re-renders on every scroll tick.
 */
export function useScrollProgressRef(elementId: string): MutableRefObject<number> {
  const progressRef = useRef(0);

  useEffect(() => {
    let rafId: number | null = null;

    const measure = () => {
      rafId = null;
      const el = document.getElementById(elementId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const scrolled = window.innerHeight - rect.top;
      progressRef.current = Math.min(1, Math.max(0, scrolled / total));
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [elementId]);

  return progressRef;
}
