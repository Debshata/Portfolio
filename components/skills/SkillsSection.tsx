import { archive } from "@/data/portfolio";
import { RecordFrame } from "@/components/ui/RecordFrame";
import { SkillNetwork } from "./SkillNetwork";
import { TechSystemsPanel } from "./TechSystemsPanel";

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-b border-hair py-14 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <RecordFrame
          section="04"
          title="Technical systems"
          recordLabel="NO PROFICIENCY PERCENTAGES"
          meta="USAGE & RECENCY ONLY"
          footerPath="DC://ARCHIVE/SYSTEMS"
          footerIndex={`04 / ${archive.totalRecords}`}
        >
          <h3 id="skills-heading" className="sr-only">
            Technical systems and capability matrix
          </h3>
          <div className="flex flex-col gap-12">
            <TechSystemsPanel />
            <SkillNetwork />
          </div>
        </RecordFrame>
      </div>
    </section>
  );
}
