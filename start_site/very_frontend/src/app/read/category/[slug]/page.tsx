import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { Category } from '@/types/post';
import CatClient from './CatClient';
// import { Post } from '@/types/post';

// type Props = {
//   params: Promise<{ slug: string }>;
// };

const getCachedPost = unstable_cache(
  async (slug: string): Promise<Category | null> => {

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        console.error('NEXT_PUBLIC_API_URL is missing!');
        return null;
      }

      const url = `${apiUrl}/categories/${slug}`;

      const res = await fetch(url, {
        next: { revalidate: 60 },
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('STEP 5: API error response:', errorText);
        return null;
      }

      const data = await res.json();
      return data as Category;
    } catch (error) {
      console.error('STEP 7: Fetch failed with error:', error);
      return null;
    }
  },
  ['post-category-slug'],
  { revalidate: 60 }
);


export default async function CategoryPage({
  params,
}: {  params: Promise<{ slug: string }> }) {
  
  const { slug } = await params;
  const category = await getCachedPost(slug);

  if (!category) {
    notFound();
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const trendingRes = await fetch(`${apiUrl}/subcategories/trending-now/posts/`);
    const trendingData = trendingRes.ok ? await trendingRes.json() : [];

    const trending = Array.isArray(trendingData.results)
        ? trendingData.results
        : trendingData;

  return <CatClient category={category} trending={trending} />;
}