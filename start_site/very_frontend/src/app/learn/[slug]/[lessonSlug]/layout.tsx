// app/learn/[slug]/[lessonSlug]/layout.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { Lessons } from '@/types/post';

type Props = {
  params: Promise<{ slug: string; lessonSlug: string }>;
};

const getCachedLesson = unstable_cache(
  async (courseSlug: string, lessonSlug: string): Promise<Lessons | null> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        console.error('NEXT_PUBLIC_API_URL is not set');
        return null;
      }

      // YOUR BACKEND ENDPOINT
      const url = `${apiUrl}/courses/${courseSlug}/lessons/${lessonSlug}`;
      // Example: /courses/html-for-beginners/lessons/intro-to-html

      const res = await fetch(url, {
        next: { revalidate: 60 },
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) return null;

      const data = await res.json(); // AWAIT
      return data as Lessons;
    } catch (error) {
      console.error('Fetch failed:', error);
      return null;
    }
  },
  ['lesson-by-slugs'],
  { revalidate: 60 }
);

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug, lessonSlug } = await props.params;
  const lesson = await getCachedLesson(slug, lessonSlug);

  if (!lesson) notFound();

  const title = `${lesson.title} | ${lesson.course.split(' ')[1]}`;
  const description = `Learn "${lesson.title}" in the '${lesson.course.split(' ')[1]}' course from VeryCodedly.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://verycodedly.com/learn/${slug}/${lessonSlug}`,
      type: 'article',
      images: [
        { url: 'https://verycodedly.com/learn/opengraph-image.png' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://verycodedly.com/learn/twitter-image.png'],
      creator: '@verycodedly',
    },
  };
}

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}