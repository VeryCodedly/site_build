import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
// import "./globals.css";
import { Providers } from '../../lib/providers';
import FloatingMenu from "./components/blog/FloatingMenu";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: { default: 'Blog | VeryCodedly', template: '%s | VeryCodedly' },
  description: "Unfiltered takes on Tech, Code, Culture and everything in between.",
  metadataBase: new URL("https://verycodedly.com/blog"),
  alternates: {
    canonical: "/",
    languages: {
      'en-US': 'https://verycodedly.com/en-US',
    }
  },
  keywords: [
    "tech blog",
    "coding culture",
    "developer life",
    "software trends",
    "unfiltered tech takes",
    "web development insights",
    "startup culture",
    "software engineering discussions",
    "coding and technology news",
    "tech lifestyle",
    "developer community",
    "programming culture",
    "tech commentary",
    "digital innovation",
    "tech and society",
    "tech trends",
  ],
  openGraph: {
    title: "Blog | VeryCodedly",
    description: "Unfiltered takes on Tech, Code, Culture and everything in between.",
    url: "https://verycodedly.com/blog",
    siteName: "Blog | VeryCodedly",
    images: [
      {
        url: "https://verycodedly.com/blog/opengraph-image.png",
        width: 1336,
        height: 634,
        alt: "Blog | VeryCodedly",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | VeryCodedly",
    description: "Unfiltered takes on Tech, Code, Culture and everything in between.",
    images: ["https://verycodedly.com/blog/twitter-image.png"],
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <Providers>
        <FloatingMenu />
        {children}
      </Providers>
    </div>
  );
}
