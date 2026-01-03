import { notFound } from 'next/navigation';
import SubClient from './SubClient';
import { Subcategory } from '@/types/post';
import { cache } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is missing!');

export const revalidate = 60; 

// Cached subcategory fetch
const getSubcategoryCached = cache(async (slug: string): Promise<Subcategory | null> => {
  const res = await fetch(`${apiUrl}/subcategories/${slug}/`, {
    next: { revalidate }, // refresh every 1 minute
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) return null;
  return res.json();
});

// Cached posts fetch
const getSubPostsCached = cache(async (slug: string) => {
  const res = await fetch(`${apiUrl}/subcategories/${slug}/posts/`, {
    next: { revalidate },
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) return { results: [] };
  return res.json();
});

// Cached trending posts
const getTrendingPostsCached = cache(async () => {
  const res = await fetch(`${apiUrl}/subcategories/trending-now/posts/`, {
    next: { revalidate },
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) return { results: [] };
  return res.json();
});

export default async function SubcategoryPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const subcategory = await getSubcategoryCached(slug);
  if (!subcategory) notFound();

  const [postsData, trendingData] = await Promise.all([
    getSubPostsCached(slug),
    getTrendingPostsCached(),
  ]);

  const posts = Array.isArray(postsData.results) ? postsData.results : [];
  const trending = Array.isArray(trendingData.results) ? trendingData.results : [];

  return (
    <SubClient
      subcategory={subcategory}
      posts={posts}
      trending={trending}
    />
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