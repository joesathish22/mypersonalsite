"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { nav, person } from "@/lib/content/site";
import { MagneticButton } from "@/components/ui/MagneticButton";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={`fixed inset-0 z-[60] flex flex-col bg-void/98 backdrop-blur-2xl transition-opacity duration-300 lg:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between py-4">
        <span className="text-sm font-semibold text-foreground">S. Sathish Kumar</span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-foreground"
          aria-label="Close menu"
        >
          <span className="relative block h-4 w-4">
            <span className="absolute inset-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
            <span className="absolute inset-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <nav
        aria-label="Mobile primary"
        className="container-page flex flex-1 flex-col justify-center gap-2"
      >
        {nav.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`border-b border-line/60 py-4 text-3xl font-semibold tracking-tight text-foreground transition-transform duration-300 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${index * 45}ms` : "0ms" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="container-page flex flex-col gap-4 pb-10">
        <MagneticButton href="/contact" className="w-full justify-center" >
          Let&apos;s Work Together
        </MagneticButton>
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-sm font-medium text-muted"
        >
          LinkedIn ↗
        </a>
      </div>
    </div>
  );
}
