"use client";

import { useState } from "react";
import {
  research,
  additionalResearchInterests,
  certifications,
  qiskitContribution,
  archive
} from "@/data/portfolio";
import { RecordSection } from "@/components/ui/RecordSection";
import { RecordTabs } from "@/components/ui/RecordTabs";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { useTerminal } from "@/lib/terminal/TerminalContext";

export function PublicationsSection() {
  const { playTone } = useTerminal();
  const [index, setIndex] = useState(0);
  const entry = research[index];

  const select = (i: number) => {
    playTone("tick");
    setIndex(i);
  };

  if (!entry) return null;

  return (
    <RecordSection
      id="publications"
      section="06"
      title="Research work"
      recordLabel="RESEARCH ARCHIVE"
      meta={`${research.length} RECORDS`}
      footerPath="DC://ARCHIVE/RESEARCH"
      footerIndex={`06 / ${archive.totalRecords}`}
      headingId="publications-heading"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-16">
        <RecordTabs
          label="Research records"
          idPrefix="research"
          orientation="vertical"
          items={research.map((item, i) => ({
            id: item.id,
            label: item.title,
            hint: `PUB-${String(i + 1).padStart(3, "0")}`
          }))}
          selected={index}
          onSelect={select}
        />

        {/* The selected record was a bordered panel inside the bordered record
            frame inside the bordered section. The frame is gone, so this reads
            as the record's body without any box at all. */}
        <div id="research-panel" role="tabpanel" aria-labelledby={`research-tab-${index}`} tabIndex={-1}>
          <div className="flex min-w-0 flex-col gap-6">
            <div className="dc-code flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-meta uppercase">
              <span className="text-accent-muted">RECORD PUB-{String(index + 1).padStart(3, "0")}</span>
              <span className="text-mute">{entry.kind === "featured" ? "PUBLISHED" : "ACTIVE RESEARCH"}</span>
            </div>

            <h3 className="max-w-measure font-display text-display-3 uppercase text-ink">{entry.title}</h3>

            <dl className="flex flex-col gap-5">
              <div className="flex max-w-measure flex-col gap-1.5">
                <dt className="font-mono text-meta uppercase text-accent-muted">AUTHORS</dt>
                <dd className="font-body text-prose-sm text-ink">{entry.authors}</dd>
              </div>
              <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <dt className="font-mono text-meta uppercase text-accent-muted">
                    {entry.kind === "featured" ? "VENUE" : "PRESENTED AT"}
                  </dt>
                  <dd className="font-body text-prose-sm text-ink">{entry.venue ?? "In progress"}</dd>
                </div>
                <div className="flex flex-col gap-1.5">
                  <dt className="font-mono text-meta uppercase text-accent-muted">AREA</dt>
                  <dd className="font-body text-prose-sm text-ink">Quantum computing</dd>
                </div>
              </div>
            </dl>

            <div className="flex max-w-measure flex-col gap-2">
              <span className="font-mono text-meta uppercase text-accent-muted">ABSTRACT</span>
              <p className="font-body text-prose text-body">{entry.description}</p>
            </div>

            <dl className="flex max-w-measure flex-col divide-y divide-hair border-y border-hair">
              {[
                ["METHOD", entry.method],
                ["RESULT", entry.result],
                ["NEXT", entry.nextQuestion]
              ].map(([label, value]) => (
                <div key={label} className="grid gap-1.5 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                  <dt className="font-mono text-meta uppercase text-accent-muted">{label}</dt>
                  <dd className="font-body text-prose-sm text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-1">
              {entry.links.map((link) => (
                <ExternalLink key={link.label} href={link.url} label={`${link.label} — ${entry.title}`}>
                  {link.label.toUpperCase()}
                </ExternalLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-12 border-t border-hair pt-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex max-w-measure flex-col gap-3">
          <h3 className="font-mono text-label uppercase text-accent">QISKIT ADVOCATE — IBM</h3>
          <p className="font-body text-prose text-body">{qiskitContribution.contribution}</p>
          <ul className="mt-1 flex flex-col gap-2">
            {qiskitContribution.points.map((point) => (
              <li key={point} className="flex gap-3 font-body text-prose-sm text-ink">
                <span className="shrink-0 text-accent-muted" aria-hidden>
                  —
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-label uppercase text-accent">LICENSES</h3>
            <ul className="flex flex-col">
              {certifications.map((cred) => (
                <li
                  key={cred.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-hair py-3"
                >
                  <span className="font-body text-prose-sm text-ink">{cred.title}</span>
                  <ExternalLink href={cred.url} label={cred.title}>
                    OPEN
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-label uppercase text-accent">RESEARCH INTERESTS</h3>
            <ul className="flex flex-wrap gap-1.5">
              {additionalResearchInterests.map((interest) => (
                <li key={interest}>
                  <TechnicalLabel>{interest}</TechnicalLabel>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </RecordSection>
  );
}
