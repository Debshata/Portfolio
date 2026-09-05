"use client";

import { useState } from "react";
import { hackathons as projects, archive } from "@/data/portfolio";
import { RecordFrame } from "@/components/ui/RecordFrame";
import { ProjectImageSlider } from "@/components/hackathons/ProjectImageSlider";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { useTerminal } from "@/lib/terminal/TerminalContext";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const { playTone } = useTerminal();
  const [index, setIndex] = useState(0);
  const project = projects[index]!;
  const next = projects[(index + 1) % projects.length]!;

  const select = (i: number) => {
    playTone("tick");
    setIndex(i);
  };

  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-b border-hair py-14 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <RecordFrame
          section="05"
          title="Project archive"
          recordLabel={`PROJECT ${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`}
          meta="SELECT A RECORD"
          footerPath="DC://ARCHIVE/PROJECTS"
          footerIndex={`05 / ${archive.totalRecords}`}
        >
          <h3 id="projects-heading" className="sr-only">
            Project archive
          </h3>

          <div
            role="tablist"
            aria-label="Project records"
            className="mb-8 flex flex-wrap gap-2 border-b border-hair pb-4"
          >
            {projects.map((entry, i) => (
              <button
                key={entry.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => select(i)}
                className={cn(
                  "dc-press focus-ring min-h-[40px] border px-3 py-2 font-mono text-[10px] uppercase tracking-label transition-colors duration-micro ease-micro",
                  i === index
                    ? "border-accent bg-accent text-ground"
                    : "border-hair text-mute hover:border-accent hover:text-accent-bright"
                )}
              >
                {entry.project}
              </button>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-label text-accent">{project.category}</span>
                <h4 className="font-display text-[clamp(1.5rem,3.2vw,2.4rem)] uppercase leading-tight tracking-tight text-ink">
                  {project.project}
                </h4>
                <p className="font-body text-[15px] leading-snug text-accent md:text-[16px]">{project.title}</p>
                <span className="font-mono text-[11px] uppercase tracking-label text-accent-muted">
                  {project.achievement}
                </span>
              </div>

              <p className="font-body text-[15px] leading-[1.7] text-mute md:text-[17px]">{project.description}</p>

              <dl className="flex flex-col divide-y divide-hair border-y border-hair">
                {[
                  ["CHALLENGE", project.challenge],
                  ["SOLUTION", project.solution],
                  ["RESULT", project.result]
                ].map(([label, value]) => (
                  <div key={label} className="grid gap-2 py-4 sm:grid-cols-[110px_1fr]">
                    <dt className="font-mono text-[10px] uppercase tracking-label text-accent-muted">{label}</dt>
                    <dd className="font-body text-sm leading-[1.7] text-ink">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-label text-accent-muted">STACK</span>
                <p className="font-mono text-[11px] uppercase tracking-label text-mute">
                  {project.technologies.join(" · ")}
                </p>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <ExternalLink href={project.githubUrl} label={`${project.project} on GitHub`}>
                  GITHUB &rarr;
                </ExternalLink>
                <ExternalLink href={project.eventUrl} label={`About the ${project.project} event`}>
                  ABOUT EVENT &rarr;
                </ExternalLink>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <ProjectImageSlider images={project.images} projectName={project.project} />
              <button
                type="button"
                onClick={() => select((index + 1) % projects.length)}
                className="dc-press focus-ring flex min-h-[44px] items-center justify-between border border-hair px-4 py-2 text-left font-mono text-[10px] uppercase tracking-label text-mute transition-colors hover:border-accent hover:text-accent-bright"
              >
                <span>NEXT RECORD: {next.project}</span>
                <span aria-hidden>&rarr;</span>
              </button>
            </div>
          </div>
        </RecordFrame>
      </div>
    </section>
  );
}
