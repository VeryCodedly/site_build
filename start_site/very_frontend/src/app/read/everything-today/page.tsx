import EverythingTodayFeed from "./EverythingTodayFeed";
import type { EverythingResponse } from "@/types/post";
import Script from "next/script";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is missing!");

export const revalidate = 180;

const emptyResponse: EverythingResponse = {
  next: null,
  previous: null,
  results: [],
};

async function getEverything(): Promise<EverythingResponse> {
  try {
    const res = await fetch(`${apiUrl}/everything/`, {
      next: { revalidate },
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) return emptyResponse;

    return (await res.json()) as EverythingResponse;
  } catch (error) {
    console.error("Everything API fetch failed:", error);
    return emptyResponse;
  }
}

export default async function EverythingTodayPage() {
  const initialData = await getEverything();

  return (
    <>
      {/* Collection Structured Data */}
      <Script
        id="everything-today-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Everything, Today | VeryCodedly",
          description:
            "Interesting things, passing thoughts, and stories worth keeping. Beyond the headlines.",
          url: "https://verycodedly.com/read/everything-today",
          inLanguage: "en",
          publisher: {
            "@type": "Organization",
            name: "VeryCodedly",
            url: "https://verycodedly.com",
            logo: {
              "@type": "ImageObject",
              url: "https://verycodedly.com/icon.svg",
            },
          },
        })}
      </Script>

      {/* Breadcrumb Structured Data */}
      <Script
        id="everything-today-breadcrumb-data"
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
              name: "Read | VeryCodedly",
              item: "https://verycodedly.com/read",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Everything, Today | VeryCodedly",
              item: "https://verycodedly.com/read/everything-today",
            },
          ],
        })}
      </Script>

      <EverythingTodayFeed initialData={initialData} />
    </>
  );
}
