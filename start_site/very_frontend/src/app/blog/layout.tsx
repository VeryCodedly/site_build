import type { Metadata } from "next";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Providers } from '../../lib/providers';
import FloatingMenu from "./components/blog/FloatingMenu";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = {
  title: "Blog",
  description: "Unfiltered takes on Tech, Code, Culture and everything in between.",
  alternates: {
    canonical: "https://verycodedly.com/blog",
  },
  openGraph: {
    title: "Blog",
    description: "Unfiltered takes on Tech, Code, Culture and everything in between.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/blog",
    images: [{ url: "https://verycodedly.com/blog/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Unfiltered takes on Tech, Code, Culture and everything in between.",
    images: ["https://verycodedly.com/blog/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Providers>
        <FloatingMenu />
        <SearchBar />
        {children}
      </Providers>
    </>
  );
}
