import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { person } from "@/lib/content/site";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

/**
 * One shared Open Graph / Twitter card template, reused by the root
 * `opengraph-image.tsx` and every route's own — each route just supplies its
 * own eyebrow/title/subtitle so social shares of any page carry the site's
 * real visual identity instead of falling back to a generic card.
 */
export function buildOgImage(eyebrow: string, title: string, subtitle?: string) {
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
            {eyebrow}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 52,
              color: "#f4f7fb",
              fontWeight: 700,
              marginTop: 22,
              letterSpacing: -1,
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>

          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#c3ccd8",
                fontWeight: 600,
                marginTop: 22,
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </div>
          ) : null}

          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#7387a5",
              fontWeight: 600,
              marginTop: 30,
            }}
          >
            {person.name} · {person.company}
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
    { ...ogImageSize }
  );
}
