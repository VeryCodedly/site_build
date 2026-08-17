import type { Metadata } from "next";
import { MediaCard } from "@/types/know";


const apiURL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  params: Promise<{ slug: string }>;
}

async function getMedia(slug: string): Promise<MediaCard | null> {
  const res = await fetch(
    `${apiURL}/know/media/${slug}/`,
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
  const media = await getMedia(slug);

  if (!media) {
    return {
      title: "Media Not Found",
      description: "This piece is not part of the Know media library.",
    };
  }

  const description = media.description ||
    `Watch ${media.title} on VeryCodedly. You'll find useful context, decent takes, and the stuff worth knowing.`;

  return {
    title: media.title,
    description,
    alternates: {
      canonical: `https://verycodedly.com/know/${media.slug}`
    },

    openGraph: {
      title: media.title,
      description,
      siteName: "VeryCodedly",
      url: `https://verycodedly.com/know/${media.slug}`,
      images: [{ url: media.thumbnail }],
      type: "video.other",
    },

    twitter: {
      card: "summary_large_image",
      title: media.title,
      description,
      images: [media.thumbnail],
      creator: "@verycodedly",
    },

  };
}

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
