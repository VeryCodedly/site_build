// app/learn/page.tsx
import { Lessons } from "@/types/post";
import LearnPageClient from "./LearnPageClient";
import { cache } from "react";

type Course = {
  id: number;
  slug: string;
  title: string;
  description: string;
  language?: string;
  image?: string;
  alt?: string;
  lessons?: Lessons[];
};

const getCourses = cache(async (): Promise<Course[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return [];

  try {
    const res = await fetch(`${apiUrl}/courses/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.results || [];
  } catch {
    return [];
  }
});

export default async function LearnPage() {
  const courses = await getCourses();

  return <LearnPageClient courses={courses} />;
}