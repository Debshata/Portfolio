import { degrees, degreeConvergence, archive } from "@/data/portfolio";
import { RecordFrame } from "@/components/ui/RecordFrame";

export function EducationSection() {
  return (
    <section id="education" aria-labelledby="education-heading" className="border-b border-hair py-14 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <RecordFrame
          section="02"
          title="Timeline archive"
          recordLabel="EDUCATION RECORDS"
          meta={`${degrees.length} ENTRIES INDEXED`}
          footerPath="DC://ARCHIVE/EDUCATION"
          footerIndex={`02 / ${archive.totalRecords}`}
        >
          <h3 id="education-heading" className="sr-only">
            Education timeline
          </h3>

          <ol className="relative flex flex-col gap-10 border-l border-hair pl-6 md:pl-10">
            {degrees.map((degree, i) => (
              <li key={degree.id} className="relative">
                <span
                  className="absolute -left-[25px] top-2 h-2 w-2 border border-accent bg-ground md:-left-[41px]"
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-label text-accent-muted">
                    RECORD EDU-{String(i + 1).padStart(3, "0")}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-label text-accent">{degree.period}</span>
                </div>

                <h4 className="mt-3 font-display text-[clamp(1.2rem,2.4vw,1.75rem)] uppercase tracking-tight text-ink">
                  {degree.institution}
                </h4>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-label text-mute">{degree.degree}</p>

                {degree.status && (
                  <p className="mt-4 flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-label text-accent-muted">ACHIEVEMENTS</span>
                    <span className="font-body text-sm text-ink">{degree.status}</span>
                  </p>
                )}

                <div className="mt-4 flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-label text-accent-muted">COURSEWORK</span>
                  <div className="flex flex-wrap gap-2">
                    {degree.coursework.map((course) => (
                      <span
                        key={course}
                        className="border border-hair px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-mute"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}

            <li className="relative">
              <span className="absolute -left-[25px] top-2 h-2 w-2 bg-accent md:-left-[41px]" aria-hidden />
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-muted">CONVERGENCE</span>
              <p className="mt-2 font-display text-[clamp(1rem,2vw,1.35rem)] uppercase tracking-tight text-accent">
                {degreeConvergence}
              </p>
            </li>
          </ol>
        </RecordFrame>
      </div>
    </section>
  );
}
