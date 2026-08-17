import type { Metadata } from "next";
import { Topic } from "@/types/know";


const apiURL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getTopic(slug: string): Promise<Topic | null> {
  const res = await fetch(
    `${apiURL}/know/topic/${slug}/`,
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
  const topic = await getTopic(slug);

  if (!topic) {
    return {
      title: "Topic Not Found",
      description: "This topic doesn't exist in the Know media library.",
    };
  }

  const description = topic.description || `Explore ${topic.title} on VeryCodedly. You'll find decent takes, useful context, and the stuff worth knowing.`;

  return {
    title: topic.title,
    description,
    alternates: {
      canonical: `https://verycodedly.com/know/topic/${topic.slug}`
    },

    openGraph: {
      title: topic.title,
      description,
      siteName: "VeryCodedly",
      url: `https://verycodedly.com/know/topic/${topic.slug}`,
      images: [{ url: "https://verycodedly.com/know/opengraph-image.png" }],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: topic.title,
      description,
      images: ["https://verycodedly.com/know/twitter-image.png"],
      creator: "@verycodedly",
    },
  };
}

export default function TopicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
