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

const siteUrl = "https://mostafaelbhary.github.io/octopus-frontend-";

export const metadata: Metadata = {
  title: " Octopus  Red Sea Luxury Liveaboard & Diving Safari",
  description:
    "Experience luxury yacht adventures aboard M/Y OCTOPUS in the Red Sea. Book the ultimate Red Sea liveaboard diving safari to St. John's Reef, Rocky Island & Zabargad. Luxury yacht Egypt, scuba diving Egypt, and premium diving expeditions.",
  keywords: [
    "Octopus Ship",
    "Octopus Yacht",
    "M/Y Octopus",
    "Red Sea Liveaboard",
    "Luxury Yacht Egypt",
    "Red Sea Yacht",
    "Red Sea Liveaboard",
    "Liveaboard Egypt",
    "Scuba Diving Egypt",
    "Red Sea Diving",
    "Luxury Diving Trips",
    "Diving Safari Red Sea",
    "Diving Safari Egypt",
    "Egyptian Yacht Trips",
    "St John's Reef",
    "Rocky Island",
    "Zabargad",
    "رحلات سفاري البحر الأحمر",
    "يخت اوكتوبس",
    "غوص البحر الأحمر",
    "يخت فاخر مصر",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  other: {
    "google-site-verification": "pSZnQPv3QbP929DE0df1fs58VTE2-URsQ23Is3gnTTc",
  },
  openGraph: {
    title: " Octopus  Red Sea Luxury Liveaboard & Diving Safari",
    description:
      "Book the ultimate Red Sea liveaboard diving safari aboard M/Y OCTOPUS. Luxury yacht Egypt, world-class scuba diving, premium cabins & gourmet dining.",
    url: siteUrl,
    type: "website",
    locale: "en_US",
    siteName: "M/Y Octopus",
    images: [
      {
        url: `${siteUrl}/images/exterior/photo_1_2026-05-23_01-23-57.jpg`,
        width: 1200,
        height: 800,
        alt: "M/Y Octopus - Red Sea Luxury Liveaboard Yacht",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: " Octopus  Red Sea Luxury Liveaboard & Diving Safari",
    description:
      "Book the ultimate Red Sea liveaboard diving safari aboard M/Y OCTOPUS. Luxury yacht Egypt, world-class scuba diving, premium cabins & gourmet dining.",
    images: [`${siteUrl}/images/exterior/photo_1_2026-05-23_01-23-57.jpg`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TouristAttraction",
      name: "Red Sea Diving Experience",
      description:
        "World-class scuba diving in the pristine waters of the Red Sea, exploring vibrant coral reefs, dramatic drop-offs, and diverse marine life.",
      url: siteUrl,
      isAccessibleForFree: false,
      touristType: {
        "@type": "Audience",
        name: "Scuba Divers",
      },
      image: `${siteUrl}/images/exterior/photo_1_2026-05-23_01-23-57.jpg`,
    },
    {
      "@type": "TouristTrip",
      name: "M/Y Octopus Red Sea Liveaboard Safari",
      description:
        "Book the ultimate Red Sea liveaboard diving safari aboard M/Y OCTOPUS. Luxury yacht Egypt with world-class diving to St. John's Reef, Rocky Island & Zabargad.",
      image: `${siteUrl}/images/exterior/photo_1_2026-05-23_01-23-57.jpg`,
      url: siteUrl,
      itinerary: {
        "@type": "ItemList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "St. John's Reef" },
          { "@type": "ListItem", position: 2, name: "Rocky Island" },
          { "@type": "ListItem", position: 3, name: "Zabargad" },
        ],
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: siteUrl,
      },
    },
    {
      "@type": "Yacht",
      name: "M/Y Octopus",
      description:
        "Luxury 5-deck liveaboard yacht offering premium Red Sea diving experiences, elegant cabins, world-class service, and unforgettable underwater adventures.",
      image: `${siteUrl}/images/exterior/photo_1_2026-05-23_01-23-57.jpg`,
      url: siteUrl,
      brand: {
        "@type": "Brand",
        name: "M/Y Octopus",
      },
    },
    {
      "@type": "Product",
      name: "M/Y Octopus Liveaboard Diving Package",
      description:
        "Premium liveaboard diving packages in the Red Sea aboard the luxurious M/Y OCTOPUS yacht. Includes full-board accommodation, guided dives, and equipment support.",
      image: `${siteUrl}/images/exterior/photo_1_2026-05-23_01-23-57.jpg`,
      url: siteUrl,
      category: "Liveaboard Diving Experience",
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
