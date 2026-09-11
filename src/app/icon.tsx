import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05080D",
          borderRadius: 7,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: "2px solid #3D8BFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#3D8BFF",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "sans-serif",
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size }
  );
}
