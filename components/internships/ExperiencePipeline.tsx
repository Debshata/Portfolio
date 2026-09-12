"use client";

import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import type { Internship } from "@/data/portfolio";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { cn } from "@/lib/utils";

function InternshipNode({ internship, index, total }: { internship: Internship; index: number; total: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const panelId = `internship-panel-${internship.id}`;
  const isLast = index === total - 1;
  // The list runs newest-first, so the current role is index 0 — the accent
  // marker used to sit on the oldest entry while implying "current".
  const isCurrent = index === 0;

  return (
    <li className="relative flex gap-4 md:gap-6">
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "dc-code flex h-8 w-8 shrink-0 items-center justify-center border font-mono text-label tracking-normal",
            isCurrent ? "border-accent bg-accent text-ground" : "border-hair bg-alt text-accent-muted"
          )}
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {!isLast && <span className="mt-2 w-px flex-1 bg-hair" aria-hidden />}
      </div>

      <div className="min-w-0 flex-1 pb-10">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={panelId}
          className="focus-ring group flex w-full flex-col gap-1.5 text-left"
        >
          <span className="flex w-full items-start justify-between gap-3">
            <span className="min-w-0 break-words font-display text-display-3 uppercase text-ink transition-colors duration-micro group-hover:text-accent-bright">
              {internship.role}
            </span>
            <ChevronDown
              size={16}
              className={cn(
                "mt-1 shrink-0 text-accent-muted transition-transform duration-micro",
                expanded && "rotate-180"
              )}
              aria-hidden
            />
          </span>
          <span className="font-mono text-label uppercase text-accent">{internship.company}</span>
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-meta uppercase text-mute">
            <span className="dc-code">{internship.period}</span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} aria-hidden />
              {internship.location}
            </span>
          </span>
        </button>

        {expanded && (
          <div id={panelId} className="mt-5 flex flex-col gap-5">
            <p className="max-w-measure font-body text-prose text-body">{internship.description}</p>

            <ul className="flex max-w-measure flex-col gap-2">
              {internship.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 font-body text-prose-sm text-ink">
                  <span className="shrink-0 text-accent-muted" aria-hidden>
                    —
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>

            {/* Technologies used to be chained with arrow separators, which
                implied a pipeline order the stack does not have. */}
            <ul className="flex flex-wrap gap-1.5">
              {internship.technologies.map((tech) => (
                <li key={tech}>
                  <TechnicalLabel>{tech}</TechnicalLabel>
                </li>
              ))}
            </ul>

            <ExternalLink href={internship.journeyUrl} label={`Journey at ${internship.company}`}>
              JOURNEY
            </ExternalLink>
          </div>
        )}
      </div>
    </li>
  );
}

export function ExperiencePipeline({ internships }: { internships: Internship[] }) {
  return (
    <ol className="flex flex-col">
      {internships.map((internship, index) => (
        <InternshipNode key={internship.id} internship={internship} index={index} total={internships.length} />
      ))}
    </ol>
  );
}
