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
      className="sticky top-[73px] hidden h-[calc(100vh-73px)] w-[210px] shrink-0 flex-col justify-between border-r border-hair bg-bg/40 py-6 lg:flex"
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
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "focus-ring flex w-full items-baseline gap-3 border-l-2 px-6 py-3 text-left font-mono text-[11px] uppercase tracking-label transition-colors duration-micro ease-micro",
                  isActive
                    ? "border-accent text-accent"
                    : "border-transparent text-mute hover:border-hair hover:text-ink"
                )}
              >
                <span className={isActive ? "text-accent" : "text-accent-muted"}>{section.code}</span>
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
          className="dc-press focus-ring flex min-h-[40px] items-center justify-center border border-hair font-mono text-[10px] uppercase tracking-label text-ink transition-colors hover:border-accent hover:text-accent-bright"
        >
          RESUME
        </a>
        <button
          type="button"
          onClick={onOpenHelp}
          className="dc-press focus-ring flex min-h-[40px] items-center justify-center gap-2 border border-hair font-mono text-[10px] uppercase tracking-label text-mute transition-colors hover:border-accent hover:text-accent-bright"
        >
          <Keyboard size={12} aria-hidden />
          KEYS
        </button>
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={soundEnabled}
          className="dc-press focus-ring flex min-h-[40px] items-center justify-center gap-2 border border-hair font-mono text-[10px] uppercase tracking-label text-mute transition-colors hover:border-accent hover:text-accent-bright"
        >
          {soundEnabled ? <Volume2 size={12} aria-hidden /> : <VolumeX size={12} aria-hidden />}
          SOUND {soundEnabled ? "ON" : "OFF"}
        </button>
      </div>
    </nav>
  );
}
