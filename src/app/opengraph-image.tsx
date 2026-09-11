import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { person, hero } from "@/lib/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${person.name} — ${person.eyebrow}`;

/**
 * The single Open Graph / Twitter card image for the whole site, generated
 * at request time via Next.js's file-convention route (no separate static
 * asset, no competing declaration in metadata.openGraph.images — this file
 * is the one source of truth Next.js wires into the <head> automatically).
 */
export default function Image() {
  const imageData = readFileSync(join(process.cwd(), "public/images/sathish-kumar.png"));
  const portraitDataUrl = `data:image/png;base64,${imageData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#05080D",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 78% 50%, rgba(61,139,255,0.30), rgba(5,8,13,0) 60%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 0 0 72px",
            width: "700px",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "#7fb3ff",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {hero.eyebrow}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 58,
              color: "#f4f7fb",
              fontWeight: 700,
              marginTop: 22,
              letterSpacing: -1,
            }}
          >
            {person.name}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 34,
              color: "#c3ccd8",
              fontWeight: 600,
              marginTop: 26,
              lineHeight: 1.25,
            }}
          >
            <span style={{ display: "flex" }}>I Build Technology That Creates</span>
            <span style={{ display: "flex", color: "#3d8bff" }}>Real-World Impact.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "500px",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 420,
              height: 420,
              borderRadius: 28,
              overflow: "hidden",
              border: "1px solid rgba(125,179,255,0.35)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portraitDataUrl}
              width={420}
              height={420}
              style={{ objectFit: "cover" }}
              alt=""
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
