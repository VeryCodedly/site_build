import { Providers } from "@/lib/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn",
  description: "Beginner-friendly coding lessons that help complex ideas click, one concept at a time.",
  openGraph: {
    title: "Learn",
    description: "Beginner-friendly coding lessons that help complex ideas click, one concept at a time.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/learn",
    images: [{ url: "https://verycodedly.com/learn/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn",
    description: "Beginner-friendly coding lessons that help complex ideas click, one concept at a time.",
    images: ["https://verycodedly.com/learn/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
}
