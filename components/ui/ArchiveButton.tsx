import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

interface ArchiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const STYLES: Record<Variant, string> = {
  primary: "border-accent bg-accent text-base hover:bg-accent-bright",
  secondary: "border-hair bg-transparent text-ink hover:border-accent hover:text-accent-bright"
};

export function ArchiveButton({ variant = "secondary", className, children, ...props }: ArchiveButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "dc-press focus-ring inline-flex min-h-[44px] items-center gap-2 border px-5 py-2.5 font-mono text-[11px] uppercase tracking-label transition-colors duration-micro ease-micro",
        STYLES[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
