import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect",
  description: "Join the VeryCodedly Discord for fast, real-time updates on trends, tools, and tech insights.",
  alternates: {
    canonical: "https://verycodedly.com/connect",
  },
  openGraph: {
    title: "Connect",
    description: "Join the VeryCodedly Discord for fast, real-time updates on trends, tools, and tech insights.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/connect",
    images: [{ url: "https://verycodedly.com/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect",
    description: "Stay informed on tech trends, updates, and insights from the VeryCodedly Youtube channel.",
    images: ["https://verycodedly.com/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; 
}
