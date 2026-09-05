"use client";

import { navSections, archive, profile } from "@/data/portfolio";
import { useActiveSection } from "@/lib/useActiveSection";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const sectionIds = navSections.map((s) => s.id);

export function TerminalTopBar() {
  const active = useActiveSection(sectionIds);
  const current = navSections.find((s) => s.id === active);

  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-ground/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-2 px-5 py-3 md:px-10">
        <a href="#main-content" className="focus-ring flex flex-col leading-none">
          <span className="font-display text-sm uppercase tracking-tight text-ink md:text-[15px]">
            {profile.name}
          </span>
          <span className="mt-1 font-mono text-[10px] uppercase tracking-wide text-accent-muted">
            ARCHIVE SYSTEM
          </span>
        </a>

        <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-label text-mute">
          <span className="hidden sm:inline">
            SYSTEM // <span className="text-accent">ACTIVE</span>
          </span>
          <span className="hidden md:inline">
            SUBJECT FILE {archive.recordId}
          </span>
          <span className="border border-hair px-2 py-1 text-accent-muted">
            {current ? `${current.code} ${current.label.toUpperCase()}` : "INDEX"}
          </span>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
