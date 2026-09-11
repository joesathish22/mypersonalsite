import Image from "next/image";
import { forwardRef } from "react";
import { person } from "@/lib/content/site";

export const HeroPortrait = forwardRef<HTMLDivElement>(function HeroPortrait(_, ref) {
  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-[68vw] max-w-[300px] sm:max-w-[380px] lg:mx-0 lg:w-full lg:max-w-[460px]"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(61,139,255,0.28),transparent_65%)] blur-2xl"
      />
      <div
        className="relative h-full w-full overflow-hidden rounded-[2rem]"
        style={{
          maskImage:
            "radial-gradient(circle at 50% 42%, black 60%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 42%, black 60%, transparent 92%)",
        }}
      >
        <Image
          src={person.portrait.src}
          alt={person.portrait.alt}
          fill
          priority
          sizes="(max-width: 1024px) 70vw, 460px"
          className="object-cover object-top"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-accent/10 mix-blend-overlay"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-8 bottom-0 h-16 rounded-full bg-accent/30 blur-3xl"
      />
    </div>
  );
});
