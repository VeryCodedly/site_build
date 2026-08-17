import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect",
  description: "Connect on VeryCodedly to keep up with trending topics, tools, and tech.",
  alternates: {
    canonical: "https://verycodedly.com/connect",
  },
  openGraph: {
    title: "Connect",
    description: "Connect on VeryCodedly to keep up with trending topics, tools, and tech.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/connect",
    images: [{ url: "https://verycodedly.com/connect/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect",
    description: "Connect on VeryCodedly to keep up with trending topics, tools, and tech.",
    images: ["https://verycodedly.com/connect/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; 
}
