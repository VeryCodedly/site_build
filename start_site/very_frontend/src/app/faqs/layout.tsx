import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Get answers to your questions.",
  openGraph: {
    title: "FAQs",
    description: "Get answers to your questions.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/about",
    images: [{ url: "https://verycodedly.com/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs",
    description: "Get answers to your questions.",
    images: ["https://verycodedly.com/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; 
}
