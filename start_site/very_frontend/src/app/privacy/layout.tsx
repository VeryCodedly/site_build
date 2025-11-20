import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Your trust is everything. Here’s exactly how we handle your data.",
  alternates: {
    canonical: "https://verycodedly.com/privacy",
  },
  openGraph: {
    title: "Privacy",
    description: "Your trust is everything. Here’s exactly how we handle your data.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/privacy",
    images: [{ url: "https://verycodedly.com/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy",
    description: "Your trust is everything. Here’s exactly how we handle your data.",
    images: ["https://verycodedly.com/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; 
}
