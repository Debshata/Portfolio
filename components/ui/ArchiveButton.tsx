import { cn } from "@/lib/utils";
import { CONTROL_BASE, CONTROL_VARIANT, type ControlVariant } from "./controlStyles";

interface ArchiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ControlVariant;
}

export function ArchiveButton({ variant = "secondary", className, children, ...props }: ArchiveButtonProps) {
  return (
    <button type="button" className={cn(CONTROL_BASE, CONTROL_VARIANT[variant], className)} {...props}>
      {children}
    </button>
  );
}
