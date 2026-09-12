import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/seo/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "AI Software Development & Automation";

export default function Image() {
  return buildOgImage("AI & Intelligent Systems", "AI Software Development & Automation", "Data → Intelligence → Automation → Systems");
}
