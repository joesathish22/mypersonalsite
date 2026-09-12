import { cn } from "@/lib/utils/cn";
import { RevealText } from "./RevealText";

type SectionHeadingProps = {
  eyebrow?: string;
  lines: readonly string[];
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  lines,
  align = "left",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent-soft">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        {lines.map((line, index) => (
          <RevealText key={line} as="span" className="block" delay={index * 0.08}>
            {line}
          </RevealText>
        ))}
      </Heading>
    </div>
  );
}
