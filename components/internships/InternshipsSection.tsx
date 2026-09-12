import { internships, archive } from "@/data/portfolio";
import { RecordSection } from "@/components/ui/RecordSection";
import { ExperiencePipeline } from "./ExperiencePipeline";

export function InternshipsSection() {
  return (
    <RecordSection
      id="experience"
      section="03"
      title="Internship records"
      recordLabel={`${internships.length} RECORDS`}
      meta="MOST RECENT FIRST"
      footerPath="DC://ARCHIVE/EXPERIENCE"
      footerIndex={`03 / ${archive.totalRecords}`}
      headingId="experience-heading"
    >
      <ExperiencePipeline internships={internships} />
    </RecordSection>
  );
}
