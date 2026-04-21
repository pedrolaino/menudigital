import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luma — Cocina de Autor Argentina",
  description:
    "Restaurante de fine dining en Buenos Aires. Cocina de autor argentina contemporánea con ingredientes de estación.",
  keywords: ["restaurante", "fine dining", "Buenos Aires", "cocina de autor", "argentina"],
  openGraph: {
    title: "Luma — Cocina de Autor Argentina",
    description:
      "Una experiencia gastronómica que celebra la tierra argentina. Fine dining en el corazón de Buenos Aires.",
    siteName: "Luma",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luma — Cocina de Autor Argentina",
    description:
      "Una experiencia gastronómica que celebra la tierra argentina. Fine dining en el corazón de Buenos Aires.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
