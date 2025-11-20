import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Discover how VeryCodedly bridges tech education and culture.",
  alternates: {
    canonical: "https://verycodedly.com/about",
    languages: {
      'en-US': 'https://verycodedly.com/en-US',
    }
  },
  openGraph: {
    title: "About",
    description: "Discover how VeryCodedly bridges tech education and culture.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/about",
    images: [{ url: "https://verycodedly.com/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About",
    description: "Discover how VeryCodedly bridges tech education and culture.",
    images: ["https://verycodedly.com/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; 
}
