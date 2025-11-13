import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop VeryCodedly merch, tools and premium content.",
  openGraph: {
    title: "Shop",
    description: "Shop VeryCodedly merch, tools and premium content.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/shop",
    images: [{ url: "https://verycodedly.com/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop",
    description: "Shop VeryCodedly merch, tools and premium content.",
    images: ["https://verycodedly.com/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; 
}
