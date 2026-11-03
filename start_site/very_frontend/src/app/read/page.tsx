import ReadPageClient from "./ReadPageClient";
import Script from "next/script";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is missing!');


export const revalidate = 180;

export default async function ReadPage() {
  const [initialRes, techRes, everythingRes] = await Promise.all([
    fetch(`${apiUrl}/read-initial/`, {
      next: { revalidate },
    }),

    fetch(`${apiUrl}/read-section/tech/`, {
      next: { revalidate },
    }),

    fetch(`${apiUrl}/everything/?page_size=3`, {
      next: { revalidate },
    }),
  ]);

  const initialData = initialRes.ok? await initialRes.json() : {};

  const techData = techRes.ok? await techRes.json() : {};

  const everythingData = everythingRes.ok? await everythingRes.json() : { everything: [] };

  return (
    <>
      <Script
        id="blog-collection-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Read | VeryCodedly",
          "description": "Unfiltered takes on Tech, Code, Culture and everything in between. Come in, we've got good reads.",
          "provider": {
            "@type": "Organization",
            "name": "VeryCodedly",
            "sameAs": "https://verycodedly.com"
          },
          "url": "https://verycodedly.com/read",
          "inLanguage": "en"
        })}
      </Script>
      <ReadPageClient initialData={initialData} techData={techData} everythingData={everythingData} />
    </>
  )
}
