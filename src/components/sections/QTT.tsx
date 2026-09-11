import { qtt, person } from "@/lib/content/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealText } from "@/components/ui/RevealText";

export function QTTSection() {
  return (
    <section id="qtt" className="relative overflow-hidden bg-panel py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(61,139,255,0.1),transparent_55%)]"
      />

      <div className="container-page relative">
        {/* Sathish Kumar -> Vision -> Queen Touch Technology */}
        <div className="flex flex-col items-center text-center">
          <RevealText>
            <p className="text-sm font-medium text-muted-dim">{person.name}</p>
          </RevealText>
          <span aria-hidden="true" className="my-4 h-10 w-px bg-line" />
          <RevealText delay={0.05}>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-soft">
              {qtt.eyebrow}
            </p>
          </RevealText>
          <span aria-hidden="true" className="my-4 h-10 w-px bg-line" />
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div className="text-center lg:text-left">
            <RevealText delay={0.1}>
              <div
                className="mx-auto inline-flex items-center gap-3 rounded-full border border-line px-4 py-2 lg:mx-0"
                aria-hidden="true"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-void">
                  Q
                </span>
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  {qtt.heading}
                </span>
              </div>
            </RevealText>

            <RevealText delay={0.15}>
              <h2 className="mt-8 text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                {qtt.subheading}
              </h2>
            </RevealText>

            <RevealText delay={0.2}>
              <p className="mx-auto mt-6 max-w-lg text-balance text-lg leading-relaxed text-muted lg:mx-0">
                {qtt.description}
              </p>
            </RevealText>

            <RevealText delay={0.25} className="mt-10 flex justify-center lg:justify-start">
              <MagneticButton href={qtt.cta.href} external>
                {qtt.cta.label}
              </MagneticButton>
            </RevealText>
          </div>

          <RevealText delay={0.15}>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {qtt.areas.map((area) => (
                <li
                  key={area}
                  className="rounded-xl border border-line bg-void/40 px-5 py-4 text-sm font-medium text-foreground"
                >
                  {area}
                </li>
              ))}
            </ul>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
