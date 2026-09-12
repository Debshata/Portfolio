/**
 * One control system shared by ArchiveButton and ArchiveLink, which previously
 * carried duplicate copies of the same style map and offered only two levels.
 *
 * Three levels, so not every control competes:
 *  - primary:   solid yellow. One per view — the action the visitor came for.
 *  - secondary: hairline box. The supporting actions.
 *  - tertiary:  no box at all. Navigation and low-stakes exits.
 */
export type ControlVariant = "primary" | "secondary" | "tertiary";

export const CONTROL_BASE =
  "dc-press focus-ring inline-flex min-h-[44px] items-center justify-center gap-2 font-mono text-label uppercase transition-colors duration-micro ease-micro disabled:pointer-events-none disabled:opacity-45";

export const CONTROL_VARIANT: Record<ControlVariant, string> = {
  primary: "border border-accent bg-accent px-5 py-2.5 text-ground hover:bg-accent-bright hover:border-accent-bright",
  secondary: "border border-hair bg-transparent px-5 py-2.5 text-ink hover:border-accent hover:text-accent-bright",
  tertiary:
    "border border-transparent px-2 py-2.5 text-mute underline decoration-hair underline-offset-4 hover:text-accent-bright hover:decoration-accent"
};
