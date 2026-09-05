"use client";

import { navSections } from "@/data/portfolio";
import { useActiveSection } from "@/lib/useActiveSection";
import { useTerminal } from "@/lib/terminal/TerminalContext";
import { cn } from "@/lib/utils";

const sectionIds = navSections.map((s) => s.id);

export function MobileModuleStrip({ onNavigate }: { onNavigate: (id: string) => void }) {
  const active = useActiveSection(sectionIds);
  const { playTone } = useTerminal();

  return (
    <nav
      aria-label="Archive record index"
      className="sticky top-[73px] z-40 flex gap-1 overflow-x-auto border-b border-hair bg-ground/95 px-4 py-2 backdrop-blur-sm lg:hidden"
    >
      {navSections.map((section) => {
        const isActive = active === section.id;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => {
              playTone("tick");
              onNavigate(section.id);
            }}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "dc-press focus-ring min-h-[36px] shrink-0 whitespace-nowrap border px-3 py-1.5 font-mono text-[10px] uppercase tracking-label transition-colors",
              isActive ? "border-accent bg-accent text-ground" : "border-hair text-mute"
            )}
          >
            {section.code} {section.label}
          </button>
        );
      })}
    </nav>
  );
}
