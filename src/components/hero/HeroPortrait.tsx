import Image from "next/image";
import { forwardRef } from "react";
import { person } from "@/lib/content/site";

function CornerMark({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`absolute h-5 w-5 text-accent-soft/70 ${className}`}
    >
      <path
        d="M1 9V3a2 2 0 0 1 2-2h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export const HeroPortrait = forwardRef<HTMLDivElement>(function HeroPortrait(_, ref) {
  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-[68vw] max-w-[300px] sm:max-w-[380px] md:max-w-[410px] lg:mx-0 lg:w-full lg:max-w-[460px]"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(61,139,255,0.28),transparent_65%)] blur-2xl"
      />

      <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-line/70 shadow-[inset_0_0_0_1px_rgba(125,179,255,0.18)]">
        <Image
          src={person.portrait.src}
          alt={person.portrait.alt}
          fill
          priority
          sizes="(max-width: 1024px) 70vw, 460px"
          className="object-cover object-top"
        />

        {/* Photographic vignette — blends the frame edges into the scene
            without relying on CSS mask-image, which doesn't render
            consistently across engines. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 38%, transparent 42%, rgba(5,8,13,0.55) 92%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-accent/10 mix-blend-overlay"
        />
      </div>

      {/* Restrained calibration marks — a deep-tech engineering cue (like an
          instrument readout framing its subject), not a decorative sticker. */}
      <CornerMark className="-left-2 -top-2" />
      <CornerMark className="-right-2 -top-2 rotate-90" />
      <CornerMark className="-right-2 -bottom-2 rotate-180" />
      <CornerMark className="-left-2 -bottom-2 -rotate-90" />

      <div
        aria-hidden="true"
        className="absolute inset-x-8 bottom-0 h-16 rounded-full bg-accent/30 blur-3xl"
      />
    </div>
  );
});
