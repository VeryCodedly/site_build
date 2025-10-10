import { Providers } from "@/lib/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn | Very Codedly",
  description:
    "Hands-on coding lessons for curious minds. Explore Python, web dev, and beyond — explained simply, taught smartly.",
  openGraph: {
    title: "Learn | Very Codedly",
    description:
      "Hands-on coding lessons for curious minds. Explore Python, web dev, and beyond — explained simply, taught smartly.",
    url: "https://verycodedly.com/learn",
    siteName: "Very Codedly",
    images: [
      {
        url: "https://verycodedly.com/images/og-learn.png",
        width: 1200,
        height: 630,
        alt: "Learn | Very Codedly",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn | Very Codedly",
    description:
      "Learn coding and software development through clear, friendly lessons — by Very Codedly.",
    images: ["https://verycodedly.com/images/og-learn.png"],
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
