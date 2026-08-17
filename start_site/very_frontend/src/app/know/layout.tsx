import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { SeriesListResponse } from "@/types/know";
import KnowMenu from "./components/KnowMenu";
import SearchBar from "@/components/SearchBar";


const apiURL = process.env.NEXT_PUBLIC_API_URL;

async function getSeries(): Promise<SeriesListResponse | null> {
    const res = await fetch(
        `${apiURL}/know/series/`,
        {
            next: {
                revalidate: 60,
            },
        }
    );

    if (!res.ok) return null;

    return res.json();
}

export const metadata: Metadata = {
  title: "Know",
  description: "Videos, conversations, and ideas worth pressing play for.",
  alternates: {
    canonical: "https://verycodedly.com/know",
  },
  openGraph: {
    title: "Know",
    description: "Videos, conversations, and ideas worth pressing play for.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/know",
    images: [{ url: "https://verycodedly.com/know/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Know",
    description: "Videos, conversations, and ideas worth pressing play for.",
    images: ["https://verycodedly.com/know/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default async function KnowLayout({ children }: { children: React.ReactNode }) {
  const series = await getSeries();
  if (!series) {
      notFound();
    }

  return (
    <>
      {children}
      <KnowMenu series={series.results} />
      <SearchBar />
      <Footer />
    </>
  );
}
