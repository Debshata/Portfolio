import { cn } from "@/lib/utils";

interface TechnicalLabelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The archive's technical chip. Hero interests, education coursework and
 * research interests each hand-rolled this same hairline box before, with
 * three slightly different paddings.
 */
export function TechnicalLabel({ children, className }: TechnicalLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-hair px-2.5 py-1 font-mono text-meta uppercase text-mute",
        className
      )}
    >
      {children}
    </span>
  );
}
