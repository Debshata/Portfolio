import { cn } from "@/lib/utils";

interface RecordFrameProps {
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
 * The recurring archive record: section number, display title, record code
 * strip, hairline body and a coordinate footer — per the DC Archives sheet.
 */
export function RecordFrame({
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
    <div className={cn("relative border border-hair bg-bg/60", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-hair px-5 py-4 md:px-8">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wide text-accent">SECTION {section}</span>
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] uppercase leading-none tracking-tight text-ink">
            {title}
          </h2>
        </div>
        <div className="flex flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-label text-mute">
          <span className="border border-hair px-2 py-1 text-accent-muted">{recordLabel}</span>
          {meta && <span>{meta}</span>}
        </div>
      </div>

      <div className="px-5 py-8 md:px-8 md:py-10">{children}</div>

      <div className="flex items-center justify-between border-t border-hair px-5 py-2 font-mono text-[10px] uppercase tracking-label text-mute md:px-8">
        <span>{footerPath}</span>
        <span className="text-accent-muted">{footerIndex}</span>
      </div>
    </div>
  );
}
