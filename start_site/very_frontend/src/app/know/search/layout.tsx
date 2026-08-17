import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Search",
  description:
    "Search VeryCodedly's media library for tech, code, culture, and everything in between.",
  robots: {
    index: false,
    follow: true,
  },
  keywords: [
    "VeryCodedly",
    "very codedly",
    "tech",
    "code",
    "culture",
    "technology",
    "programming",
    "AI",
    "software",
    "search",
  ],
  alternates: {
    canonical: "https://verycodedly.com/know/search",
  },
  openGraph: {
    title: "Search",
    description: "Search VeryCodedly's media library for tech, code, culture, and everything in between.",
    url: "https://verycodedly.com/know/search",
    images: [{ url: "https://verycodedly.com/know/opengraph-image.png" }],
    siteName: "VeryCodedly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search",
    description: "Search VeryCodedly's media library for tech, code, culture, and everything in between.",
    images: ["https://verycodedly.com/know/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function KnowSearchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}