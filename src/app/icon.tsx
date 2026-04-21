import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#0d0d0d",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          color: "#C9A84C",
          fontSize: 22,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          lineHeight: 1,
        }}
      >
        L
      </div>
    </div>,
    { ...size }
  );
}
