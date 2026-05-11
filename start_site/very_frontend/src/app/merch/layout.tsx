import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merch",
  description: "Shop VeryCodedly merch. T-Shirts, hoodies, mugs, and other items for awesome humans.",
  alternates: {
    canonical: "https://verycodedly.com/merch",
  },
  openGraph: {
    title: "Merch",
    description: "Shop VeryCodedly merch. T-Shirts, hoodies, mugs, and other items for awesome humans.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/merch",
    images: [{ url: "https://verycodedly.com/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merch",
    description: "Shop VeryCodedly merch. T-Shirts, hoodies, mugs, and other items for awesome humans.",
    images: ["https://verycodedly.com/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <> {children} </>; 
}
