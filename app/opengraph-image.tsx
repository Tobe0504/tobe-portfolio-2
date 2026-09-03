import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/content";
import { MARK_PATH, MARK_TRANSFORM, MARK_VIEWBOX } from "@/lib/mark";

export const alt = `${siteConfig.name} ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The link preview: what gets pasted into Slack, X, LinkedIn and iMessage.
 *
 * Generated rather than committed as a static file so it stays in step with
 * siteConfig. Every element carries an explicit `display: flex` because Satori
 * (what `next/og` renders with) implements no block layout and throws on any
 * element with multiple children that has not been told how to lay them out.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0a09",
          color: "#fafaf9",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <svg width="96" height="96" viewBox={MARK_VIEWBOX} fill="#fafaf9">
          <path d={MARK_PATH} transform={MARK_TRANSFORM} />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, letterSpacing: -4 }}>
            {siteConfig.name} Ezimorah
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 34,
              color: "#a8a29e",
            }}
          >
            {siteConfig.role.toLowerCase()}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#78716c" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    size,
  );
}
