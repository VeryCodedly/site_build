import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Know",
  description: "Stay informed on tech trends, updates, and insights from the VeryCodedly Youtube channel.",
  openGraph: {
    title: "Know",
    description: "Stay informed on tech trends, updates, and insights from the VeryCodedly Youtube channel.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/know",
    images: [{ url: "https://verycodedly.com/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Know",
    description: "Stay informed on tech trends, updates, and insights from the VeryCodedly Youtube channel.",
    images: ["https://verycodedly.com/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function KnowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; 
}
