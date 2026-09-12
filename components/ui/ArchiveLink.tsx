import { cn } from "@/lib/utils";
import { CONTROL_BASE, CONTROL_VARIANT, type ControlVariant } from "./controlStyles";

interface ArchiveLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ControlVariant;
  /** Opens in a new tab with the usual rel guard. */
  external?: boolean;
}

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
      className={cn(CONTROL_BASE, CONTROL_VARIANT[variant], className)}
      {...props}
    >
      {children}
    </a>
  );
}
