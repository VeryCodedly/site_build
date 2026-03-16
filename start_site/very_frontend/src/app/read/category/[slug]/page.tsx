import { notFound } from 'next/navigation';
import { Category, Post } from '@/types/post';
import CatClient from './CatClient';
import Script from "next/script";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is missing!');

export const revalidate = 60; 
export const dynamicParams = true;

async function getCategory(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${apiUrl}/categories/${slug}`, {
      next: { revalidate },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Category API error:', errorText);
      return null;
    }

    return res.json();
  } catch (err) {
    console.error('Category fetch failed:', err);
    return null;
  }
}

async function getTrendingPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${apiUrl}/subcategories/right-now/posts/`, {
      next: { revalidate },
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    return Array.isArray(data.results) ? data.results : data.results ?? [];
  } catch (err) {
    console.error('Trending posts fetch failed:', err);
    return [];
  }
}

// --- Page component ---
export default async function CategoryPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // 
  const category = await getCategory(slug);

  if (!category) notFound();

  const trending = await getTrendingPosts();

  return (
    <>
    {/* Structured Data */}
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "headline": category.name,
          "description": `Explore posts in the ${category.name} category on VeryCodedly.`,
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
          "datePublished": category.created_at,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://verycodedly.com/read/${category.slug}`
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
              "name": `${category.name} | VeryCodedly`,
              "item": `https://verycodedly.com/read/${category.slug}`
            }
          ]
        })}
      </Script>
    <CatClient category={category} trending={trending} />;
    </>
  );
}

// import { notFound } from 'next/navigation';
// import { unstable_cache } from 'next/cache';
// import { Category } from '@/types/post';
// import CatClient from './CatClient';
// // import { Post } from '@/types/post';

// // type Props = {
// //   params: Promise<{ slug: string }>;
// // };

// const getCachedPost = unstable_cache(
//   async (slug: string): Promise<Category | null> => {

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//       if (!apiUrl) {
//         console.error('NEXT_PUBLIC_API_URL is missing!');
//         return null;
//       }

//       const url = `${apiUrl}/categories/${slug}`;

//       const res = await fetch(url, {
//         next: { revalidate: 60 },
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error('STEP 5: API error response:', errorText);
//         return null;
//       }

//       const data = await res.json();
//       return data as Category;
//     } catch (error) {
//       console.error('STEP 7: Fetch failed with error:', error);
//       return null;
//     }
//   },
//   ['post-category-slug'],
//   { revalidate: 60 }
// );


// export default async function CategoryPage({
//   params,
// }: {  params: Promise<{ slug: string }> }) {
  
//   const { slug } = await params;
//   const category = await getCachedPost(slug);

//   if (!category) {
//     notFound();
//   }
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   const trendingRes = await fetch(`${apiUrl}/subcategories/trending-now/posts/`);
//     const trendingData = trendingRes.ok ? await trendingRes.json() : [];

//     const trending = Array.isArray(trendingData.results)
//         ? trendingData.results
//         : trendingData;

//   return <CatClient category={category} trending={trending} />;
// }