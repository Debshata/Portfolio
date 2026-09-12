import { cn } from "@/lib/utils";

interface RecordFrameProps {
  /** Id for the visible title, which names the enclosing section. */
  headingId: string;
  section: string;
  title: string;
  recordLabel: string;
  meta?: string;
  children: React.ReactNode;
  footerPath: string;
  footerIndex: string;
  className?: string;
}

/**
 * The recurring archive record.
 *
 * This used to be a bordered box containing a bordered header and a bordered
 * footer, sitting inside a bordered section — three box levels before any
 * content, and the panels inside the body made a fourth. The record is now
 * delimited by rules rather than by a container: the parent section's own
 * hairline closes it, so the genuinely separate objects inside a record (a
 * selected publication, an individual endorsement) are the only things left
 * that read as panels, which is what makes them legible as objects at all.
 *
 * The section number stays: in this archive it is a record address, not a
 * decorative label — the nav rail, the keyboard shortcuts and the footer
 * coordinates all index by it. It sits inline with the title rather than
 * stacked above it so it reads as part of the record's identifier.
 */
export function RecordFrame({
  headingId,
  section,
  title,
  recordLabel,
  meta,
  children,
  footerPath,
  footerIndex,
  className
}: RecordFrameProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3 border-b border-hair pb-4">
        <h2 id={headingId} className="flex items-baseline gap-3 font-display text-display-2 uppercase text-ink md:gap-4">
          <span className="dc-code shrink-0 text-accent" aria-hidden>
            {section}
          </span>
          <span>{title}</span>
        </h2>
        <div className="flex flex-col gap-1 pt-1 font-mono text-meta uppercase text-mute sm:items-end">
          <span className="text-accent-muted">{recordLabel}</span>
          {meta && <span>{meta}</span>}
        </div>
      </div>

      <div className="py-10 md:py-12">{children}</div>

      <div className="dc-code flex items-center justify-between gap-4 border-t border-hair pt-3 font-mono text-meta uppercase text-mute">
        <span>{footerPath}</span>
        <span className="text-accent-muted">{footerIndex}</span>
      </div>
    </div>
  );
}
