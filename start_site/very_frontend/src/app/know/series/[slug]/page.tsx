import { notFound } from "next/navigation";
import SeriesClient from "./SeriesClient";
import { Series } from "@/types/know";
import Script from "next/script";


const apiURL = process.env.NEXT_PUBLIC_API_URL;

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

async function getSeriesMedia(slug: string) {
    const res = await fetch(
        `${apiURL}/know/media/?series=${slug}`,
        {
            next: {
                revalidate: 60,
            },
        }
    );

    if (!res.ok) return null;
    return res.json();
}

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function SeriesPage({ params }: Props) {
    const { slug } = await params;
    
    const response = await getSeriesMedia(slug);
    if (!response) notFound();

    const series = await getSeries(slug);
    if (!series) notFound();

    const description = series.description ||
        `Explore the ${series.title} series on VeryCodedly.`;

    return (
        <>
            <Script id="series-structured-data" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    name: series.title,
                    description,
                    provider: {
                        "@type": "Organization",
                        name: "VeryCodedly",
                        sameAs: "https://verycodedly.com",
                    },
                    url: `https://verycodedly.com/know/series/${series.slug}`,
                    inLanguage: "en",
                })}
            </Script>

            <Script
                id="series-breadcrumb-structured-data"
                type="application/ld+json"
            >
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
                            name: series.title,
                            item: `https://verycodedly.com/know/series/${series.slug}`,
                        },
                    ],
                })}
            </Script>
            <SeriesClient title={slug} description={description} media={response.results} />
        </>
    );
}