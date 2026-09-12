import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/seo/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Technology Strategy & Software Engineering Capabilities";

export default function Image() {
  return buildOgImage(
    "Capabilities",
    "Technology Strategy & Software Engineering",
    "Cloud, DevOps, AI, cybersecurity & digital transformation"
  );
}
