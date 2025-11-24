import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { Subcategory } from '@/types/post';

type Props = {
  params: Promise<{ slug: string }>;
};

const getCachedPost = unstable_cache(
  async (slug: string): Promise<Subcategory | null> => {

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        console.error('NEXT_PUBLIC_API_URL is missing!');
        return null;
      }

      const url = `${apiUrl}/subcategories/${slug}`;

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
      return data as Subcategory;
    } catch (error) {
      console.error('STEP 7: Fetch failed with error:', error);
      return null;
    }
  },
  ['post-subcategory-slug'],
  { revalidate: 60 }
);

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const subcategory = await getCachedPost(slug);

  if (!subcategory) {
    console.log('STEP 11: Triggering notFound()'); // DEBUG
    notFound();
  }

  const title = `${subcategory.name} | VeryCodedly`;
  const description = subcategory.about || `Read the latest in "${subcategory.name}" posts on VeryCodedly.`;

  return {
    title,
    description,
    alternates: {
    canonical: `https://verycodedly.com/read/subcategory/${slug}`,
  },
    openGraph: {
      title,
      description,
      url: `https://verycodedly.com/read/subcategory/${slug}`,
      type: 'article',
      images: [{ url: 'https://verycodedly.com/read/opengraph-image.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://verycodedly.com/read/twitter-image.png'],
      creator: '@verycodedly',
    },
  };
}

export default function SubcategoryPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}