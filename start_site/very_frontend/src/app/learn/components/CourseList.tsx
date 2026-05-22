import CourseListClient from "./CourseListClient";
import { cache } from "react";
import { Lessons } from "@/types/post";


type CourseResponse = {
  results: Array<{
    id: number;
    slug: string;
    title: string;
    description: string;
    language: string;
    image: string;
    alt: string;
    lessons?: Lessons[];
  }>;
}

const getCachedCourses = cache(async (): Promise<CourseResponse | null> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not set");
      return null;
    }

    const url = `${apiUrl}/courses/`;
    // console.log(`Fetching courses from: ${url}`);

    const res = await fetch(url, {
      next: { revalidate: 300 },
      cache: "force-cache",
      headers: { "Content-Type": "application/json" },
    });

    // if (!res.ok) {
    //   console.error(`Backend returned ${res.status} for ${url}`);
    //   return null;
    // }

    const data = await res.json();
    return data as CourseResponse;
  } catch (error) {
    console.error("Courses fetch error:", error);
    return null;
  }
});

export default async function CourseList() {
  const coursesData = await getCachedCourses();

  if (!coursesData || !coursesData.results || coursesData.results.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-400 px-4">
        <p className="text-xl">No courses available yet.</p>
        <p className="mt-4">Check back soon!</p>
      </section>
    );
  }

  return <CourseListClient courses={coursesData.results} />;
}
