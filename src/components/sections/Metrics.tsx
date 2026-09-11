import { metrics } from "@/lib/content/site";
import { Counter } from "@/components/ui/Counter";
import { RevealText } from "@/components/ui/RevealText";

export function Metrics() {
  return (
    <section
      id="impact"
      aria-label="Impact"
      className="relative border-y border-line/60 bg-deep py-20 sm:py-24"
    >
      <div className="container-page">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
          {metrics.map((metric, index) => (
            <li key={metric.label}>
              <RevealText delay={index * 0.06}>
                <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {"numeric" in metric && metric.numeric ? (
                    <Counter to={metric.numeric} suffix={metric.suffix ?? ""} />
                  ) : (
                    metric.value
                  )}
                </p>
                <p className="mt-2 text-sm text-muted sm:text-base">{metric.label}</p>
              </RevealText>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
