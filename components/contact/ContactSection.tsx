"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { links, archive, profileLinks } from "@/data/portfolio";
import { ArchiveButton } from "@/components/ui/ArchiveButton";
import { ArchiveLink } from "@/components/ui/ArchiveLink";
import { DownloadProgress } from "@/components/ui/DownloadProgress";
import { useTerminal } from "@/lib/terminal/TerminalContext";

const RESUME_TRANSFER_MS = 700;

/** The archive's closing screen. */
export function ContactSection() {
  const { playTone } = useTerminal();
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [resumeProgress, setResumeProgress] = useState<number | null>(null);
  const progressFrame = useRef<number>();
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(
    () => () => {
      if (progressFrame.current) cancelAnimationFrame(progressFrame.current);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    []
  );

  const handleCopyEmail = async () => {
    playTone("tick");
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      // Clipboard access can be denied outright; say so instead of looking
      // like nothing happened.
      setCopied(false);
      setCopyFailed(true);
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => {
      setCopied(false);
      setCopyFailed(false);
    }, 2600);
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
    <footer id="end" aria-labelledby="end-heading" className="py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <div className="grid gap-10 border-t border-hair pt-10 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-16">
          <div className="flex flex-col gap-5">
            <span className="dc-code font-mono text-meta uppercase text-accent-muted">DC://ARCHIVE/END</span>
            <h2 id="end-heading" className="font-display text-display-2 uppercase text-ink">
              End of record
            </h2>
            <p className="max-w-measure font-body text-lede text-body">
              The archive is complete through record {archive.totalRecords}. Open a thread about quantum machine
              learning, data systems or research collaboration — the address below reaches me directly.
            </p>
            <p className="dc-code font-mono text-meta uppercase text-mute">
              SYSTEM STATUS <span className="text-accent">ONLINE</span> {"//"} ARCHIVE {archive.recordId}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-start gap-3">
              <ArchiveButton variant="primary" onClick={handleCopyEmail} className="w-full sm:w-auto">
                {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
                <span className="min-w-0 break-all text-left normal-case tracking-normal">{links.email}</span>
              </ArchiveButton>
              {/* Copy result is announced rather than swapping the button's own
                  label, so the address stays readable while it confirms. */}
              <span aria-live="polite" className="min-h-[1.1rem] font-mono text-meta uppercase text-accent">
                {copied ? "ADDRESS COPIED TO CLIPBOARD" : copyFailed ? "COPY BLOCKED — SELECT THE ADDRESS MANUALLY" : ""}
              </span>
              <ArchiveButton onClick={handleDownloadResume} className="w-full sm:w-auto">
                DOWNLOAD RESUME
              </ArchiveButton>
              <DownloadProgress progress={resumeProgress} />
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-hair pt-4">
              {profileLinks.map((profileLink) => (
                <ArchiveLink
                  key={profileLink.label}
                  href={profileLink.url}
                  variant="tertiary"
                  external
                  onClick={() => playTone("tick")}
                >
                  {profileLink.label}
                </ArchiveLink>
              ))}
              <ArchiveLink href="#index" variant="tertiary" onClick={() => playTone("tick")}>
                BACK TO INDEX
              </ArchiveLink>
            </div>
          </div>
        </div>

        <div className="dc-code mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-hair pt-4 font-mono text-meta uppercase text-mute">
          <span>© {new Date().getFullYear()} Debshata Choudhury</span>
          <span className="text-accent-muted">SESSION CLOSED</span>
        </div>
      </div>
    </footer>
  );
}
