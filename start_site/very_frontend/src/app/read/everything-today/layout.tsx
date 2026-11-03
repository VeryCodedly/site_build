import type { Metadata } from "next";

const pageTitle = "Everything, Today | VeryCodedly";

const pageDescription =
  "Interesting things, passing thoughts, and stories worth keeping. Beyond the headlines.";

const pageUrl = "https://verycodedly.com/read/everything-today";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,

  alternates: {
    canonical: pageUrl,
  },

  keywords: [
    "technology",
    "tech news",
    "coding",
    "software",
    "digital culture",
    "interesting stories",
    "VeryCodedly",
  ],

  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    type: "website",
    siteName: "VeryCodedly",
    images: [
      {
        url: "https://verycodedly.com/read/opengraph-image.png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [
      "https://verycodedly.com/read/twitter-image.png",
    ],
    creator: "@verycodedly",
  },
};

export default function EverythingTodayLayout({ children }: { children: React.ReactNode}) {
  return <>{children}</>;
}
