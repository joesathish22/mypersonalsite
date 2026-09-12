import { person, hero } from "@/lib/content/site";
import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/seo/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = `${person.name} — ${person.eyebrow}`;

export default function Image() {
  return buildOgImage(hero.eyebrow, person.name, "I Build Technology That Creates Real-World Impact.");
}
