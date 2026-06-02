import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VeryCodedly Supply",
  description: "Apparel, accessories, desk gear, and everyday essentials from VeryCodedly. We make it, you make it look good.",
  alternates: {
    canonical: "https://verycodedly.com/merch",
  },
  openGraph: {
    title: "VeryCodedly Supply",
    description: "Apparel, accessories, desk gear, and everyday essentials from VeryCodedly. We make it, you make it look good.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/merch",
    images: [{ url: "https://verycodedly.com/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VeryCodedly Supply",
    description: "Apparel, accessories, desk gear, and everyday essentials from VeryCodedly. We make it, you make it look good.",
    images: ["https://verycodedly.com/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <> {children} </>; 
}
