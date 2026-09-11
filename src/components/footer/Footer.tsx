import { footerLinks, person } from "@/lib/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/60 bg-void py-14">
      <div className="container-page flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight text-foreground">
            S. SATHISH KUMAR
          </p>
          <p className="mt-2 text-sm text-muted">
            {person.role} · {person.company}
          </p>
          <p className="mt-4 text-sm text-muted-dim">Technology for a Better Tomorrow</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm text-muted transition-colors hover:text-accent-soft"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="container-page mt-10 border-t border-line/60 pt-6">
        <p className="text-xs text-muted-dim">
          © {year} {person.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
