import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

interface ArchiveLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  /** Opens in a new tab with the usual rel guard. */
  external?: boolean;
}

const STYLES: Record<Variant, string> = {
  primary: "border-accent bg-accent text-ground hover:bg-accent-bright",
  secondary: "border-hair bg-transparent text-ink hover:border-accent hover:text-accent-bright"
};

export function ArchiveLink({
  variant = "secondary",
  external = false,
  className,
  children,
  ...props
}: ArchiveLinkProps) {
  return (
    <a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "dc-press focus-ring inline-flex min-h-[44px] items-center gap-2 border px-5 py-2.5 font-mono text-[11px] uppercase tracking-label transition-colors duration-micro ease-micro",
        STYLES[variant],
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
