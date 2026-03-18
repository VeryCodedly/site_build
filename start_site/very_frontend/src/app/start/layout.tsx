import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start",
  description: "New to VeryCodedly? Start here. It's a quick guide to what you’ll see here, how things work, and where to begin.",
  alternates: {
    canonical: "https://verycodedly.com/start",
  },
  openGraph: {
    title: "Start",
    description: "New to VeryCodedly? Start here. It's a quick guide to what you’ll see here, how things work, and where to begin.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/start",
    images: [{ url: "https://verycodedly.com/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Start",
    description: "New to VeryCodedly? Start here. It's a quick guide to what you’ll see here, how things work, and where to begin.",
    images: ["https://verycodedly.com/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}