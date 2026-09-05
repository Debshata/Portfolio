"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const SHORTCUTS: [string, string][] = [
  ["1 - 6", "Open record by number"],
  ["Esc", "Close this panel"],
  ["Tab", "Move through records and controls"]
];

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

export function HelpModal({ open, onClose }: HelpModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ground/80 px-4" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-modal-heading"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md border border-accent/60 bg-bg"
      >
        <div className="flex items-center justify-between border-b border-accent/30 px-4 py-2.5">
          <h2 id="help-modal-heading" className="font-mono text-xs uppercase tracking-label text-accent-bright">
            Keyboard Shortcuts
          </h2>
          <button type="button" onClick={onClose} className="focus-ring text-mute hover:text-accent-bright" aria-label="Close shortcuts panel">
            <X size={16} aria-hidden />
          </button>
        </div>
        <dl className="divide-y divide-hair">
          {SHORTCUTS.map(([key, desc]) => (
            <div key={key} className="flex items-center justify-between gap-4 px-4 py-2.5">
              <dt className="font-mono text-xs text-accent-bright">{key}</dt>
              <dd className="font-mono text-xs text-mute">{desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
