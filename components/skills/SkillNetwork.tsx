"use client";

import { useMemo, useState } from "react";
import { skills, internships, hackathons, interests, type Skill, type SkillCategory } from "@/data/portfolio";
import { useTerminal } from "@/lib/terminal/TerminalContext";
import { cn } from "@/lib/utils";

const CATEGORIES: SkillCategory[] = [
  "Programming",
  "Big Data",
  "Databases",
  "Machine Learning",
  "Data Engineering",
  "Visualisation",
  "Backend",
  "Tools"
];

function labelForRelation(id: string): string | null {
  return (
    internships.find((i) => i.id === id)?.company ??
    hackathons.find((h) => h.id === id)?.project ??
    interests.find((i) => i.id === id)?.short ??
    null
  );
}

export function SkillNetwork() {
  const { playTone } = useTerminal();
  const [selected, setSelected] = useState<Skill | null>(null);

  const relatedLabels = useMemo(() => {
    if (!selected) return [];
    return selected.relatedTo.map(labelForRelation).filter((v): v is string => Boolean(v));
  }, [selected]);

  return (
    <div className="flex flex-col gap-8">
      {/* Category names sit in the dim voice: eight yellow headings competed
          with the one line that actually reports state below. */}
      <div className="flex flex-col gap-7">
        {CATEGORIES.map((category) => (
          <div key={category} className="flex flex-col gap-2.5">
            <h3 className="font-mono text-meta uppercase text-accent-muted">{category}</h3>
            <ul className="flex flex-wrap gap-1.5">
              {skills
                .filter((s) => s.category === category)
                .map((skill) => (
                  <li key={skill.id}>
                    <button
                      type="button"
                      onClick={() => {
                        playTone("tick");
                        setSelected((current) => (current?.id === skill.id ? null : skill));
                      }}
                      aria-pressed={selected?.id === skill.id}
                      className={cn(
                        "focus-ring inline-flex min-h-[44px] items-center border px-3 py-1.5 font-mono text-label tracking-normal transition-colors duration-micro sm:min-h-0",
                        selected?.id === skill.id
                          ? "border-accent bg-accent text-ground"
                          : "border-hair bg-alt/50 text-body hover:border-accent hover:text-accent-bright"
                      )}
                    >
                      {skill.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <p
        className="min-h-[3.5rem] border-l border-hair pl-4 font-mono text-label uppercase text-mute"
        aria-live="polite"
      >
        {selected ? (
          relatedLabels.length > 0 ? (
            <>
              <span className="text-accent">{selected.name}</span> applied at {relatedLabels.join(" · ")}
            </>
          ) : (
            <>
              <span className="text-accent">{selected.name}</span> — general capability
            </>
          )
        ) : (
          "Select a system to see where it has been applied"
        )}
      </p>
    </div>
  );
}
