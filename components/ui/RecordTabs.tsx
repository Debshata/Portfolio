"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface RecordTabsProps {
  /** Accessible name for the tablist. */
  label: string;
  items: { id: string; label: string; hint?: string }[];
  selected: number;
  onSelect: (index: number) => void;
  /** Base id used to wire each tab to its panel. */
  idPrefix: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/**
 * Roving-tabindex tablist.
 *
 * The project and research selectors both declared `role="tab"` without
 * `aria-controls`, without a `tabpanel` to point at, and without arrow-key
 * handling — the roles announced a widget that did not behave like one. This
 * implements the pattern once: one tab stop for the whole list, arrows to
 * move, Home/End to jump, and each tab bound to the panel it reveals.
 */
export function RecordTabs({
  label,
  items,
  selected,
  onSelect,
  idPrefix,
  orientation = "horizontal",
  className
}: RecordTabsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (to: number) => {
    const next = (to + items.length) % items.length;
    onSelect(next);
    refs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const prevKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    if (event.key === prevKey) {
      event.preventDefault();
      move(selected - 1);
    } else if (event.key === nextKey) {
      event.preventDefault();
      move(selected + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      move(0);
    } else if (event.key === "End") {
      event.preventDefault();
      move(items.length - 1);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      aria-orientation={orientation}
      onKeyDown={onKeyDown}
      className={cn(orientation === "vertical" ? "flex flex-col gap-1.5" : "flex flex-wrap gap-1.5", className)}
    >
      {items.map((item, i) => {
        const isSelected = i === selected;
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${i}`}
            aria-selected={isSelected}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelect(i)}
            className={cn(
              "dc-press focus-ring flex min-h-[44px] border px-3 py-2 font-mono text-label uppercase transition-colors duration-micro ease-micro",
              orientation === "vertical" ? "flex-col items-start gap-1 text-left" : "items-center",
              isSelected
                ? "border-accent bg-accent text-ground"
                : "border-hair text-mute hover:border-accent hover:text-accent-bright"
            )}
          >
            {item.hint && (
              <span className={cn("dc-code", isSelected ? "text-ground/70" : "text-accent-muted")}>{item.hint}</span>
            )}
            <span className={cn("min-w-0", orientation === "vertical" ? "normal-case tracking-normal" : "truncate")}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
