import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/seo/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Technology Strategy, Software Engineering & Cloud Articles";

export default function Image() {
  return buildOgImage(
    "Articles",
    "Technology, Software & Cloud Writing",
    "AI, software engineering, cloud, DevOps, cybersecurity & strategy"
  );
}
