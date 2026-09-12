"use client";

import { useEffect, useRef } from "react";
import { navSections } from "@/data/portfolio";
import { useActiveSection } from "@/lib/useActiveSection";
import { useTerminal } from "@/lib/terminal/TerminalContext";
import { cn } from "@/lib/utils";

const sectionIds = navSections.map((s) => s.id);

/**
 * The record index on narrow screens. This is the only navigation below `lg`,
 * so it carries the whole "where am I" job the left rail does on desktop —
 * which means the active chip has to be visible, and the strip scrolls it into
 * view as the reader moves through the archive.
 */
export function MobileModuleStrip({ onNavigate }: { onNavigate: (id: string) => void }) {
  const active = useActiveSection(sectionIds);
  const { playTone } = useTerminal();
  const stripRef = useRef<HTMLElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const chip = activeRef.current;
    if (!strip || !chip) return;
    // Scroll the strip itself rather than calling scrollIntoView, which would
    // also scroll the page and fight the reader.
    const target = chip.offsetLeft - strip.clientWidth / 2 + chip.clientWidth / 2;
    strip.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  return (
    <nav
      ref={stripRef}
      aria-label="Archive record index"
      className="sticky top-[var(--topbar)] z-40 flex gap-1.5 overflow-x-auto border-b border-hair bg-ground/95 px-5 py-2.5 backdrop-blur-sm [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
    >
      {navSections.map((section) => {
        const isActive = active === section.id;
        return (
          <button
            key={section.id}
            ref={isActive ? activeRef : undefined}
            type="button"
            onClick={() => {
              playTone("tick");
              onNavigate(section.id);
            }}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "dc-press focus-ring flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap border px-3 font-mono text-meta uppercase transition-colors duration-micro",
              isActive ? "border-accent bg-accent text-ground" : "border-hair text-mute"
            )}
          >
            <span className={cn("dc-code", isActive ? "text-ground/70" : "text-accent-muted")}>{section.code}</span>
            {section.label}
          </button>
        );
      })}
    </nav>
  );
}
