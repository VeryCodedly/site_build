import ReadPageClient from "./ReadPageClient";
import Script from "next/script";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is missing!');


export const revalidate = 60;

export default async function ReadPage() {
  const res = await fetch(`${apiUrl}/read-page-data/`, {
    next: { revalidate },
  });

  const data = res.ok ? await res.json() : {};

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
      <ReadPageClient data={data} />
    </>
  )
}
