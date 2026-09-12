import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70svh] items-center bg-void py-28">
      <div className="container-page flex flex-col items-start gap-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-soft">404</p>
        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="max-w-lg text-balance text-lg leading-relaxed text-muted">
          The page you&apos;re looking for may have moved or never existed. Here are a few places to go
          instead.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-6">
          <MagneticButton href="/">Back to Home</MagneticButton>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent-soft hover:decoration-accent-soft"
          >
            Contact →
          </Link>
        </div>
      </div>
    </section>
  );
}
