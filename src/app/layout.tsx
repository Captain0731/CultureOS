import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "@/styles/global.scss";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll/SmoothScroll";
import Navbar from "@/components/layout/Navbar/Navbar";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Culture OS — Take Control Of Your Tasks",
  description:
    "A modern workspace designed for teams who value speed, beauty, and precision. Built on Next.js, powered by GSAP, and styled for the future.",
  metadataBase: new URL("https://cultureos.io"),
  openGraph: {
    title: "Culture OS — Take Control Of Your Tasks",
    description:
      "A modern workspace designed for teams who value speed, beauty, and precision.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${outfit.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
