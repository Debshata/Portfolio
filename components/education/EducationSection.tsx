import { degrees, degreeConvergence, archive } from "@/data/portfolio";
import { RecordSection } from "@/components/ui/RecordSection";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

export function EducationSection() {
  return (
    <RecordSection
      id="education"
      section="02"
      title="Timeline archive"
      recordLabel="EDUCATION RECORDS"
      meta={`${degrees.length} ENTRIES INDEXED`}
      footerPath="DC://ARCHIVE/EDUCATION"
      footerIndex={`02 / ${archive.totalRecords}`}
      headingId="education-heading"
    >
      <ol className="relative flex flex-col gap-12 border-l border-hair pl-5 md:pl-10">
        {degrees.map((degree, i) => (
          <li key={degree.id} className="relative">
            <span
              className="absolute -left-[21px] top-2.5 h-1.5 w-1.5 bg-accent-muted md:-left-[41px]"
              aria-hidden
            />
            {/* Period leads the entry: a timeline is read by date first. */}
            <div className="dc-code flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-meta uppercase">
              <span className="text-accent">{degree.period}</span>
              <span className="text-mute">EDU-{String(i + 1).padStart(3, "0")}</span>
            </div>

            <h3 className="mt-3 font-display text-display-3 uppercase text-ink">{degree.institution}</h3>
            <p className="mt-1.5 max-w-measure font-body text-prose-sm text-body">{degree.degree}</p>

            {degree.status && (
              <div className="mt-5 flex flex-col gap-1.5">
                <span className="font-mono text-meta uppercase text-accent-muted">ACHIEVEMENTS</span>
                <p className="max-w-measure font-body text-prose-sm text-ink">{degree.status}</p>
              </div>
            )}

            <div className="mt-5 flex flex-col gap-2">
              <span className="font-mono text-meta uppercase text-accent-muted">COURSEWORK</span>
              <ul className="flex flex-wrap gap-1.5">
                {degree.coursework.map((course) => (
                  <li key={course}>
                    <TechnicalLabel>{course}</TechnicalLabel>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}

        {/* The convergence closes the timeline — the one place in this record
            where yellow carries a full line, because it is the conclusion the
            two degrees are building toward. */}
        <li className="relative">
          <span className="absolute -left-[23px] top-2 h-2.5 w-2.5 bg-accent md:-left-[43px]" aria-hidden />
          <span className="font-mono text-meta uppercase text-accent-muted">CONVERGENCE</span>
          <p className="mt-2 max-w-measure font-display text-display-3 uppercase text-accent">{degreeConvergence}</p>
        </li>
      </ol>
    </RecordSection>
  );
}
