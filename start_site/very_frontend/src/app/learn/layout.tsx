import { Providers } from "@/lib/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: 'Learn | VeryCodedly', template: '%s | VeryCodedly' },
  description: "Beginner-friendly coding lessons that help complex ideas click, one concept at a time.",
  metadataBase: new URL("https://verycodedly.com/learn"),
  alternates: {
    canonical: "/",
    languages: {
      'en-US': 'https://verycodedly.com/en-US',
    }
  },
  keywords: [
    "learn coding",
    "coding basics",
    "beginner programming",
    "easy coding lessons",
    "programming concepts",
    "code tutorials",
    "start coding",
    "learn to code",
    "programming",
    "coding guide"
  ],
  openGraph: {
    title: "Learn | VeryCodedly",
    description: "Beginner-friendly coding lessons that help complex ideas click, one concept at a time.",
    url: "https://verycodedly.com/learn",
    siteName: "Learn | VeryCodedly",
    images: [
      {
        url: "https://verycodedly.com/learn/opengraph-image.png",
        width: 1340,
        height: 659,
        alt: "Learn | VeryCodedly",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn | VeryCodedly",
    description: "Beginner-friendly coding lessons that help complex ideas click, one concept at a time.",
    images: ["https://verycodedly.com/learn/twitter-image.png"],
  },
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Providers>{children}</Providers>
    </div>
  );
}
