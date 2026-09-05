"use client";

import { useState } from "react";
import {
  research,
  additionalResearchInterests,
  certifications,
  qiskitContribution,
  archive
} from "@/data/portfolio";
import { RecordFrame } from "@/components/ui/RecordFrame";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { useTerminal } from "@/lib/terminal/TerminalContext";
import { cn } from "@/lib/utils";

export function PublicationsSection() {
  const { playTone } = useTerminal();
  const [index, setIndex] = useState(0);
  const entry = research[index]!;

  const select = (i: number) => {
    playTone("tick");
    setIndex(i);
  };

  return (
    <section id="publications" aria-labelledby="publications-heading" className="border-b border-hair py-14 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <RecordFrame
          section="06"
          title="Research work"
          recordLabel="RESEARCH ARCHIVE"
          meta={`${research.length} RECORDS`}
          footerPath="DC://ARCHIVE/RESEARCH"
          footerIndex={`06 / ${archive.totalRecords}`}
        >
          <h3 id="publications-heading" className="sr-only">
            Research work
          </h3>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,240px)_1fr]">
            <div role="tablist" aria-label="Publication records" className="flex flex-col gap-2">
              {research.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  onClick={() => select(i)}
                  className={cn(
                    "dc-press focus-ring flex flex-col gap-1 border px-4 py-3 text-left transition-colors duration-micro ease-micro",
                    i === index ? "border-accent bg-panel" : "border-hair hover:border-accent/60"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] uppercase tracking-label",
                      i === index ? "text-accent" : "text-accent-muted"
                    )}
                  >
                    PUB-{String(i + 1).padStart(3, "0")}
                  </span>
                  <span className="font-body text-sm leading-snug text-ink">{item.title}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-6 border border-hair bg-panel/40 p-5 md:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-hair pb-4">
                <span className="font-mono text-[10px] uppercase tracking-label text-accent">
                  RECORD PUB-{String(index + 1).padStart(3, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-label text-mute">
                  {entry.kind === "featured" ? "PUBLISHED" : "ACTIVE RESEARCH"}
                </span>
              </div>

              <h4 className="font-display text-[clamp(1.15rem,2.4vw,1.8rem)] uppercase leading-tight tracking-tight text-ink">
                {entry.title}
              </h4>

              <dl className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <dt className="font-mono text-[10px] uppercase tracking-label text-accent-muted">AUTHORS</dt>
                  <dd className="font-body text-sm leading-[1.7] text-ink">{entry.authors}</dd>
                </div>
                <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <dt className="font-mono text-[10px] uppercase tracking-label text-accent-muted">
                      {entry.kind === "featured" ? "VENUE" : "PRESENTED AT"}
                    </dt>
                    <dd className="font-body text-sm text-ink">{entry.venue ?? "In progress"}</dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="font-mono text-[10px] uppercase tracking-label text-accent-muted">AREA</dt>
                    <dd className="font-body text-sm text-ink">Quantum computing</dd>
                  </div>
                </div>
              </dl>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-label text-accent-muted">ABSTRACT</span>
                <p className="font-body text-[15px] leading-[1.7] text-mute">{entry.description}</p>
              </div>

              <dl className="flex flex-col divide-y divide-hair border-y border-hair">
                {[
                  ["METHOD", entry.method],
                  ["RESULT", entry.result],
                  ["NEXT", entry.nextQuestion]
                ].map(([label, value]) => (
                  <div key={label} className="grid gap-2 py-3 sm:grid-cols-[90px_1fr]">
                    <dt className="font-mono text-[10px] uppercase tracking-label text-accent-muted">{label}</dt>
                    <dd className="font-body text-sm leading-[1.7] text-ink">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {entry.links.map((link) => (
                  <ExternalLink key={link.label} href={link.url} label={`${link.label} — ${entry.title}`}>
                    {link.label.toUpperCase()} &rarr;
                  </ExternalLink>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-10 border-t border-hair pt-8 lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-label text-accent">QISKIT ADVOCATE — IBM</span>
              <p className="font-body text-[15px] leading-[1.7] text-mute">{qiskitContribution.contribution}</p>
              <ul className="flex flex-col gap-1.5 pt-1">
                {qiskitContribution.points.map((point) => (
                  <li key={point} className="flex gap-2 font-body text-sm text-ink">
                    <span className="text-accent-muted" aria-hidden>
                      —
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-label text-accent">LICENSES</span>
                <ul className="flex flex-col gap-2">
                  {certifications.map((cred) => (
                    <li key={cred.id} className="flex items-baseline justify-between gap-4 border-b border-hair pb-2">
                      <span className="font-body text-sm text-ink">{cred.title}</span>
                      <ExternalLink href={cred.url} label={cred.title}>
                        OPEN
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-label text-accent">RESEARCH INTERESTS</span>
                <div className="flex flex-wrap gap-2">
                  {additionalResearchInterests.map((interest) => (
                    <span
                      key={interest}
                      className="border border-hair px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-mute"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RecordFrame>
      </div>
    </section>
  );
}
