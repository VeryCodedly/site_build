import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description: "Our community brings together tech learners, builders, and tinkerers to support each other, share knowledge, and grow together.",
  openGraph: {
    title: "Community",
    description: "Our community brings together tech learners, builders, and tinkerers to support each other, share knowledge, and grow together.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/community",
    images: [{ url: "https://verycodedly.com/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Community",
    description: "Our community brings together tech learners, builders, and tinkerers to support each other, share knowledge, and grow together.",
    images: ["https://verycodedly.com/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; 
}
