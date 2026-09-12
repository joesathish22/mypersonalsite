import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/seo/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Contact S. Sathish Kumar — Technology Strategist & Consultant";

export default function Image() {
  return buildOgImage("Contact", "Technology Strategist & Consultant", "Available globally, remote-first");
}
