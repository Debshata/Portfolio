"use client";

import { useCallback, useEffect, useState } from "react";
import { navSections } from "@/data/portfolio";
import { BootSequence } from "./BootSequence";
import { TerminalTopBar } from "./TerminalTopBar";
import { TerminalNavPane } from "./TerminalNavPane";
import { MobileModuleStrip } from "./MobileModuleStrip";
import { HelpModal } from "./HelpModal";

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
}

/** Archive shell: boot frames, system bar, record index rail and the record viewport. */
export function TerminalShell({ children }: { children: React.ReactNode }) {
  const [helpOpen, setHelpOpen] = useState(false);

  const navigateTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (helpOpen) setHelpOpen(false);
        else (document.activeElement as HTMLElement | null)?.blur();
        return;
      }

      if (isTypingTarget(event.target)) return;

      // 1-6 jump straight to a record
      const num = Number(event.key);
      if (Number.isInteger(num) && num >= 1 && num <= navSections.length) {
        const section = navSections[num - 1];
        if (section) navigateTo(section.id);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [helpOpen, navigateTo]);

  return (
    <div className="flex min-h-screen flex-col">
      <BootSequence />
      <TerminalTopBar />
      <MobileModuleStrip onNavigate={navigateTo} />
      <div className="flex flex-1">
        <TerminalNavPane onNavigate={navigateTo} onOpenHelp={() => setHelpOpen(true)} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
