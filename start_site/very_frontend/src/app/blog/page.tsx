// app/blog/page.tsx
export const metadata = {
  title: "Blog | Very Codedly",
};

async function getPosts() {
  // Replace with your DRF API URL
  const res = await fetch("http://127.0.0.1:8000/api/posts/", {
    // Next.js fetch caching options
    next: { revalidate: 60 }, // revalidates every 60s (ISR)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">📝 Blog</h1>

      <ul className="space-y-6">
        {posts.map((post: any) => (
          <li
            key={post.id}
            className="p-6 border rounded-lg shadow hover:shadow-md transition"
          >
            <a href={`/blog/${post.id}`}>
              <h2 className="text-2xl font-semibold mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
