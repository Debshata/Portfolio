"use client";

import { profile, links, archive, interests, profileLinks } from "@/data/portfolio";
import { ArchiveHeroCanvas } from "./ArchiveHeroCanvas";
import { ArchiveLink } from "@/components/ui/ArchiveLink";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { useTerminal } from "@/lib/terminal/TerminalContext";

const META: [string, string][] = [
  ["STATUS", "ACTIVE"],
  ["SYSTEM ID", archive.recordId],
  ["SPECIALIZATION", "Data science · Quantum ML"],
  ["LOCATION", profile.location]
];

export function Hero() {
  const { playTone } = useTerminal();

  return (
    <section id="index" aria-label="Archive index" className="relative border-b border-hair">
      <div className="mx-auto max-w-content px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16">
        <div className="dc-code flex items-center justify-between gap-4 border-b border-hair pb-3 font-mono text-meta uppercase text-mute">
          <span>
            SYSTEM <span className="text-accent">ACTIVE</span> {"//"} SUBJECT FILE {archive.recordId}
          </span>
          <span className="hidden text-accent-muted sm:inline">{archive.archiveName}</span>
        </div>

        <div className="grid gap-12 pt-10 md:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div className="flex min-w-0 flex-col gap-8 md:gap-10">
            <h1 className="font-display text-display-1 uppercase text-ink">
              <span className="block">Debshata</span>
              <span className="block text-accent">Choudhury</span>
            </h1>

            <ul className="flex flex-wrap gap-1.5">
              {interests.map((interest) => (
                <li key={interest.id}>
                  <TechnicalLabel>{interest.short}</TechnicalLabel>
                </li>
              ))}
            </ul>

            <p className="max-w-measure font-body text-lede text-body">
              {profile.statement} {profile.supporting}
            </p>

            {/* Three levels rather than five peers: one action the visitor came
                for, one supporting download, and the profiles as plain links. */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <ArchiveLink href="#about" variant="primary" onClick={() => playTone("tick")}>
                  OPEN ARCHIVE &rarr;
                </ArchiveLink>
                <ArchiveLink href={links.resume} download onClick={() => playTone("confirm")}>
                  RESUME
                </ArchiveLink>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
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
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-hair pt-6 sm:grid-cols-4">
              {META.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <dt className="font-mono text-meta uppercase text-mute">{label}</dt>
                  <dd className="font-mono text-label uppercase text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ArchiveHeroCanvas />
        </div>

        <div className="dc-code mt-12 flex items-center justify-between gap-4 border-t border-hair pt-3 font-mono text-meta uppercase text-mute md:mt-16">
          <span>DC://ARCHIVE/INDEX</span>
          <span className="text-accent-muted">
            {archive.totalRecords} RECORDS<span className="hidden sm:inline"> — SCROLL TO ACCESS &darr;</span>
          </span>
        </div>
      </div>
    </section>
  );
}
