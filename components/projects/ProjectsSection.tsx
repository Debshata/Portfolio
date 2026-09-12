"use client";

import { useState } from "react";
import { hackathons as projects, archive } from "@/data/portfolio";
import { RecordSection } from "@/components/ui/RecordSection";
import { RecordTabs } from "@/components/ui/RecordTabs";
import { ProjectImageSlider } from "@/components/hackathons/ProjectImageSlider";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { useTerminal } from "@/lib/terminal/TerminalContext";

export function ProjectsSection() {
  const { playTone } = useTerminal();
  const [index, setIndex] = useState(0);
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const select = (i: number) => {
    playTone("tick");
    setIndex(i);
  };

  // An empty project list is a data state, not a crash.
  if (!project || !next) return null;

  return (
    <RecordSection
      id="projects"
      section="05"
      title="Project archive"
      recordLabel={`PROJECT ${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`}
      meta="SELECT A RECORD"
      footerPath="DC://ARCHIVE/PROJECTS"
      footerIndex={`05 / ${archive.totalRecords}`}
      headingId="projects-heading"
    >
      <RecordTabs
        label="Project records"
        idPrefix="project"
        items={projects.map((entry) => ({ id: entry.id, label: entry.project }))}
        selected={index}
        onSelect={select}
        className="mb-10 border-b border-hair pb-5"
      />

      <div
        id="project-panel"
        role="tabpanel"
        aria-labelledby={`project-tab-${index}`}
        tabIndex={-1}
        className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] lg:items-start lg:gap-14"
      >
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-meta uppercase text-accent-muted">{project.category}</span>
            <h3 className="font-display text-display-3 uppercase text-ink">{project.project}</h3>
            <p className="max-w-measure font-body text-lede text-accent">{project.title}</p>
            <span className="font-mono text-label uppercase text-mute">{project.achievement}</span>
          </div>

          <p className="max-w-measure font-body text-lede text-body">{project.description}</p>

          {/* The write-up is the author's own account of the build, so it keeps
              a marked-off quote setting rather than another box. */}
          <div className="flex max-w-measure flex-col gap-3 border-l border-hair pl-5">
            <span className="font-mono text-meta uppercase text-accent-muted">THE PROTOTYPE</span>
            {project.writeup.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="font-body text-prose text-body">
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="flex max-w-measure flex-col divide-y divide-hair border-y border-hair">
            {[
              ["CHALLENGE", project.challenge],
              ["SOLUTION", project.solution],
              ["RESULT", project.result]
            ].map(([label, value]) => (
              <div key={label} className="grid gap-1.5 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <dt className="font-mono text-meta uppercase text-accent-muted">{label}</dt>
                <dd className="font-body text-prose-sm text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex max-w-measure flex-col gap-2">
            <span className="font-mono text-meta uppercase text-accent-muted">STACK</span>
            <p className="font-mono text-label uppercase text-mute">{project.technologies.join(" · ")}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-1">
            <ExternalLink href={project.githubUrl} label={`${project.project} on GitHub`}>
              GITHUB
            </ExternalLink>
            <ExternalLink href={project.eventUrl} label={`About the ${project.project} event`}>
              ABOUT EVENT
            </ExternalLink>
          </div>
        </div>

        {/* The written record runs long; the images stay in view beside it
            rather than scrolling away at the top of the record. */}
        <div className="flex flex-col gap-3 lg:sticky lg:top-[calc(var(--topbar)+2rem)]">
          <ProjectImageSlider images={project.images} projectName={project.project} />
          <button
            type="button"
            onClick={() => select((index + 1) % projects.length)}
            className="dc-press focus-ring flex min-h-[44px] items-center justify-between gap-4 border border-hair px-4 py-2 text-left font-mono text-meta uppercase text-mute transition-colors duration-micro hover:border-accent hover:text-accent-bright"
          >
            <span className="truncate">NEXT RECORD: {next.project}</span>
            <span aria-hidden>&rarr;</span>
          </button>
        </div>
      </div>
    </RecordSection>
  );
}
