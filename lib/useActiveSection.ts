"use client";

import { useEffect, useState } from "react";

/**
 * Reports which record the reader is currently in.
 *
 * This previously used an IntersectionObserver with a thin `-20% 0px -60%`
 * band and element-relative thresholds. That combination cannot see a tall
 * section: a record several viewports high never occupies 10% *of its own
 * height* inside a 20%-tall band, so it never reported as intersecting and the
 * index kept naming the previous record — the rail read "03 Experience" while
 * the reader was well into Projects.
 *
 * A single reference line a third of the way down the viewport is
 * height-independent: the active record is simply the last one whose top edge
 * has crossed it.
 */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    let frame = 0;
    let settle: ReturnType<typeof setTimeout> | undefined;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.34;
      let current = sectionIds[0] ?? "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= line && bottom > line) {
          current = id;
          break;
        }
        if (top <= line) current = id;
      }

      // Near the very bottom the last record may not reach the line at all.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = sectionIds[sectionIds.length - 1] ?? current;

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      // Lenis animates past its last emitted scroll event, so a frame-throttled
      // measure alone can settle on a stale record. Re-measure once the scroll
      // has actually stopped.
      if (settle) clearTimeout(settle);
      settle = setTimeout(measure, 140);
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (settle) clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  return active;
}
