import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M/Y Octopus – Red Sea Luxury Liveaboard | Premium Diving Yacht Egypt",
  description:
    "Explore the Red Sea aboard M/Y Octopus, an ultra-luxury 5-deck liveaboard. Premium diving expeditions to St. John's Reef, Rocky Island & Zabargad. Book your Red Sea diving safari and luxury yacht experience in Egypt.",
  keywords: [
    "Red Sea diving",
    "Egypt liveaboard yacht",
    "luxury diving trip Egypt",
    "diving safari Red Sea",
    "M/Y Octopus yacht",
    "liveaboard Red Sea",
    "premium diving Egypt",
    "luxury yacht Red Sea",
  ],
  metadataBase: new URL("https://mostafaelbhary.github.io/octopus-frontend-/"),
  openGraph: {
    title: "M/Y Octopus – Red Sea Luxury Liveaboard Experience",
    description:
      "Ultra-luxury 5-deck liveaboard for premium Red Sea diving expeditions. Explore St. John's Reef, Rocky Island & Zabargad.",
    url: "https://mostafaelbhary.github.io/octopus-frontend-/",
    type: "website",
    locale: "en_US",
    siteName: "Octups",
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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
