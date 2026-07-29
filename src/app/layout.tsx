import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollRevealer from "@/components/ScrollRevealer";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "BelleVue — Architecture Made Simple",
  description:
    "Bellevue simplifies the construction and completion of luxurious residential and commercial projects in India.",
  openGraph: {
    title: "BelleVue — Architecture Made Simple",
    description:
      "Bringing luxury aesthetics in architectural and interior designs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} antialiased`}>
      <head>
        {/* Scroll-revealed elements start hidden for GSAP; without JS there is
            nothing to reveal them, so put them straight back. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important}`}</style>
        </noscript>
      </head>
      {/* `clip` rather than `hidden`: hidden would make body a scroll container
          and stop the sticky navbar from pinning to the viewport. */}
      <body className="overflow-x-clip">
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollRevealer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
