import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Know",
  description: "Unfiltered takes on Tech, Code, Culture and everything in between, for people who want to understand what's happening, not just keep up.",
  alternates: {
    canonical: "https://verycodedly.com/know",
  },
  openGraph: {
    title: "Know",
    description: "Unfiltered takes on Tech, Code, Culture and everything in between, for people who want to understand what’s happening, not just keep up.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/know",
    images: [{ url: "https://verycodedly.com/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Know",
    description: "Unfiltered takes on Tech, Code, Culture and everything in between, for people who want to understand what’s happening, not just keep up.",
    images: ["https://verycodedly.com/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function KnowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; 
}
