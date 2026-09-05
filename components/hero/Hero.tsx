"use client";

import { profile, links, archive, interests, profileLinks } from "@/data/portfolio";
import { ArchiveHeroCanvas } from "./ArchiveHeroCanvas";
import { ArchiveLink } from "@/components/ui/ArchiveLink";
import { useTerminal } from "@/lib/terminal/TerminalContext";

const META: [string, string][] = [
  ["SUBJECT", "Debshata Choudhury"],
  ["STATUS", "ACTIVE"],
  ["SYSTEM ID", archive.recordId],
  ["SPECIALIZATION", "Data science · Quantum ML"],
  ["LOCATION", profile.location]
];

export function Hero() {
  const { playTone } = useTerminal();

  return (
    <section id="index" aria-label="Archive index" className="relative border-b border-hair">
      <div className="mx-auto max-w-content px-5 pb-16 pt-12 md:px-10 md:pb-24 md:pt-20">
        <div className="flex items-center justify-between border-b border-hair pb-3 font-mono text-[10px] uppercase tracking-wide text-mute">
          <span>
            SYSTEM // <span className="text-accent">ACTIVE</span> &nbsp;&mdash;&nbsp; SUBJECT FILE {archive.recordId}
          </span>
          <span className="hidden sm:inline text-accent-muted">{archive.archiveName}</span>
        </div>

        <div className="grid gap-12 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="flex flex-col gap-8">
            <h1 className="font-display uppercase leading-[0.88] tracking-tight text-ink">
              <span className="block text-[clamp(3rem,8vw,7.4rem)]">Debshata</span>
              <span className="block text-[clamp(3rem,8vw,7.4rem)] text-accent">Choudhury</span>
            </h1>

            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest.id}
                  className="border border-hair px-3 py-1.5 font-mono text-[10px] uppercase tracking-label text-mute"
                >
                  {interest.short}
                </span>
              ))}
            </div>

            <p className="max-w-2xl font-body text-[15px] leading-[1.7] text-mute md:text-[17px]">
              {profile.statement} {profile.supporting}
            </p>

            <div className="flex flex-wrap gap-3">
              <ArchiveLink href="#about" variant="primary" onClick={() => playTone("tick")}>
                OPEN ARCHIVE &rarr;
              </ArchiveLink>
              <ArchiveLink href={links.resume} download onClick={() => playTone("confirm")}>
                RESUME
              </ArchiveLink>
              {profileLinks.map((profileLink) => (
                <ArchiveLink
                  key={profileLink.label}
                  href={profileLink.url}
                  external
                  onClick={() => playTone("tick")}
                >
                  {profileLink.label}
                </ArchiveLink>
              ))}
            </div>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-3 border-t border-hair pt-6 sm:grid-cols-3">
              {META.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1">
                  <dt className="font-mono text-[10px] uppercase tracking-label text-accent-muted">{label}</dt>
                  <dd className="font-mono text-[11px] uppercase tracking-label text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ArchiveHeroCanvas />
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-hair pt-3 font-mono text-[10px] uppercase tracking-wide text-mute">
          <span>DC://ARCHIVE/INDEX &nbsp;&mdash;&nbsp; {archive.totalRecords} RECORDS AVAILABLE</span>
          <span className="text-accent-muted">SCROLL TO ACCESS &darr;</span>
        </div>
      </div>
    </section>
  );
}
