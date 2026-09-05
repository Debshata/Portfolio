interface DownloadProgressProps {
  progress: number | null;
}

/** Determinate progress readout shown while a résumé transfer animation runs. */
export function DownloadProgress({ progress }: DownloadProgressProps) {
  if (progress === null) return null;
  const pct = Math.round(progress);
  const done = pct >= 100;

  return (
    <div className="flex w-full max-w-xs flex-col gap-1" role="status" aria-live="polite">
      <div className="h-1.5 w-full border border-hair bg-bg">
        <div
          className="h-full bg-accent transition-[width] duration-100 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-label text-mute">
        {done ? "Transfer complete" : `Transferring résumé — ${pct}%`}
      </span>
    </div>
  );
}
