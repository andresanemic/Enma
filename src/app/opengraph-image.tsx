import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Enma — Energía y Manufactura Sustentable";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#205358",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(#F7DFBA10 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
            display: "flex",
          }}
        />

        {/* Concentric circles — decorative */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -120,
            width: 600,
            height: 600,
            borderRadius: "50%",
            border: "1px solid #F7DFBA10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 440,
              height: 440,
              borderRadius: "50%",
              border: "1px solid #F7DFBA15",
              display: "flex",
            }}
          />
        </div>

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <span style={{ fontSize: 13, color: "#FEA94F", letterSpacing: 5, textTransform: "uppercase" }}>
            ENMA
          </span>
          <span style={{ fontSize: 13, color: "#F7DFBA40", letterSpacing: 3 }}>
            enmachile.com
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 300,
              color: "#F7DFBA",
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            Energía y Manufactura
          </div>
          <div
            style={{
              fontSize: 62,
              fontWeight: 300,
              color: "#F7DFBA",
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            Sustentable desde
          </div>
          <div
            style={{
              fontSize: 62,
              fontWeight: 300,
              color: "#FEA94F",
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            la Patagonia.
          </div>
          <div
            style={{
              width: 80,
              height: 3,
              background: "#FEA94F",
              borderRadius: 4,
              marginTop: 32,
              display: "flex",
            }}
          />
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative" }}>
          <span style={{ fontSize: 16, color: "#F7DFBA60" }}>
            Puerto Cisnes · Aysén · Chile
          </span>
          <span style={{ fontSize: 13, color: "#F7DFBA30", letterSpacing: 2 }}>
            ENergía · MAnufactura
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
