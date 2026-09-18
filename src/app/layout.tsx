import type { Metadata, Viewport } from "next";
import { Lora, Playfair_Display } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.role}`,
  description: site.intro,
  keywords: [
    "mortgage support specialist",
    "loan processing",
    "bookkeeping",
    "executive assistance",
    "virtual assistant",
    site.name,
  ],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.intro,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [{ url: "/hero.webp", width: 491, height: 982, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.intro,
  },
};

export const viewport: Viewport = {
  themeColor: "#4b0000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
