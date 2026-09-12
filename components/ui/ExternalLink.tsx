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

/**
 * Inline outbound link. The arrow glyph carries the "leaves the archive"
 * meaning, so the copy no longer repeats it with a trailing arrow of its own.
 */
export function ExternalLink({ href, children, className, label, onClick }: ExternalLinkProps) {
  const isPlaceholder = href.startsWith(PLACEHOLDER_PREFIX);

  if (isPlaceholder) {
    return (
      <span
        className={cn(
          "inline-flex min-h-[44px] cursor-not-allowed items-center gap-1.5 font-mono text-label uppercase text-mute opacity-50 sm:min-h-0",
          className
        )}
        aria-label={`${label ?? "Link"} — not available yet`}
        title="This link is not available yet"
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
        "focus-ring inline-flex min-h-[44px] items-center gap-1.5 font-mono text-label uppercase text-accent underline decoration-hair underline-offset-4 transition-colors duration-micro hover:text-accent-bright hover:decoration-accent sm:min-h-0",
        className
      )}
    >
      {children}
      <ArrowUpRight size={14} aria-hidden />
    </a>
  );
}
