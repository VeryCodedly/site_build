import type { Metadata } from "next";
import { Series } from "@/types/know";


const apiURL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getSeries(slug: string): Promise<Series | null> {
  const res = await fetch(
    `${apiURL}/know/series/${slug}/`,
    {
      next: {
        revalidate: 300,
      },
    }
  );

  if (!res.ok) return null;

  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = await getSeries(slug);

  if (!series) {
    return {
      title: "Series Not Found",
      description: "This series doesn't exist in the Know media library.",
    };
  }

  const description = series.description ||
    `Explore ${series.title} on VeryCodedly. You'll find decent takes, useful context, and the stuff worth knowing.`;

  return {
    title: series.title,
    description,
    alternates: {
      canonical: `https://verycodedly.com/know/series/${series.slug}`,
    },

    openGraph: {
      title: series.title,
      description,
      siteName: "VeryCodedly",
      url: `https://verycodedly.com/know/series/${series.slug}`,
      images: [{ url: "https://verycodedly.com/know/opengraph-image.png" }],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: series.title,
      description,
      images: ["https://verycodedly.com/know/twitter-image.png"],
      creator: "@verycodedly",
    },
  };
}

export default function SeriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}