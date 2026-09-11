import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/animation/smooth-scroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SkipLink } from "@/components/layout/SkipLink";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";
import { person } from "@/lib/content/site";
import { SITE_URL, GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION } from "@/lib/config/site-config";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "S. Sathish Kumar — Founder, Technology Strategist & Builder";
const DESCRIPTION =
  "S. Sathish Kumar (Joe), Founder & CEO of Queen Touch Technology, building scalable digital products, enterprise technology and digital transformation solutions for organizations worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — S. Sathish Kumar",
  },
  description: DESCRIPTION,
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
  publisher: person.company,
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${person.name} — ${person.company}`,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  ...((GOOGLE_SITE_VERIFICATION || BING_SITE_VERIFICATION) && {
    verification: {
      ...(GOOGLE_SITE_VERIFICATION && { google: GOOGLE_SITE_VERIFICATION }),
      ...(BING_SITE_VERIFICATION && { other: { "msvalidate.01": BING_SITE_VERIFICATION } }),
    },
  }),
};

export const viewport: Viewport = {
  themeColor: "#05080D",
  colorScheme: "dark",
};

// A single linked-data graph — Person, Organization and ProfilePage are
// cross-referenced via @id rather than duplicated inline, so the entity
// relationships (worksFor / founder / mainEntity) stay unambiguous and
// consistent with each other and with the visible page content.
const personId = `${SITE_URL}/#person`;
const organizationId = `${person.qttUrl}/#organization`;
const profilePageId = `${SITE_URL}/#profilepage`;

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: person.name,
      alternateName: person.alternateName,
      jobTitle: person.role,
      description: DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}${person.portrait.src}`,
      email: `mailto:${person.email}`,
      telephone: person.phone,
      worksFor: { "@id": organizationId },
      sameAs: [person.linkedin],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Thoothukudi",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
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
    },
    {
      "@type": "Organization",
      "@id": organizationId,
      name: person.company,
      url: person.qttUrl,
      founder: { "@id": personId },
      areaServed: "Worldwide",
      description:
        "QTT is a technology company focused on delivering high-quality IT services and digital solutions to clients globally.",
    },
    {
      "@type": "ProfilePage",
      "@id": profilePageId,
      url: SITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      mainEntity: { "@id": personId },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body className="min-h-full bg-void text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
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
