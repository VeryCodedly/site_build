// app/blog/[slug]/layout.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { Post } from '@/types/post';

type Props = { params: Promise<{ slug: string }> }; // params is Promise!

const getCachedPost = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        // console.error('NEXT_PUBLIC_API_URL is not set');
        return null;
      }

      const url = `${apiUrl}/posts/${slug}/`;
      // console.log('Fetching post from:', url); // ← DEBUG

      const res = await fetch(url, {
        next: { revalidate: 60 },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        // console.error(`API error: ${res.status} ${res.statusText}`);
        return null;
      }

      const data = await res.json();
      // console.log('Post fetched:', data); // ← DEBUG
      return data as Post;
    } catch (error) {
      console.error('Fetch failed:', error);
      return null;
    }
  },
  ['post-by-slug'],
  { revalidate: 60 }
);

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params; 
  const post = await getCachedPost(slug);

  if (!post) {
    notFound(); 
  }

  const title = `${post.title} | VeryCodedly`;
  const description = post.excerpt || `Read "${post.title}" on VeryCodedly.`;

  return {
    title,
    description,
    alternates: {
    canonical: `https://verycodedly.com/read/${slug}`,
  },
    openGraph: {
      title,
      description,
      url: `https://verycodedly.com/read/${slug}`,
      type: 'article',
      images: [{ url: post.image || 'https://verycodedly.com/read/opengraph-image.png' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image || 'https://verycodedly.com/read/twitter-image.png'],
      creator: '@verycodedly',
    },
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}