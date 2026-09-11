import { selectedWork } from "@/lib/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealText } from "@/components/ui/RevealText";

export function SelectedWork() {
  return (
    <section id="work" className="relative bg-void py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow={selectedWork.eyebrow}
          lines={[selectedWork.heading]}
          className="max-w-2xl"
        />
        <RevealText delay={0.1}>
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted">
            {selectedWork.subheading}
          </p>
        </RevealText>

        <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {selectedWork.showcases.map((showcase, index) => (
            <li key={showcase.domain}>
              <RevealText delay={(index % 4) * 0.06} className="h-full">
                <TiltCard className="h-full p-8">
                  <span className="text-xs font-medium text-muted-dim">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold leading-snug text-foreground">
                    {showcase.domain}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {showcase.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {showcase.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-line px-3 py-1 text-xs text-muted-dim"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </RevealText>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
