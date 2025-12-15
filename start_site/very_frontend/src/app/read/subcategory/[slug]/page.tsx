import { notFound } from 'next/navigation';
import SubClient from './SubClient';
import { Subcategory } from '@/types/post';


const getSubcategory = async (slug: string): Promise<Subcategory | null> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;

  const res = await fetch(`${apiUrl}/subcategories/${slug}/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
};

export default async function SubcategoryPage({  params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subcategory = await getSubcategory(slug);

  if (!subcategory) notFound();

  // Fetch posts for this sub + trending in parallel
  const [postsRes, trendingRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategories/${slug}/posts/`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategories/trending-now/posts/`),
  ]);

  const posts = postsRes.ok ? await postsRes.json() : { results: [] };
  const trending = trendingRes.ok ? await trendingRes.json() : { results: [] };

  return (
    <SubClient
      subcategory={subcategory}
      posts={posts.results || []}
      trending={trending.results || []}
    />
  );
}