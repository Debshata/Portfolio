import { cn } from "@/lib/utils";

interface TechnicalLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function TechnicalLabel({ children, className }: TechnicalLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-hair px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-mute",
        className
      )}
    >
      {children}
    </span>
  );
}
