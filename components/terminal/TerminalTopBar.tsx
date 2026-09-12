"use client";

import { navSections, archive, profile } from "@/data/portfolio";
import { useActiveSection } from "@/lib/useActiveSection";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const sectionIds = navSections.map((s) => s.id);

/**
 * The system bar. Its height is fixed to the `--topbar` token rather than left
 * to its contents: the nav rail and the mobile strip stick beneath it, and
 * they previously each hard-coded 73px for a bar that actually changed height
 * when its meta row wrapped.
 */
export function TerminalTopBar() {
  const active = useActiveSection(sectionIds);
  const current = navSections.find((s) => s.id === active);

  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-ground/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[calc(var(--topbar)-1px)] max-w-content items-center justify-between gap-4 px-5 md:px-10">
        <a href="#main-content" className="focus-ring -mx-2 flex min-h-[44px] flex-col justify-center px-2 leading-none">
          <span className="font-display text-[1.0625rem] uppercase text-ink md:text-[1.1875rem]">{profile.name}</span>
          <span className="mt-0.5 font-mono text-meta uppercase text-accent-muted">ARCHIVE SYSTEM</span>
        </a>

        <div className="dc-code flex items-center gap-5 font-mono text-meta uppercase text-mute">
          <span className="hidden md:inline">SUBJECT FILE {archive.recordId}</span>
          <span className="border border-hair px-2 py-1 text-accent-muted">
            {current ? `${current.code} ${current.label.toUpperCase()}` : "INDEX"}
          </span>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
