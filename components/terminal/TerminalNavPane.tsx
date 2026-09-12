"use client";

import { navSections, links } from "@/data/portfolio";
import { useActiveSection } from "@/lib/useActiveSection";
import { useTerminal } from "@/lib/terminal/TerminalContext";
import { cn } from "@/lib/utils";
import { Keyboard, Volume2, VolumeX } from "lucide-react";

const sectionIds = navSections.map((s) => s.id);

interface TerminalNavPaneProps {
  onNavigate: (id: string) => void;
  onOpenHelp: () => void;
}

/** Fixed left index rail — the archive's table of records. */
export function TerminalNavPane({ onNavigate, onOpenHelp }: TerminalNavPaneProps) {
  const active = useActiveSection(sectionIds);
  const { soundEnabled, toggleSound, playTone } = useTerminal();

  return (
    <nav
      aria-label="Archive record index"
      className="sticky top-[var(--topbar)] hidden h-[calc(100vh-var(--topbar))] w-[210px] shrink-0 flex-col justify-between gap-8 overflow-y-auto border-r border-hair bg-bg/40 py-7 lg:flex"
    >
      <ul className="flex flex-col">
        {navSections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => {
                  playTone("tick");
                  onNavigate(section.id);
                }}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "focus-ring flex w-full items-baseline gap-3 border-l-2 px-6 py-3 text-left font-mono text-label uppercase transition-colors duration-micro ease-micro",
                  isActive
                    ? "border-accent bg-accent/[0.07] text-accent"
                    : "border-transparent text-mute hover:border-hair hover:text-ink"
                )}
              >
                <span className={cn("dc-code", isActive ? "text-accent" : "text-accent-muted")}>{section.code}</span>
                {section.label}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-2 px-6">
        <a
          href={links.resume}
          download
          onClick={() => playTone("confirm")}
          className="dc-press focus-ring flex min-h-[40px] items-center justify-center border border-hair font-mono text-meta uppercase text-ink transition-colors duration-micro hover:border-accent hover:text-accent-bright"
        >
          RESUME
        </a>
        <button
          type="button"
          onClick={onOpenHelp}
          className="dc-press focus-ring flex min-h-[40px] items-center justify-center gap-2 border border-hair font-mono text-meta uppercase text-mute transition-colors duration-micro hover:border-accent hover:text-accent-bright"
        >
          <Keyboard size={14} aria-hidden />
          KEYS
        </button>
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={soundEnabled}
          className="dc-press focus-ring flex min-h-[40px] items-center justify-center gap-2 border border-hair font-mono text-meta uppercase text-mute transition-colors duration-micro hover:border-accent hover:text-accent-bright"
        >
          {soundEnabled ? <Volume2 size={14} aria-hidden /> : <VolumeX size={14} aria-hidden />}
          SOUND {soundEnabled ? "ON" : "OFF"}
        </button>
      </div>
    </nav>
  );
}
