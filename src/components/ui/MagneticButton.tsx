"use client";

import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { useIsCoarsePointer } from "@/lib/hooks/useMediaQuery";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isCoarse = useIsCoarsePointer();
  const reducedMotion = useReducedMotion();
  const disableMagnetism = isCoarse || reducedMotion;

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (disableMagnetism || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };

  const handlePointerLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  const base =
    "group relative inline-flex items-center gap-2.5 rounded-full font-semibold tracking-tight transition-[transform,box-shadow,background-color] duration-300 ease-out will-change-transform min-h-11";

  const sizes =
    size === "lg"
      ? "px-9 py-4.5 text-base sm:text-lg"
      : "px-7 py-3.5 text-sm";

  // Secondary uses an inset shadow rather than a border: a real border adds
  // to the element's box height (border-box still grows by the border
  // width), which threw it 2px out of vertical alignment with the
  // borderless primary button when the two sit side by side.
  const styles =
    variant === "primary"
      ? "bg-accent text-void shadow-[0_0_0_0_rgba(61,139,255,0)] hover:shadow-[0_0_28px_4px_rgba(61,139,255,0.45)]"
      : "text-foreground shadow-[inset_0_0_0_1px_var(--color-line)] hover:text-accent-soft hover:shadow-[inset_0_0_0_1px_rgba(125,179,255,0.7)]";

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={cn(base, sizes, styles, className)}
        data-cursor="interactive"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(base, sizes, styles, className)}
      data-cursor="interactive"
    >
      {content}
    </Link>
  );
}
