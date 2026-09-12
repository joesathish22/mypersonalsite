import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/animation/smooth-scroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SkipLink } from "@/components/layout/SkipLink";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { person } from "@/lib/content/site";
import { SITE_URL, GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION } from "@/lib/config/site-config";
import { personId, organizationId, profilePageId, websiteId } from "@/lib/seo/json-ld";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "S. Sathish Kumar — Technology Strategist, Software Engineer & Founder";
const DESCRIPTION =
  "S. Sathish Kumar is a technology strategist, software engineer and Founder & CEO of Queen Touch Technology, helping organizations worldwide with software development, AI, cloud, DevOps and digital transformation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — S. Sathish Kumar",
  },
  description: DESCRIPTION,
  // Ordered to the site's real acquisition priority — generic commercial
  // search intent first, since the goal is reaching people who don't already
  // know the name, not ranking the name itself.
  keywords: [
    "Technology Strategist",
    "Technology Consultant",
    "Technology Consulting",
    "Software Development",
    "AI Software Development",
    "AI Automation",
    "Cloud Solutions",
    "DevOps Consulting",
    "Enterprise Software Development",
    "Digital Transformation",
    "Software Engineer",
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

// A single linked-data graph — Person, Organization, WebSite and ProfilePage
// are cross-referenced via @id rather than duplicated inline, so the entity
// relationships (worksFor / founder / publisher / mainEntity) stay
// unambiguous and consistent with each other and with the visible page
// content. Every page-level schema (BreadcrumbList, ProfessionalService,
// Article — see src/lib/seo/json-ld.ts) references these same @ids.
const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: person.name,
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
        "Technology Strategy",
        "Technology Consulting",
        "Software Development",
        "AI Software Development",
        "AI Automation",
        "Cloud Solutions",
        "DevOps Consulting",
        "Enterprise Software Development",
        "Digital Transformation",
        "Cybersecurity",
        "Information Security",
        "Software Testing",
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
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      publisher: { "@id": personId },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": profilePageId,
      url: SITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": websiteId },
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
          <div id="nav-sentinel" className="absolute top-0 h-px w-full" aria-hidden="true" />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
