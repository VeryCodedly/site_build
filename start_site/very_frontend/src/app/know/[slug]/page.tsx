import MediaClient from "./MediaClient";
import { MediaCard } from "@/types/know";
import Script from "next/script";
import { notFound } from "next/navigation";


const apiURL = process.env.NEXT_PUBLIC_API_URL;


async function getMedia(slug: string): Promise<MediaCard> {
  const res = await fetch(`${apiURL}/know/media/${slug}/`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch media.");
  }

  return res.json();
}

export default async function MediaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const media = await getMedia(slug);

  if (!media) {
    notFound();
  }

  const description = media.description ||
    `Watch ${media.title} on VeryCodedly.`;

  return (
    <>
      <Script id="media-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: media.title,
          description,
          thumbnailUrl: media.thumbnail,
          uploadDate: media.published_at,
          duration: media.duration
            ? `PT${media.duration}S`
            : undefined,
          contentUrl: media.youtube_url || undefined,
          publisher: {
            "@type": "Organization",
            name: "VeryCodedly",
            sameAs: "https://verycodedly.com",
          },
          url: `https://verycodedly.com/know/${media.slug}`,
          inLanguage: "en",
        })}
      </Script>

      <Script id="media-breadcrumb-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "VeryCodedly | Tech. Code. Culture.",
              item: "https://verycodedly.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Know",
              item: "https://verycodedly.com/know",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: media.title,
              item: `https://verycodedly.com/know/${media.slug}`,
            },
          ],
        })}
      </Script>
      <MediaClient media={media} />
    </>
  );
}