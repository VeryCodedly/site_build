import RSS from "rss";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE) {
  console.error("NEXT_PUBLIC_API_URL is not set!");
}
export async function GET() {

  const site_url = "https://verycodedly.com";

  const feed = new RSS({
    title: "VeryCodedly",
    description: "We like Tech, Code, Culture and everything in between, so we built a place to talk about it with you. Here you'll find hardware deep dives, free coding courses, and the latest digital trends.",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    language: "en",
  });

  // fetch posts from your API
  const res = await fetch(`${API_BASE}/posts/`);
  const posts = await res.json();

  posts.slice(0, 10).forEach(post => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${site_url}/read/${post.slug}`,
      date: post.published_at
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}