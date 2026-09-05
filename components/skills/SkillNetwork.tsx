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
      <div className="flex flex-col gap-6">
        {CATEGORIES.map((category) => (
          <div key={category} className="flex flex-col gap-2.5">
            <span className="font-mono text-xs uppercase tracking-label text-accent">{category}</span>
            <ul className="flex flex-wrap gap-2">
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
                        "focus-ring border px-3 py-1.5 font-mono text-xs tracking-wide transition-colors",
                        selected?.id === skill.id
                          ? "border-accent bg-accent text-base"
                          : "border-hair bg-alt/50 text-ink hover:border-accent/60"
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

      <div
        className="min-h-[3.5rem] border-l-2 border-accent pl-4 font-mono text-xs uppercase tracking-label text-mute"
        aria-live="polite"
      >
        {selected
          ? relatedLabels.length > 0
            ? `${selected.name} connects to: ${relatedLabels.join(" · ")}`
            : `${selected.name} — general capability`
          : "Select a skill to see where it has been applied"}
      </div>
    </div>
  );
}
