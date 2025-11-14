// app/sitemap.ts
import type { MetadataRoute } from "next";
import { Post, Course, Lessons, Subcategory } from "@/types/post"

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE) {
  console.error("NEXT_PUBLIC_API_URL is not set!");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://verycodedly.com";

  // STATIC PAGES
  const staticPages = [
    "", "about", "blog", "community", "contact", "faqs",
    "know", "learn", "privacy", "shop", "support", "terms"
  ].map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  // BLOG POSTS
  const blogUrls: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/posts/`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      (data.results || []).forEach((post: Post) => {
        blogUrls.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at || post.created_at || new Date()),
          changeFrequency: "weekly" as const,
          priority: 0.9,
        });
      });
    }
  } catch (err) {
    console.error("Failed to fetch posts:", err);
  }

  // BLOG SUBCATEGORIES
  const subcategoryUrls: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/subcategories/`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      (data.results || []).forEach((subcat: Subcategory) => {
        subcategoryUrls.push({
          url: `${baseUrl}/blog/subcategory/${subcat.slug}`,
          // lastModified: new Date(subcat.updated_at || new Date()),
          changeFrequency: "weekly" as const,
          priority: 0.85,
        });
      });
    }
  } catch (err) {
    console.error("Failed to fetch subcategories:", err);
  }

  // COURSES
  const courseUrls: MetadataRoute.Sitemap = [];
  const lessonUrls: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${API_BASE}/courses/`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const courses = data.results || [];

      courses.forEach((course: Course) => {
        // Course page
        courseUrls.push({
          url: `${baseUrl}/learn/${course.slug}`,
          lastModified: new Date(course.updated_at || course.created_at || new Date()),
          changeFrequency: "weekly" as const,
          priority: 0.9,
        });

        // Fetch lessons
        fetch(`${API_BASE}/courses/${course.slug}/lessons/`, { next: { revalidate: 3600 } })
          .then(r => r.ok ? r.json() : null)
          .then(data => {
            if (data?.results) {
              data.results.forEach((lesson: Lessons) => {
                lessonUrls.push({
                  url: `${baseUrl}/learn/${course.slug}/${lesson.slug}`,
                  lastModified: new Date(lesson.updated_at || lesson.created_at || new Date()),
                  changeFrequency: "monthly" as const,
                  priority: 0.7,
                });
              });
            }
          })
          .catch(err => console.error(`Lessons fetch failed for ${course.slug}:`, err));
      });
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
    ...blogUrls,
    ...subcategoryUrls,
    ...courseUrls,
    ...lessonUrls,
  ];
}

