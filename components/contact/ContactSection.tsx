"use client";

import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { links, archive } from "@/data/portfolio";
import { ArchiveButton } from "@/components/ui/ArchiveButton";
import { ArchiveLink } from "@/components/ui/ArchiveLink";
import { DownloadProgress } from "@/components/ui/DownloadProgress";
import { useTerminal } from "@/lib/terminal/TerminalContext";

const RESUME_TRANSFER_MS = 700;

/** 08 — END OF RECORD / final system screen. */
export function ContactSection() {
  const { playTone } = useTerminal();
  const [copied, setCopied] = useState(false);
  const [resumeProgress, setResumeProgress] = useState<number | null>(null);
  const progressFrame = useRef<number>();

  const handleCopyEmail = async () => {
    playTone("tick");
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadResume = () => {
    playTone("confirm");
    if (progressFrame.current) cancelAnimationFrame(progressFrame.current);
    const start = performance.now();
    setResumeProgress(0);
    const step = (now: number) => {
      const pct = Math.min(100, ((now - start) / RESUME_TRANSFER_MS) * 100);
      setResumeProgress(pct);
      if (pct < 100) {
        progressFrame.current = requestAnimationFrame(step);
      } else {
        const a = document.createElement("a");
        a.href = links.resume;
        a.download = "";
        a.click();
        setTimeout(() => setResumeProgress(null), 900);
      }
    };
    progressFrame.current = requestAnimationFrame(step);
  };

  return (
    <footer id="end" aria-labelledby="end-heading" className="py-20 md:py-28">
      <div className="mx-auto flex max-w-content flex-col items-center gap-8 px-5 text-center md:px-10">
        <span className="font-mono text-[10px] uppercase tracking-wide text-accent-muted">DC://ARCHIVE/END</span>

        <h2
          id="end-heading"
          className="font-display text-[clamp(2.4rem,7vw,5.5rem)] uppercase leading-[0.9] tracking-tight text-ink"
        >
          End of record
        </h2>

        <p className="font-mono text-[11px] uppercase tracking-label text-mute">
          SYSTEM STATUS: <span className="text-accent">ONLINE</span> &nbsp;//&nbsp; ARCHIVE {archive.recordId}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <ArchiveButton variant="primary" onClick={handleCopyEmail} aria-live="polite">
            {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
            {copied ? "EMAIL COPIED" : links.email}
          </ArchiveButton>
          <ArchiveButton onClick={handleDownloadResume}>RESUME</ArchiveButton>
          <ArchiveLink href="#index" onClick={() => playTone("tick")}>
            RETURN TO ARCHIVE INDEX
          </ArchiveLink>
        </div>

        <DownloadProgress progress={resumeProgress} />

        <div className="mt-8 flex w-full items-center justify-between border-t border-hair pt-4 font-mono text-[10px] uppercase tracking-label text-mute">
          <span>© {new Date().getFullYear()} Debshata Choudhury</span>
          <span className="text-accent-muted">SESSION CLOSED</span>
        </div>
      </div>
    </footer>
  );
}
