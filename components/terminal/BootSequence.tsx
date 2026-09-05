"use client";

import { useEffect, useState } from "react";
import { useTerminal } from "@/lib/terminal/TerminalContext";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { archive, profile } from "@/data/portfolio";

/** Frames A–D from the design sheet: initialize → load → granted → seal reveal. */
const LINES = [
  `> ${archive.systemName} — ${archive.archiveName}`,
  "> INITIALIZING…",
  "> MOUNTING /DC/RECORDS",
  "> CONNECTING TO ARCHIVE…",
  `> INDEXING ${archive.totalRecords} SECTIONS`,
  "> VERIFYING VISITOR"
];

const TICK_MS = 30;
const LOAD_MS = 2200;
const GRANTED_MS = 700;

export function BootSequence() {
  const { setBootDone } = useTerminal();
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"load" | "granted">("load");
  const [dismissed, setDismissed] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Reduced motion skips straight through; otherwise the sequence plays on
    // every load — it is the archive's front door, not a one-time gate.
    if (reducedMotion) {
      setBootDone(true);
      return;
    }
    setActive(true);

    const started = performance.now();
    const interval = setInterval(() => {
      const pct = Math.min(100, ((performance.now() - started) / LOAD_MS) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setPhase("granted");
      }
    }, TICK_MS);
    return () => clearInterval(interval);
  }, [reducedMotion, setBootDone]);

  // Once the counter tops out, hold the seal briefly then hand over to the site.
  useEffect(() => {
    if (phase !== "granted") return;
    const t = setTimeout(() => setDismissed(true), GRANTED_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (!dismissed) return;
    const t = setTimeout(() => setBootDone(true), 200);
    return () => clearTimeout(t);
  }, [dismissed, setBootDone]);

  if (!active || dismissed) return null;

  const pct = Math.floor(progress);
  const visibleLines = Math.min(LINES.length, Math.floor((progress / 100) * LINES.length) + 1);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading archive, ${pct} percent`}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center gap-10 bg-base px-6 transition-opacity duration-500 ease-standard"
    >
      {phase === "load" ? (
        <>
          <div className="w-full max-w-lg font-mono text-[11px] uppercase tracking-label">
            {LINES.slice(0, visibleLines).map((line, i) => (
              <p key={line} className="py-0.5 text-white">
                {line}
                {i === visibleLines - 1 && (
                  <span className="ml-1 inline-block h-3 w-2 animate-blink bg-white align-middle" aria-hidden />
                )}
              </p>
            ))}
          </div>

          <div className="flex w-full max-w-lg flex-col gap-4">
            <div className="flex items-end justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wide text-mute">LOADING ARCHIVE</span>
              <span className="font-display text-[clamp(3rem,10vw,6rem)] leading-none text-accent tabular-nums">
                {String(pct).padStart(3, "0")}
                <span className="ml-2 font-mono text-[clamp(0.75rem,2vw,1rem)] text-accent-muted">%</span>
              </span>
            </div>

            <div className="h-[3px] w-full bg-panel">
              <div
                className="h-[3px] bg-accent transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between font-mono text-[10px] uppercase tracking-label text-mute">
              <span>{archive.recordId}</span>
              <span>{archive.totalRecords} RECORDS</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex animate-rise flex-col items-center gap-3 text-center">
          <span className="font-display text-[clamp(1.75rem,5vw,3.25rem)] uppercase tracking-tight text-accent">
            ACCESS GRANTED
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide text-mute">
            CLEARANCE {archive.recordId} &nbsp;//&nbsp; SESSION OPEN
          </span>
          <span className="mt-6 font-display text-[clamp(1.25rem,3vw,2rem)] uppercase tracking-tight text-ink">
            {profile.name}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide text-accent-muted">
            {archive.archiveName} &nbsp;//&nbsp; {archive.recordId}
          </span>
        </div>
      )}
    </div>
  );
}
