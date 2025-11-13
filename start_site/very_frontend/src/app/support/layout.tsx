import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description: "Your support helps us keep our content free, our community active, and our servers running. Every bit makes a difference.",
  openGraph: {
    title: "Support",
    description: "Your support helps us keep our content free, our community active, and our servers running. Every bit makes a difference.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/support",
    images: [{ url: "https://verycodedly.com/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support",
    description: "Your support helps us keep our content free, our community active, and our servers running. Every bit makes a difference.",
    images: ["https://verycodedly.com/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; 
}
