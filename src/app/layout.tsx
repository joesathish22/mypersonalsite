import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/animation/smooth-scroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SkipLink } from "@/components/layout/SkipLink";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";
import { person } from "@/lib/content/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.sathishkumar.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "S. Sathish Kumar — Founder, Technology Strategist & Digital Transformation Leader",
    template: "%s — S. Sathish Kumar",
  },
  description:
    "S. Sathish Kumar — Founder & CEO of Queen Touch Technology. A technology strategist and builder based in India, working with organizations worldwide on digital transformation, enterprise software and secure, scalable systems.",
  keywords: [
    "Technology Consultant",
    "IT Consultant",
    "Digital Transformation Leader",
    "Software Development",
    "Cloud & DevOps",
    "Cybersecurity",
    "Enterprise Applications",
    "Mobile Application Development",
    "Technology Strategy",
    "Remote Technology Consultant",
    "Founder & CEO",
    "Queen Touch Technology",
  ],
  authors: [{ name: person.name, url: person.linkedin }],
  creator: person.name,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${person.name} — ${person.company}`,
    title:
      "S. Sathish Kumar — Founder, Technology Strategist & Digital Transformation Leader",
    description:
      "A technology strategist and builder based in India, working with organizations worldwide on digital transformation, enterprise software and secure, scalable systems.",
    images: [{ url: "/images/sathish-kumar.png", width: 1254, height: 1254 }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "S. Sathish Kumar — Founder, Technology Strategist & Digital Transformation Leader",
    description:
      "A technology strategist and builder based in India, working with organizations worldwide on digital transformation, enterprise software and secure, scalable systems.",
    images: ["/images/sathish-kumar.png"],
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  alternateName: person.alias,
  jobTitle: person.role,
  worksFor: {
    "@type": "Organization",
    name: person.company,
    url: person.qttUrl,
  },
  url: SITE_URL,
  email: person.email,
  telephone: person.phone,
  sameAs: [person.linkedin, person.qttUrl],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Thoothukudi",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  workLocation: {
    "@type": "Place",
    name: "Remote / Worldwide",
  },
  knowsAbout: [
    "IT Consulting",
    "Strategic Planning",
    "Enterprise Web Applications",
    "Mobile Application Development",
    "Custom Software Development",
    "Cloud & DevOps",
    "Cybersecurity",
    "Information Security",
    "Software Testing",
    "Digital Transformation",
    "Sustainability & Green IT",
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: person.company,
  url: person.qttUrl,
  founder: {
    "@type": "Person",
    name: person.name,
  },
  areaServed: "Worldwide",
  description:
    "QTT is a technology company focused on delivering high-quality IT services and digital solutions to clients globally.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body className="min-h-full bg-void text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SkipLink />
        <LoadingOverlay />
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
