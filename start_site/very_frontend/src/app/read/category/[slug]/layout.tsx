import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { Category } from '@/types/post';

type Props = {
  params: Promise<{ slug: string }>;
};

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

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const category = await getCachedPost(slug);

  if (!category) {
    console.log('STEP 11: Triggering notFound()'); // DEBUG
    notFound();
  }

    const title = `${category.name} | VeryCodedly`;
    const description = `Read the latest in ${category.name} posts on VeryCodedly.`;

  return {
    title,
    description,
    alternates: {
    canonical: `https://verycodedly.com/read/category/${slug}`,
  },
    openGraph: {
      title: `${category.name} | VeryCodedly`,
      description: `All posts in ${category.name}`,
      url: `https://verycodedly.com/read/category/${slug}`,
      type: "website",
      images: [{ url: 'https://verycodedly.com/read/opengraph-image.png' }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | VeryCodedly`,
      description: `Latest in ${category.name}`,
      images: ['https://verycodedly.com/read/twitter-image.png'],
      creator: '@verycodedly',
    },
  };
}
    
export default function CategoryPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}