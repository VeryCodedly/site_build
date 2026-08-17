import TopicClient from "./TopicClient";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Topic } from "@/types/know";


const apiURL = process.env.NEXT_PUBLIC_API_URL;

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

async function getMedia(slug: string) {
    const res = await fetch(
        `${apiURL}/know/media/?topic=${slug}`,
        {
            next: {
                revalidate: 60,
            },
        }
    );

    if (!res.ok) {
        return null;
    }

    return res.json();
}

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function TopicPage({ params }: Props) {
    const { slug } = await params;
    const response = await getMedia(slug);

    if (!response) {
        notFound();
    }

    const topic = await getTopic(slug);
    if (!topic) {
        notFound();
    }

    const description = topic.description ||
        `Explore ${topic.title} on VeryCodedly. You'll find decent takes, useful context, and the stuff worth knowing.`;

    return (
        <>
            <Script id="topic-structured-data" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    name: topic.title,
                    description,
                    provider: {
                        "@type": "Organization",
                        name: "VeryCodedly",
                        sameAs: "https://verycodedly.com",
                    },
                    url: `https://verycodedly.com/know/topic/${topic.slug}`,
                    inLanguage: "en",
                })}
            </Script>

            <Script id="topic-breadcrumb-structured-data" type="application/ld+json">
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
                            name: topic.title,
                            item: `https://verycodedly.com/know/topic/${topic.slug}`,
                        },
                    ],
                })}
            </Script>
            <TopicClient title={slug} description={description}media={response.results} />
        </>
    );
}