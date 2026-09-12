import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/seo/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "S. Sathish Kumar — Technology Consultant & Strategist";

export default function Image() {
  return buildOgImage("About", "Technology Consultant & Strategist", "Founder & CEO of Queen Touch Technology");
}
