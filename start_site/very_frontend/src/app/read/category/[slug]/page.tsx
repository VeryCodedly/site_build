import { notFound } from 'next/navigation';
import { cache } from 'react';
import { Category, Post } from '@/types/post';
import CatClient from './CatClient';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is missing!');

export const revalidate = 60; 
export const dynamicParams = true;

// Cached category fetch 
const getCategory = cache(async (slug: string): Promise<Category | null> => {
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

    return (await res.json()) as Category;
  } catch (err) {
    console.error('Category fetch failed:', err);
    return null;
  }
});

// Cached trending posts fetch
const getTrendingPosts = cache(async (): Promise<Post[]> => {
  try {
    const res = await fetch(`${apiUrl}/subcategories/trending-now/posts/`, {
      next: { revalidate },
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    return Array.isArray(data.results) ? data.results : data.results ?? [];
  } catch (err) {
    console.error('Trending posts fetch failed:', err);
    return [];
  }
});

// --- Page component ---
export default async function CategoryPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // 
  const category = await getCategory(slug);

  if (!category) notFound();

  const trending = await getTrendingPosts();

  return <CatClient category={category} trending={trending} />;
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