"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { navSections } from "@/data/portfolio";

// Derived from the record index rather than written out, which is how the
// panel came to advertise "1 - 6" for seven records.
const SHORTCUTS: [string, string][] = [
  [`1 – ${navSections.length}`, "Open record by number"],
  ["Esc", "Close this panel"],
  ["Tab", "Move through records and controls"],
  ["← →", "Move between records in a selector"]
];

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

export function HelpModal({ open, onClose }: HelpModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    // Return focus to whatever opened the panel, so keyboard users are not
    // dropped at the top of the document on close.
    return () => restoreTo.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ground/85 px-5" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-modal-heading"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm border border-hair-strong bg-bg"
      >
        <div className="flex items-center justify-between gap-4 border-b border-hair px-4 py-3">
          <h2 id="help-modal-heading" className="font-mono text-label uppercase text-accent">
            Keyboard shortcuts
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring -m-2 flex h-11 w-11 items-center justify-center text-mute transition-colors duration-micro hover:text-accent-bright"
            aria-label="Close shortcuts panel"
          >
            <X size={16} aria-hidden />
          </button>
        </div>
        <dl className="divide-y divide-hair">
          {SHORTCUTS.map(([key, desc]) => (
            <div key={key} className="flex items-center justify-between gap-6 px-4 py-3">
              <dt className="dc-code shrink-0 font-mono text-label text-ink">{key}</dt>
              <dd className="font-body text-prose-sm text-right text-mute">{desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
