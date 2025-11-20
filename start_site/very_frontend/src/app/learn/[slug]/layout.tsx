// app/learn/[slug]/layout.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { Course } from '@/types/post'; 

type Props = {
  params: Promise<{ slug: string }>;
};

const getCachedCourse = unstable_cache(
  async (slug: string): Promise<Course | null> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        console.error('NEXT_PUBLIC_API_URL is not set');
        return null;
      }

      const url = `${apiUrl}/courses/${slug}`;

      const res = await fetch(url, {
        next: { revalidate: 60 },
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) return null;

      const data = await res.json(); // AWAIT
      return data as Course;
    } catch (error) {
      console.error('Fetch failed:', error);
      return null;
    }
  },
  ['course-by-slug'],
  { revalidate: 60 }
);

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const course = await getCachedCourse(slug);

  if (!course) notFound();

  const title = `${course.title} | VeryCodedly`;
  const description = course.description || `"Start the ${course.title}" with hands-on lessons on VeryCodedly.`;

  return {
    title,
    description,
    alternates: {
    canonical: `https://verycodedly.com/learn/${slug}`,
  },
    openGraph: {
      title,
      description,
      url: `https://verycodedly.com/learn/${slug}`,
      type: 'website', // or 'course' if you use schema
      images: [
        { url: course.image || 'https://verycodedly.com/learn/opengraph-image.png' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [course.image || 'https://verycodedly.com/learn/twitter-image.png'],
      creator: '@verycodedly',
    },
  };
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}