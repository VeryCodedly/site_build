import { notFound } from 'next/navigation';
import SubClient from './SubClient';
import { Subcategory } from '@/types/post';
import Script from "next/script";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is missing!');

export const revalidate = 60; 

async function getSubcategory(slug: string): Promise<Subcategory | null> {
  const res = await fetch(`${apiUrl}/subcategories/${slug}/`, {
    next: { revalidate },
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) return null;

  return res.json();
}

async function getSubPosts(slug: string) {
  const res = await fetch(`${apiUrl}/subcategories/${slug}/posts/`, {
    next: { revalidate },
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) return { results: [] };

  return res.json();
}

async function getTrendingPosts() {
  const res = await fetch(`${apiUrl}/subcategories/right-now/posts/`, {
    next: { revalidate },
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) return { results: [] };

  return res.json();
}

export default async function SubcategoryPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const subcategory = await getSubcategory(slug);
  if (!subcategory) notFound();

  const [postsData, trendingData] = await Promise.all([
    getSubPosts(slug),
    getTrendingPosts(),
  ]);

  const posts = Array.isArray(postsData.results) ? postsData.results : [];
  const trending = Array.isArray(trendingData.results) ? trendingData.results : [];

  return (
    <>
    {/* Structured Data */}
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "headline": subcategory.name,
          "description": subcategory.about || `Explore posts in the ${subcategory.name} subcategory on VeryCodedly.`,
          "author": {
            "@type": "Person",
            "name": "Chrise"
          },
          "publisher": {
            "@type": "Organization",
            "name": "VeryCodedly",
            "logo": {
              "@type": "ImageObject",
              "url": "https://verycodedly.com/icon.svg"
            }
          },
          "datePublished": subcategory.created_at,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://verycodedly.com/read/${subcategory.category}/${subcategory.slug}`
          }
        })}
      </Script>
      <Script id="breadcrumb-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "VeryCodedly | Tech. Code. Culture.",
              "item": "https://verycodedly.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Read | VeryCodedly",
              "item": "https://verycodedly.com/read"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": `${subcategory.category} | VeryCodedly`,
              "item": `https://verycodedly.com/read/${subcategory.category}`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": `${subcategory.name} | VeryCodedly`,
              "item": `https://verycodedly.com/read/${subcategory.category}/${subcategory.slug}`
            }
          ]
        })}
      </Script>
    <SubClient
      subcategory={subcategory}
      posts={posts}
      trending={trending}
    />
    </>
  );
}

// import { notFound } from 'next/navigation';
// import SubClient from './SubClient';
// import { Subcategory } from '@/types/post';


// const getSubcategory = async (slug: string): Promise<Subcategory | null> => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   if (!apiUrl) return null;

//   const res = await fetch(`${apiUrl}/subcategories/${slug}/`, {
//     next: { revalidate: 60 },
//   });

//   if (!res.ok) return null;
//   return res.json();
// };

// export default async function SubcategoryPage({  params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params;
//   const subcategory = await getSubcategory(slug);

//   if (!subcategory) notFound();

//   // Fetch posts for this sub + trending in parallel
//   const [postsRes, trendingRes] = await Promise.all([
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategories/${slug}/posts/`),
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategories/trending-now/posts/`),
//   ]);

//   const posts = postsRes.ok ? await postsRes.json() : { results: [] };
//   const trending = trendingRes.ok ? await trendingRes.json() : { results: [] };

//   return (
//     <SubClient
//       subcategory={subcategory}
//       posts={posts.results || []}
//       trending={trending.results || []}
//     />
//   );
// }