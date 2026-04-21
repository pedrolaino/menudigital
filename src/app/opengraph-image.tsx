import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Luma — Cocina de Autor Argentina";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0d0d0d",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        fontFamily: "Georgia, serif",
      }}
    >
      {/* Outer border */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          right: 40,
          bottom: 40,
          border: "1px solid #2a2a2a",
          display: "flex",
        }}
      />

      {/* Corner accents */}
      {[
        { top: 40, left: 40 },
        { top: 40, right: 40 },
        { bottom: 40, left: 40 },
        { bottom: 40, right: 40 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 16,
            height: 16,
            borderTop: i < 2 ? "1px solid #C9A84C" : undefined,
            borderBottom: i >= 2 ? "1px solid #C9A84C" : undefined,
            borderLeft: i % 2 === 0 ? "1px solid #C9A84C" : undefined,
            borderRight: i % 2 !== 0 ? "1px solid #C9A84C" : undefined,
            display: "flex",
            ...pos,
          }}
        />
      ))}

      {/* Eyebrow */}
      <div
        style={{
          color: "#C9A84C",
          fontSize: 14,
          letterSpacing: "6px",
          textTransform: "uppercase",
          fontFamily: "sans-serif",
          marginBottom: 28,
        }}
      >
        BUENOS AIRES · COCINA DE AUTOR
      </div>

      {/* Gold line top */}
      <div
        style={{
          width: 48,
          height: 1,
          background: "#C9A84C",
          marginBottom: 28,
        }}
      />

      {/* Restaurant name */}
      <div
        style={{
          fontSize: 140,
          color: "#f5f0e8",
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          lineHeight: 1,
          letterSpacing: "-4px",
          marginBottom: 28,
        }}
      >
        Luma
      </div>

      {/* Gold line bottom */}
      <div
        style={{
          width: 48,
          height: 1,
          background: "#C9A84C",
          marginBottom: 28,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          color: "#f5f0e8",
          opacity: 0.4,
          fontSize: 16,
          letterSpacing: "3px",
          fontFamily: "sans-serif",
          textTransform: "uppercase",
        }}
      >
        Reservas · Fine Dining · Argentina
      </div>
    </div>,
    { ...size }
  );
}
