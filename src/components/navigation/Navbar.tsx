"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav } from "@/lib/content/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "border-b border-line/60 bg-void/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="container-page flex h-18 items-center justify-between py-4"
        >
          <Link
            href="#home"
            className="text-sm font-semibold tracking-tight text-foreground"
            data-cursor="interactive"
          >
            S. Sathish Kumar
            <span className="ml-2 text-muted-dim">/ QTT</span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative text-sm font-medium text-muted transition-colors duration-300 hover:text-foreground"
                  data-cursor="interactive"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-soft transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <MagneticButton href="#contact" variant="secondary" className="!px-5 !py-2.5 !text-xs">
              Let&apos;s Connect
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-foreground lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            data-cursor="interactive"
          >
            <span className="relative block h-3 w-5">
              <span className="absolute inset-x-0 top-0 h-px bg-current" />
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
              <span className="absolute inset-x-0 bottom-0 h-px bg-current" />
            </span>
          </button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
