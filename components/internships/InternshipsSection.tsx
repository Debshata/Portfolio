import { internships, archive } from "@/data/portfolio";
import { RecordFrame } from "@/components/ui/RecordFrame";
import { ExperiencePipeline } from "./ExperiencePipeline";

export function InternshipsSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="border-b border-hair py-14 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <RecordFrame
          section="03"
          title="Experience records"
          recordLabel={`${internships.length} RECORDS`}
          meta="CHRONOLOGICAL"
          footerPath="DC://ARCHIVE/EXPERIENCE"
          footerIndex={`03 / ${archive.totalRecords}`}
        >
          <h3 id="experience-heading" className="sr-only">
            Experience records
          </h3>
          <ExperiencePipeline internships={internships} />
        </RecordFrame>
      </div>
    </section>
  );
}
