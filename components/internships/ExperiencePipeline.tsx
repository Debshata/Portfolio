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

  return (
    <div className="relative flex gap-6">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center border font-mono text-xs",
            isLast ? "border-accent bg-accent text-ground" : "border-accent/60 bg-alt text-accent-bright"
          )}
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        {!isLast && <div className="w-px flex-1 bg-hair" aria-hidden />}
      </div>

      <div className="flex-1 pb-12">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={panelId}
          className="focus-ring flex w-full flex-col gap-1 text-left"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-display text-lg font-semibold text-ink md:text-xl">{internship.role}</span>
            <ChevronDown size={18} className={cn("shrink-0 text-accent transition-transform", expanded && "rotate-180")} aria-hidden />
          </div>
          <span className="font-mono text-xs uppercase tracking-label text-accent">{internship.company}</span>
          <span className="flex items-center gap-3 font-mono text-xs text-mute">
            <span>{internship.period}</span>
            <span className="flex items-center gap-1">
              <MapPin size={11} aria-hidden />
              {internship.location}
            </span>
          </span>
        </button>

        {expanded && (
          <div id={panelId} className="mt-4 flex flex-col gap-4">
            <p className="font-body text-[16px] leading-relaxed text-ink">{internship.description}</p>
            <ul className="flex flex-col gap-1">
              {internship.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-2 font-body text-sm text-accent">
                  <span aria-hidden>—</span>
                  {outcome}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-2">
              {internship.technologies.map((tech, i) => (
                <div key={tech} className="flex items-center gap-2">
                  <TechnicalLabel>{tech}</TechnicalLabel>
                  {i < internship.technologies.length - 1 && (
                    <span className="text-hair" aria-hidden>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
            <ExternalLink href={internship.journeyUrl} label={`Journey at ${internship.company}`}>
              JOURNEY &rarr;
            </ExternalLink>
          </div>
        )}
      </div>
    </div>
  );
}

export function ExperiencePipeline({ internships }: { internships: Internship[] }) {
  return (
    <div>
      {internships.map((internship, index) => (
        <InternshipNode key={internship.id} internship={internship} index={index} total={internships.length} />
      ))}
    </div>
  );
}
