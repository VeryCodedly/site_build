import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of use.",
  openGraph: {
    title: "Terms & Conditions",
    description: "Terms of use.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/terms",
    images: [{ url: "https://verycodedly.com/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions",
    description: "Terms of use.",
    images: ["https://verycodedly.com/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; 
}
