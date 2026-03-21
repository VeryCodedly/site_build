// app/learn/page.tsx
import { Lessons } from "@/types/post";
import LearnPageClient from "./LearnPageClient";
import { cache } from "react";
import Script from "next/script";

type Course = {
  id: number;
  slug: string;
  title: string;
  description: string;
  language?: string;
  image?: string;
  alt?: string;
  lessons?: Lessons[];
};

const getCourses = cache(async (): Promise<Course[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return [];

  try {
    const res = await fetch(`${apiUrl}/courses/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.results || [];
  } catch {
    return [];
  }
});

export default async function LearnPage() {
  const courses = await getCourses();

  return (
    <>
      <Script
        id="learn-collection-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Learn | VeryCodedly",
          "description": "Beginner-friendly coding lessons that help complex ideas click, one concept at a time. Start with frontend, backend, or AI & data science.",
          "provider": {
            "@type": "Organization",
            "name": "VeryCodedly",
            "sameAs": "https://verycodedly.com"
          },
          "url": "https://verycodedly.com/learn",
          "inLanguage": "en"
        })}
      </Script>
      <LearnPageClient courses={courses} />
    </>
  )
}