export function ScrollCue() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
    >
      <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-muted-dim">
        Scroll
      </span>
      <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1.5">
        <span className="h-1.5 w-1 animate-bounce rounded-full bg-accent-soft" />
      </span>
    </div>
  );
}
