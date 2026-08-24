import type { MetadataRoute } from "next";
import { Post, Lessons, Category, Subcategory } from "@/types/post"  // Course
import { MediaSitemapCard } from "@/types/know";
import { Room } from "@/types/connect";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE) {
  console.error("NEXT_PUBLIC_API_URL is not set!");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://verycodedly.com";

  // STATIC PAGES
  const staticPages = [
    { path: "", priority: 1.0 },
    { path: "read", priority: 0.9 },
    { path: "learn", priority: 0.9 },
    { path: "know", priority: 0.9 },
    { path: "connect", priority: 0.9 },
    { path: "merch", priority: 0.9 },
    { path: "start", priority: 0.8 },
    { path: "about", priority: 0.7 },
    { path: "community", priority: 0.7 },
    { path: "contact", priority: 0.7 },
    { path: "faqs", priority: 0.7 },
    { path: "support", priority: 0.7 },
    { path: "privacy", priority: 0.5 },
    { path: "terms", priority: 0.5 },
  ].map(({ path, priority }) => ({
    url: `${baseUrl}/${path}`,
    changeFrequency: path === "" ? "daily" as const :
      path === "read" || path === "learn" || path === "know" ? "weekly" as const :
        "monthly" as const,
    priority,
  }));

  // READ POSTS
  const readUrls: MetadataRoute.Sitemap = [];
  try {
    let postsUrl: string | null = `${API_BASE}/sitemap/posts/`;
    while (postsUrl) {
      const res: Response = await fetch(postsUrl);
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

    // console.log(`Added ${readUrls.length} post URLs to sitemap`);
  } catch (err) {
    console.error("Error fetching paginated posts:", err);
  }

  // READ CATEGORIES
  const categoryUrls: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/categories/`);
    if (res.ok) {
      const data = await res.json();
      (data.results || []).forEach((cat: Category) => {
        categoryUrls.push({
          url: `${baseUrl}/read/category/${cat.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        });
      });
    }
    // console.log(`Added ${categoryUrls.length} category URLs to sitemap`);
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }

  // READ SUBCATEGORIES
  const subcategoryUrls: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/subcategories/`);
    if (res.ok) {
      const data = await res.json();
      (data.results || []).forEach((subcat: Subcategory) => {
        subcategoryUrls.push({
          url: `${baseUrl}/read/subcategory/${subcat.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        });
      });
    }
    // console.log(`Added ${subcategoryUrls.length} subcategory URLs to sitemap`);
  } catch (err) {
    console.error("Failed to fetch subcategories:", err);
  }

  // COURSES + LESSONS
  const courseUrls: MetadataRoute.Sitemap = [];
  const lessonUrls: MetadataRoute.Sitemap = [];

  try {
    // Fetch ALL courses first
    const coursesRes = await fetch(`${API_BASE}/courses/`);

    if (coursesRes.ok) {
      const coursesData = await coursesRes.json();
      const courses = coursesData.results || coursesData || [];

      // console.log(`Found ${courses.length} total courses`);

      // Process each course ONCE
      for (const course of courses) {
        // Add course URL
        courseUrls.push({
          url: `${baseUrl}/learn/${course.slug}`,
          lastModified: new Date(course.updated_at || course.created_at || new Date()),
          changeFrequency: "weekly" as const,
          priority: 0.9,
        });

        // Fetch lessons for THIS course (once)
        const lessonsRes = await fetch(`${API_BASE}/courses/${course.slug}/`);

        if (lessonsRes.ok) {
          const lessonsData = await lessonsRes.json();
          const lessons = lessonsData.lessons || lessonsData.results || [];

          // console.log(`Course "${course.title}": ${lessons.length} lessons`);

          lessons.forEach((lesson: Lessons) => {
            lessonUrls.push({
              url: `${baseUrl}/learn/${course.slug}/${lesson.slug}`,
              lastModified: new Date(lesson.updated_at || lesson.created_at || new Date()),
              changeFrequency: "weekly" as const,
              priority: 0.8,
            });
          });
        }
      }
      // console.log(`Total: ${courseUrls.length} courses, ${lessonUrls.length} lessons`);
    }
  } catch (err) {
    console.error("Failed to fetch courses:", err);
  }

  // MERCH PRODUCTS
  const merchUrls: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${API_BASE}/store/products/`);

    if (res.ok) {
      const data = await res.json();
      const products = data.results || data || [];

      products.forEach((product: Post) => {
        merchUrls.push({
          url: `${baseUrl}/merch/${product.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      });
    }
  } catch (err) {
    console.error("Failed to fetch merch:", err);
  }

  // CONNECT ROOMS
  const connectRoomUrls: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${API_BASE}/connect/rooms/`);

    if (res.ok) {
      const data = await res.json();
      const rooms = data.results || data || [];

      rooms.forEach((room: Room) => {
        connectRoomUrls.push({
          url: `${baseUrl}/connect/rooms/${room.slug}`,
          lastModified: new Date(room.created_at || new Date()),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      });
    }
  } catch (err) {
    console.error("Failed to fetch Connect rooms:", err);
  }

  // KNOW MEDIA
  const knowUrls: MetadataRoute.Sitemap = [];

  try {
    let mediaUrl: string | null = `${API_BASE}/know/sitemap/media/`;

    while (mediaUrl) {
      const res: Response = await fetch(mediaUrl);

      if (!res.ok) {
        console.error(`Failed to fetch media from ${mediaUrl}`);
        break;
      }

      const data = await res.json();
      const media = data.results || [];

      media.forEach((item: MediaSitemapCard) => {
        knowUrls.push({
          url: `${baseUrl}/know/${item.slug}`,
          lastModified: new Date(item.updated_at),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        });
      });
      mediaUrl = data.next || null;
    }
  } catch (err) {
    console.error("Failed to fetch Know media:", err);
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
    ...merchUrls,
    ...connectRoomUrls,
    ...knowUrls,
  ];
}

