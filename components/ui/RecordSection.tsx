import { cn } from "@/lib/utils";
import { RecordFrame } from "./RecordFrame";

type Rhythm = "lead" | "peer" | "close";

interface RecordSectionProps {
  id: string;
  section: string;
  title: string;
  recordLabel: string;
  meta?: string;
  footerPath: string;
  footerIndex: string;
  /** Id applied to the record's visible title, which names the section. */
  headingId: string;
  /**
   * How much air the record gets. Every record used to carry identical
   * `py-14 md:py-20`, which gave nine sections equal weight and made the page
   * read as one repeated template. Weight now comes from spacing, not from
   * decoration: the opening record breathes, its continuation sits tight
   * against it, and the peer records share a steady tighter cadence.
   */
  rhythm?: Rhythm;
  children: React.ReactNode;
}

const RHYTHM: Record<Rhythm, string> = {
  lead: "pb-16 pt-16 md:pb-24 md:pt-24",
  peer: "py-12 md:py-16",
  close: "pb-12 pt-6 md:pb-16 md:pt-8"
};

/**
 * The shell every archive record shares: section landmark, content measure and
 * the record frame itself. Eight sections previously repeated this markup
 * verbatim, so a spacing or landmark correction had to be made eight times.
 */
export function RecordSection({
  id,
  section,
  title,
  recordLabel,
  meta,
  footerPath,
  footerIndex,
  headingId,
  rhythm = "peer",
  children
}: RecordSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("border-b border-hair", RHYTHM[rhythm])}
    >
      <div className="mx-auto max-w-content px-5 md:px-10">
        <RecordFrame
          headingId={headingId}
          section={section}
          title={title}
          recordLabel={recordLabel}
          meta={meta}
          footerPath={footerPath}
          footerIndex={footerIndex}
        >
          {children}
        </RecordFrame>
      </div>
    </section>
  );
}
