import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/seo/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Technology Consulting & Software Development Services";

export default function Image() {
  return buildOgImage(
    "Services",
    "Technology Consulting & Software Development",
    "Custom software, cloud & DevOps, AI & automation"
  );
}
