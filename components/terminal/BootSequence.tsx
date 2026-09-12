"use client";

import { useEffect, useRef, useState } from "react";
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
const LOAD_MS = 1600;
const GRANTED_MS = 600;
const SEEN_KEY = "dc-archive-booted";

export function BootSequence() {
  const { setBootDone } = useTerminal();
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"load" | "granted">("load");
  const [dismissed, setDismissed] = useState(false);
  const [active, setActive] = useState(false);

  // The decision is made once and kept in a ref. It must not live in the same
  // effect as the timer: under StrictMode the effect body runs twice, and a
  // single combined effect would write the session key on the first pass, then
  // read it back on the second, bail out early, and leave the overlay mounted
  // with the counter frozen at 000.
  const decided = useRef(false);

  useEffect(() => {
    if (decided.current) return;
    decided.current = true;

    // The boot sequence is the archive's front door and part of its identity,
    // but replaying it on every load — including a back-navigation — turns an
    // authored moment into a toll. It plays once per session; reduced motion
    // skips it entirely.
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Private modes can throw on access; treat that as a first visit.
    }

    if (reducedMotion || seen) {
      setBootDone(true);
      return;
    }

    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Non-fatal: the sequence simply plays again next load.
    }
    setActive(true);
  }, [reducedMotion, setBootDone]);

  // The timer is its own effect, so remounting restarts it cleanly.
  useEffect(() => {
    if (!active) return;
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
  }, [active]);

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
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center gap-10 bg-ground px-6 transition-opacity duration-500 ease-standard"
    >
      {phase === "load" ? (
        <>
          <div className="w-full max-w-lg font-mono text-label uppercase">
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
              <span className="font-mono text-meta uppercase text-mute">LOADING ARCHIVE</span>
              <span className="dc-code font-display text-display-1 leading-none text-accent">
                {String(pct).padStart(3, "0")}
                <span className="ml-2 font-mono text-label text-accent-muted">%</span>
              </span>
            </div>

            <div className="h-[3px] w-full bg-panel">
              <div
                className="h-[3px] bg-accent transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between font-mono text-meta uppercase text-mute">
              <span>{archive.recordId}</span>
              <span>{archive.totalRecords} RECORDS</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex animate-rise flex-col items-center gap-3 text-center">
          <span className="font-display text-display-2 uppercase text-accent">ACCESS GRANTED</span>
          <span className="font-mono text-meta uppercase text-mute">
            CLEARANCE {archive.recordId} &nbsp;//&nbsp; SESSION OPEN
          </span>
          <span className="mt-6 font-display text-display-3 uppercase text-ink">{profile.name}</span>
          <span className="font-mono text-meta uppercase text-accent-muted">
            {archive.archiveName} &nbsp;//&nbsp; {archive.recordId}
          </span>
        </div>
      )}
    </div>
  );
}
