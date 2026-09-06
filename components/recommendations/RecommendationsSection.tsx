import { recommendations, archive } from "@/data/portfolio";
import { RecordFrame } from "@/components/ui/RecordFrame";
import { ExternalLink } from "@/components/ui/ExternalLink";

/** 07 — endorsements from the QAMP 2025 mentors, quoted verbatim. */
export function RecommendationsSection() {
  return (
    <section
      id="recommendations"
      aria-labelledby="recommendations-heading"
      className="border-b border-hair py-14 md:py-20"
    >
      <div className="mx-auto max-w-content px-5 md:px-10">
        <RecordFrame
          section="07"
          title="Recommendations"
          recordLabel={`${recommendations.length} ENDORSEMENTS`}
          meta="QAMP 2025 MENTORS"
          footerPath="DC://ARCHIVE/RECOMMENDATIONS"
          footerIndex={`07 / ${archive.totalRecords}`}
        >
          <h3 id="recommendations-heading" className="sr-only">
            Recommendations
          </h3>

          <div className="grid gap-8 lg:grid-cols-2">
            {recommendations.map((item, i) => (
              <figure key={item.id} className="flex flex-col gap-4 border border-hair bg-panel/30 p-5 md:p-7">
                <div className="flex items-center justify-between gap-3 border-b border-hair pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-label text-accent">
                    REF-{String(i + 1).padStart(3, "0")}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-label text-mute">{item.date}</span>
                </div>

                <blockquote className="flex flex-col gap-3">
                  {item.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="font-body text-[15px] leading-[1.7] text-mute">
                      {paragraph}
                    </p>
                  ))}
                </blockquote>

                <figcaption className="mt-auto flex flex-col gap-1.5 border-t border-hair pt-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="font-display text-[clamp(1.05rem,2vw,1.3rem)] uppercase tracking-tight text-ink">
                      {item.name}
                    </span>
                    <ExternalLink href={item.profileUrl} label={`${item.name} on LinkedIn`}>
                      VISIT PROFILE
                    </ExternalLink>
                  </div>
                  <span className="font-body text-sm leading-snug text-accent">{item.title}</span>
                  <span className="font-mono text-[10px] uppercase tracking-label text-accent-muted">
                    {item.relationship}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </RecordFrame>
      </div>
    </section>
  );
}
