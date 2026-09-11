/**
 * Bespoke thin-line technical diagrams for the Selected Work showcases —
 * deliberately not an icon-font/glyph set. Each is a minimal abstraction of
 * the domain it represents, drawn in the same restrained line language as
 * the site's 3D network motifs.
 */

const common = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function EnterpriseDiagram({ className }: { className?: string }) {
  return (
    <svg {...common} className={className} aria-hidden="true">
      <rect x="8" y="8" width="32" height="8" rx="1.5" />
      <rect x="8" y="20" width="32" height="8" rx="1.5" opacity="0.7" />
      <rect x="8" y="32" width="32" height="8" rx="1.5" opacity="0.4" />
      <circle cx="14" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="14" cy="24" r="1.4" fill="currentColor" stroke="none" opacity="0.7" />
      <circle cx="14" cy="36" r="1.4" fill="currentColor" stroke="none" opacity="0.4" />
    </svg>
  );
}

export function MobileDiagram({ className }: { className?: string }) {
  return (
    <svg {...common} className={className} aria-hidden="true">
      <rect x="15" y="5" width="18" height="38" rx="3" />
      <line x1="15" y1="34" x2="33" y2="34" />
      <circle cx="24" cy="38.5" r="1.6" fill="currentColor" stroke="none" />
      <path d="M20 16h8M20 21h5" opacity="0.6" />
    </svg>
  );
}

export function CloudDiagram({ className }: { className?: string }) {
  return (
    <svg {...common} className={className} aria-hidden="true">
      <circle cx="10" cy="24" r="3" />
      <circle cx="24" cy="10" r="3" />
      <circle cx="24" cy="38" r="3" />
      <circle cx="38" cy="24" r="3" />
      <path d="M13 23l8-10M13 25l8 10M27 12l8 10M27 36l8-10" opacity="0.55" />
    </svg>
  );
}

export function TransformDiagram({ className }: { className?: string }) {
  return (
    <svg {...common} className={className} aria-hidden="true">
      <rect x="6" y="17" width="14" height="14" rx="2" opacity="0.5" />
      <path d="M23 24h11" />
      <path d="M30 19l5 5-5 5" />
      <rect x="34" y="10" width="9" height="9" rx="1.5" />
      <rect x="34" y="29" width="9" height="9" rx="1.5" />
    </svg>
  );
}
