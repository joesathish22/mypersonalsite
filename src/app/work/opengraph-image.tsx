import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/seo/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Enterprise Software Development & Digital Transformation Work";

export default function Image() {
  return buildOgImage(
    "Work",
    "Enterprise Software & Digital Transformation",
    "Selected technology work by S. Sathish Kumar"
  );
}
