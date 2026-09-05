"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/data/portfolio";
import { useTerminal } from "@/lib/terminal/TerminalContext";
import { cn } from "@/lib/utils";

interface ProjectImageSliderProps {
  images: ProjectImage[];
  projectName: string;
}

export function ProjectImageSlider({ images, projectName }: ProjectImageSliderProps) {
  const { playTone } = useTerminal();
  const [index, setIndex] = useState(0);
  const total = images.length;
  const current = images[index];

  const go = (next: number) => {
    playTone("tick");
    setIndex((next + total) % total);
  };

  if (!current) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-square w-full overflow-hidden border border-hair bg-bg">
        <Image
          src={current.src}
          alt={`${projectName} — image ${index + 1} of ${total}`}
          fill
          sizes="(max-width: 768px) 90vw, 460px"
          className="object-contain"
        />

        <span className="pointer-events-none absolute bottom-0 right-0 border-l border-t border-accent/30 bg-base/85 px-2.5 py-1 font-mono text-[10px] tracking-label text-accent">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={`Previous image for ${projectName}`}
              className="focus-ring absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-hair bg-base/85 text-ink transition-colors hover:border-accent hover:text-accent-bright"
            >
              <ChevronLeft size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={`Next image for ${projectName}`}
              className="focus-ring absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-hair bg-base/85 text-ink transition-colors hover:border-accent hover:text-accent-bright"
            >
              <ChevronRight size={16} aria-hidden />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label={`${projectName} image selector`}>
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show image ${i + 1} of ${total}`}
            onClick={() => go(i)}
            className={cn(
              "focus-ring h-1.5 flex-1 border transition-colors",
              i === index ? "border-accent bg-accent" : "border-hair bg-alt hover:border-accent/50"
            )}
          />
        ))}
      </div>

      <span className="sr-only" aria-live="polite">{`Image ${index + 1} of ${total}`}</span>
    </div>
  );
}
