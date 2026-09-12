import { recommendations, archive } from "@/data/portfolio";
import { RecordSection } from "@/components/ui/RecordSection";
import { ExternalLink } from "@/components/ui/ExternalLink";

/** 07 — endorsements from the QAMP 2025 mentors, quoted verbatim. */
export function RecommendationsSection() {
  return (
    <RecordSection
      id="recommendations"
      section="07"
      title="Recommendations"
      recordLabel={`${recommendations.length} ENDORSEMENTS`}
      meta="QAMP 2025 MENTORS"
      footerPath="DC://ARCHIVE/RECOMMENDATIONS"
      footerIndex={`07 / ${archive.totalRecords}`}
      headingId="recommendations-heading"
    >
      {/* Two endorsements from two people: genuinely separate objects, so these
          keep a container where the rest of the archive lost one. The tinted
          fill is gone — a hairline and real internal hierarchy carry it. */}
      <ul className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {recommendations.map((item, i) => (
          <li key={item.id}>
            <figure className="flex h-full flex-col gap-5 border border-hair p-5 md:p-7">
              <div className="dc-code flex items-baseline justify-between gap-4 font-mono text-meta uppercase">
                <span className="text-accent-muted">REF-{String(i + 1).padStart(3, "0")}</span>
                <span className="text-mute">{item.date}</span>
              </div>

              <blockquote className="flex flex-col gap-3">
                {item.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="font-body text-prose text-body">
                    {paragraph}
                  </p>
                ))}
              </blockquote>

              <figcaption className="mt-auto flex flex-col gap-2 border-t border-hair pt-5">
                <h3 className="font-display text-display-4 uppercase text-ink">{item.name}</h3>
                <span className="font-body text-prose-sm text-body">{item.title}</span>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                  <span className="font-mono text-meta uppercase text-accent-muted">{item.relationship}</span>
                  <ExternalLink href={item.profileUrl} label={`${item.name} on LinkedIn`}>
                    PROFILE
                  </ExternalLink>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </RecordSection>
  );
}
