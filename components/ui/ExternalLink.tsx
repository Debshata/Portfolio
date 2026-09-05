import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
  onClick?: () => void;
}

const PLACEHOLDER_PREFIX = "ADD_";

export function ExternalLink({ href, children, className, label, onClick }: ExternalLinkProps) {
  const isPlaceholder = href.startsWith(PLACEHOLDER_PREFIX);

  if (isPlaceholder) {
    return (
      <span
        className={cn(
          "focus-ring inline-flex cursor-not-allowed items-center gap-1.5 font-mono text-sm text-mute opacity-60",
          className
        )}
        aria-label={`${label ?? "Link"} not yet available`}
        title="Link to be added"
      >
        {children}
        <ArrowUpRight size={14} aria-hidden />
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label={label ? `${label} (opens in new tab)` : undefined}
      className={cn(
        "focus-ring inline-flex items-center gap-1.5 font-mono text-sm text-accent-bright underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent",
        className
      )}
    >
      {children}
      <ArrowUpRight size={14} aria-hidden />
    </a>
  );
}
