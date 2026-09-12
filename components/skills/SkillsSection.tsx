import { archive } from "@/data/portfolio";
import { RecordSection } from "@/components/ui/RecordSection";
import { SkillNetwork } from "./SkillNetwork";
import { TechSystemsPanel } from "./TechSystemsPanel";

export function SkillsSection() {
  return (
    <RecordSection
      id="skills"
      section="04"
      title="Technical systems"
      recordLabel="USAGE & RECENCY ONLY"
      meta="NO PROFICIENCY PERCENTAGES"
      footerPath="DC://ARCHIVE/SYSTEMS"
      footerIndex={`04 / ${archive.totalRecords}`}
      headingId="skills-heading"
    >
      {/* The matrix is the content; the neural-net model is the record's
          illustration, so it follows rather than leads. */}
      <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-start lg:gap-16">
        <SkillNetwork />
        <TechSystemsPanel />
      </div>
    </RecordSection>
  );
}
