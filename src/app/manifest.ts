import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "S. Sathish Kumar — Technology Strategist",
    short_name: "Sathish Kumar",
    description: "Founder, technology strategist and digital transformation leader.",
    start_url: "/",
    display: "standalone",
    background_color: "#05080D",
    theme_color: "#05080D",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
