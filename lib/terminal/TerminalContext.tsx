"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { commands, resolveCommand, resumeUrl } from "@/data/commands";
import { links, navSections } from "@/data/portfolio";
import { playInterfaceTone } from "./sound";

export interface LogEntry {
  id: number;
  kind: "input" | "output";
  text: string;
}

interface TerminalContextValue {
  bootDone: boolean;
  setBootDone: (v: boolean) => void;
  log: LogEntry[];
  runCommand: (raw: string) => void;
  clearLog: () => void;
  history: string[];
  commandBarOpen: boolean;
  openCommandBar: () => void;
  closeCommandBar: () => void;
  toggleCommandBar: () => void;
  terminalMinimized: boolean;
  minimizeTerminal: () => void;
  restoreTerminal: () => void;
  toggleTerminalMinimized: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playTone: (kind?: "tick" | "confirm") => void;
}

const TerminalContext = createContext<TerminalContextValue | null>(null);

function navigateToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [bootDone, setBootDone] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([
    { id: 0, kind: "output", text: "Type `help` to list every available command." }
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [commandBarOpen, setCommandBarOpen] = useState(false);
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const idRef = useRef(1);

  const playTone = useCallback(
    (kind: "tick" | "confirm" = "tick") => {
      if (soundEnabled) playInterfaceTone(kind);
    },
    [soundEnabled]
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled((v) => {
      const next = !v;
      if (next) playInterfaceTone("confirm");
      return next;
    });
  }, []);

  const pushLog = useCallback((entries: Omit<LogEntry, "id">[]) => {
    setLog((prev) => [
      ...prev,
      ...entries.map((entry) => ({ ...entry, id: idRef.current++ }))
    ]);
  }, []);

  const clearLog = useCallback(() => {
    setLog([]);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;
      setHistory((prev) => [...prev, trimmed]);
      pushLog([{ kind: "input", text: trimmed }]);

      const def = resolveCommand(trimmed);
      if (soundEnabled) playInterfaceTone(def ? "confirm" : "tick");
      if (!def) {
        pushLog([
          {
            kind: "output",
            text: `[ERROR] Unknown command "${trimmed}". Type \`help\` for a list of commands.`
          }
        ]);
        return;
      }

      const action = def.action;
      switch (action.type) {
        case "navigate": {
          navigateToSection(action.sectionId);
          const label = navSections.find((s) => s.id === action.sectionId)?.label ?? action.sectionId;
          pushLog([{ kind: "output", text: `[OK] Loading module: ${label.toUpperCase()}` }]);
          break;
        }
        case "help": {
          const lines = commands
            .filter((c, i, arr) => arr.findIndex((x) => x.command === c.command) === i)
            .map((c) => `  ${c.command.padEnd(20, " ")} — ${c.description}`);
          pushLog([
            { kind: "output", text: "[OK] Available commands:" },
            ...lines.map((text) => ({ kind: "output" as const, text }))
          ]);
          break;
        }
        case "clear": {
          clearLog();
          break;
        }
        case "status": {
          pushLog([
            {
              kind: "output",
              text: "[OK] STATUS: ONLINE — all research modules mounted and responsive."
            }
          ]);
          break;
        }
        case "resume": {
          pushLog([{ kind: "output", text: "[OK] Résumé transfer initiated — 0%" }]);
          const a = document.createElement("a");
          a.href = resumeUrl;
          a.download = "";
          a.click();
          setTimeout(() => {
            pushLog([{ kind: "output", text: "[OK] Résumé transfer complete — 100%" }]);
          }, 500);
          break;
        }
        case "contact-email": {
          navigator.clipboard?.writeText(links.email).catch(() => {});
          pushLog([{ kind: "output", text: `[OK] Email copied to clipboard: ${links.email}` }]);
          navigateToSection("end");
          break;
        }
        case "contact-linkedin": {
          if (!links.linkedin.startsWith("ADD_")) window.open(links.linkedin, "_blank", "noopener,noreferrer");
          pushLog([
            {
              kind: "output",
              text: links.linkedin.startsWith("ADD_")
                ? "[PENDING] LinkedIn URL not yet configured."
                : "[OK] Opening LinkedIn profile in a new tab."
            }
          ]);
          break;
        }
        case "contact-github": {
          if (!links.github.startsWith("ADD_")) window.open(links.github, "_blank", "noopener,noreferrer");
          pushLog([
            {
              kind: "output",
              text: links.github.startsWith("ADD_")
                ? "[PENDING] GitHub URL not yet configured."
                : "[OK] Opening GitHub profile in a new tab."
            }
          ]);
          break;
        }
        
        
        
        
        
        
        case "theme": {
          pushLog([{ kind: "output", text: "[OK] Theme locked to the DC Archives palette." }]);
          break;
        }
      }
    },
    [pushLog, clearLog, soundEnabled]
  );

  const value = useMemo<TerminalContextValue>(
    () => ({
      bootDone,
      setBootDone,
      log,
      runCommand,
      clearLog,
      history,
      commandBarOpen,
      openCommandBar: () => setCommandBarOpen(true),
      closeCommandBar: () => setCommandBarOpen(false),
      toggleCommandBar: () => setCommandBarOpen((v) => !v),
      terminalMinimized,
      minimizeTerminal: () => setTerminalMinimized(true),
      restoreTerminal: () => setTerminalMinimized(false),
      toggleTerminalMinimized: () => setTerminalMinimized((v) => !v),
      soundEnabled,
      toggleSound,
      playTone
    }),
    [bootDone, log, runCommand, clearLog, history, commandBarOpen, terminalMinimized, soundEnabled, toggleSound, playTone]
  );

  return <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>;
}

export function useTerminal(): TerminalContextValue {
  const ctx = useContext(TerminalContext);
  if (!ctx) throw new Error("useTerminal must be used within TerminalProvider");
  return ctx;
}
