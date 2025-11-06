/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MetadataRoute } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://.verycodedly.com";

  // 🧱 STATIC PAGES
  const staticPages = [
    "",
    "about",
    "blog",
    "community",
    "contact",
    "faqs",
    "know",
    "learn",
    "privacy",
    "shop",
    "support",
    "terms",
  ].map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // 📰 BLOG POSTS
  let posts: any[] = [];
  try {
    const res = await fetch(`${API_BASE}/posts/`);
    const data = await res.json();
    posts = data.results || [];
  } catch (err) {
    console.error("❌ Error fetching posts:", err);
  }

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.created_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // 🏷️ BLOG SUBCATEGORIES
  let subcategories: any[] = [];
  try {
    const res = await fetch(`${API_BASE}/subcategories/`);
    const data = await res.json();
    subcategories = data.results || [];
  } catch (err) {
    console.error("❌ Error fetching subcategories:", err);
  }

  const subcategoryUrls = subcategories.map((subcat) => ({
    url: `${baseUrl}/blog/subcategory/${subcat.slug}`,
    lastModified: new Date(subcat.updated_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 🎓 COURSES
  let courses: any[] = [];
  try {
    const res = await fetch(`${API_BASE}/courses/`);
    const data = await res.json();
    courses = data.results || [];
  } catch (err) {
    console.error("❌ Error fetching courses:", err);
  }

  const courseUrls = courses.map((course) => ({
    url: `${baseUrl}/learn/${course.slug}`,
    lastModified: new Date(course.updated_at || course.created_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // 📚 LESSONS
  const lessonUrls: MetadataRoute.Sitemap = [];
  for (const course of courses) {
    try {
      const res = await fetch(`${API_BASE}/courses/${course.slug}/lessons/`);
      const data = await res.json();
      const lessons = data.results || [];

      lessons.forEach((lesson: any) => {
        lessonUrls.push({
          url: `${baseUrl}/learn/${course.slug}/${lesson.slug}`,
          lastModified: new Date(
            lesson.updated_at || lesson.created_at || new Date()
          ),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        });
      });
    } catch (err) {
      console.error(`❌ Error fetching lessons for ${course.slug}:`, err);
    }
  }

  return [
    ...staticPages,
    ...subcategoryUrls,
    ...blogUrls,
    ...courseUrls,
    ...lessonUrls,
  ];
}

// 2. Cap at 45k URLs (Google limit = 50k)
// if (totalUrls.length > 45_000) {
//   console.warn("Sitemap >45k — split next time");
// }

// 3. Add <lastmod> fallback
// lastModified: new Date(post.updated_at ?? new Date().toISOString()),