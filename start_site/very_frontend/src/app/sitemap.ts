// app/sitemap.ts
import type { MetadataRoute } from "next";
import { Post, Course, Lessons, Category, Subcategory } from "@/types/post"

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE) {
  console.error("NEXT_PUBLIC_API_URL is not set!");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://verycodedly.com";

  // STATIC PAGES
  const staticPages = [
    "", "about", "read", "learn","know", "connect", "community", "contact",
     "faqs", "privacy", "shop", "support", "terms"
  ].map((path) => ({
    url: `${baseUrl}/${path}`,
    // lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  // READ POSTS
  const readUrls: MetadataRoute.Sitemap = [];
  try {
    let postsUrl: string | null = `${API_BASE}/posts/`;
    while (postsUrl) {
      const res: Response = await fetch(postsUrl, { next: { revalidate: 3600 } });
      if (!res.ok) {
        console.error(`Failed to fetch posts from ${postsUrl}`);
        break;
      }
      const data = await res.json();
      const posts = data.results || [];

      posts.forEach((post: Post) => {
        readUrls.push({
          url: `${baseUrl}/read/${post.slug}`,
          lastModified: new Date(post.updated_at || post.created_at || new Date()),
          changeFrequency: "weekly" as const,
          priority: 0.9,
        });
      });

      postsUrl = data.next || null;
    }

    console.log(`Added ${readUrls.length} post URLs to sitemap`);
  } catch (err) {
    console.error("Error fetching paginated posts:", err);
  }

  // READ CATEGORIES
  const categoryUrls: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/categories/`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      (data.results || []).forEach((cat: Category) => {
        categoryUrls.push({
          url: `${baseUrl}/read/category/${cat.slug}`,
          // lastModified: new Date(subcat.updated_at || new Date()),
          changeFrequency: "weekly" as const,
          priority: 0.85,
        });
      });
    }
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }

  // READ SUBCATEGORIES
  const subcategoryUrls: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/subcategories/`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      (data.results || []).forEach((subcat: Subcategory) => {
        subcategoryUrls.push({
          url: `${baseUrl}/read/subcategory/${subcat.slug}`,
          // lastModified: new Date(subcat.updated_at || new Date()),
          changeFrequency: "weekly" as const,
          priority: 0.85,
        });
      });
    }
  } catch (err) {
    console.error("Failed to fetch subcategories:", err);
  }

  // COURSES + LESSONS
  const courseUrls: MetadataRoute.Sitemap = [];
  const lessonUrls: MetadataRoute.Sitemap = [];

  try {
    const coursesRes = await fetch(`${API_BASE}/courses/`, { next: { revalidate: 3600 } });
    if (coursesRes.ok) {
      const coursesData = await coursesRes.json();
      const courses = coursesData.results || coursesData || [];

      // Add course URLs
      courses.forEach((course: Course) => {
        courseUrls.push({
          url: `${baseUrl}/learn/${course.slug}`,
          lastModified: new Date(course.updated_at || course.created_at || new Date()),
          changeFrequency: "weekly" as const,
          priority: 0.9,
        });
      });

      // Fetch lessons in parallel
      const lessonPromises = courses.map(async (course: Course) => {
        try {
          const lessonsRes = await fetch(`${API_BASE}/courses/${course.slug}/`, {
            next: { revalidate: 3600 },
          });
          if (!lessonsRes.ok) return [];

          const lessonsData = await lessonsRes.json();
          const rawLessons = lessonsData.lessons || lessonsData.results || lessonsData || [];
          const lessons = Array.isArray(rawLessons) ? rawLessons : [];

          return lessons.map((lesson: Lessons) => ({
            url: `${baseUrl}/learn/${course.slug}/${lesson.slug}`,
            lastModified: new Date(lesson.updated_at || lesson.created_at || new Date()),
            changeFrequency: "weekly" as const, 
            priority: 0.8,
          }));
        } catch (err) {
          console.error(`Lessons fetch failed for ${course.slug}:`, err);
          return [];
        }
      });

      const allLessonsArrays = await Promise.all(lessonPromises);
      lessonUrls.push(...allLessonsArrays.flat());
    }
  } catch (err) {
    console.error("Failed to fetch courses:", err);
  }

  // const total = [...staticPages, ...blogUrls, ...subcategoryUrls, ...courseUrls, ...lessonUrls];
  // if (total.length > 45_000) {
  //   console.warn(`Sitemap has ${total.length} URLs — consider splitting!`);
  // }

  return [
    ...staticPages,
    ...readUrls,
    ...categoryUrls,
    ...subcategoryUrls,
    ...courseUrls,
    ...lessonUrls,
  ];
}

