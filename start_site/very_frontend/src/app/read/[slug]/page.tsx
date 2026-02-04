import { notFound } from 'next/navigation';
import { cache } from 'react';
import { Post } from '@/types/post';
import PostClient from './PostClient';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is missing'); // Server-only fail

export const revalidate = 0; // 3 minutes
export const dynamicParams = true;

// --- Fetch with React cache ---
const getPost = cache(async (slug: string): Promise<Post | null> => {
  const res = await fetch(`${apiUrl}/posts/${slug}/`, {
    next: { revalidate },
    cache: 'force-cache', // ensure server caching
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) return null;
  return (await res.json()) as Post;
});

const getRelatedPosts = cache(async (subSlug?: string) => {
  if (!subSlug) return { results: [] as Post[] };
  const res = await fetch(`${apiUrl}/subcategories/${subSlug}/posts/`, {
    next: { revalidate },
    cache: 'force-cache',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.ok ? await res.json() : { results: [] };
});

const getTrendingPosts = cache(async () => {
  const res = await fetch(`${apiUrl}/subcategories/right-now/posts/`, {
    next: { revalidate },
    cache: 'force-cache',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.ok ? await res.json() : { results: [] };
});

// Page
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>; // mark as Promise
}) {
  const { slug } = await params;  

  const post = await getPost(slug);
  if (!post) notFound();

  const subSlug = post.subcategory?.slug;
  const [related, trending] = await Promise.all([
    getRelatedPosts(subSlug),
    getTrendingPosts(),
  ]);

  return (
    <PostClient
      key={post.slug} // force refresh if slug change
      post={post}
      related={related.results ?? []}
      trending={trending.results ?? []}
    />
  );
}


// import { notFound } from 'next/navigation';
// import { unstable_cache } from 'next/cache';
// import { Post } from '@/types/post';
// import PostClient from './PostClient';

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// if (!apiUrl) throw new Error('API_URL missing'); // Server-only fail

// export const revalidate = 900; // 15 minutes
// export const dynamicParams = true;

// // Cached post fetch
// const getCachedPost = unstable_cache(
//   async (slug: string): Promise<Post | null> => {
//     const res = await fetch(`${apiUrl}/posts/${slug}/`);
//     if (!res.ok) return null;
//     return (await res.json()) as Post;
//   },
//   ['posts-by-slug', 'slug'], // + slug arg → per-post keys
//   { revalidate: 900 }
// );

// // Cached related/trending
// const getRelatedPosts = unstable_cache(
//   async (subSlug?: string) => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     if (!subSlug) return { results: [] as any[] };
//     const res = await fetch(`${apiUrl}/subcategories/${subSlug}/posts/`);
//     return res.ok ? await res.json() : { results: [] };
//   },
//   ['related-posts'],
//   { revalidate: 900 }
// );

// const getTrendingPosts = unstable_cache(
//   async () => {
//     const res = await fetch(`${apiUrl}/subcategories/trending-now/posts/`);
//     return res.ok ? await res.json() : { results: [] };
//   },
//   ['trending-posts'],
//   { revalidate: 900 }
// );

// // Static params (if API lists slugs at build)
// // export async function generateStaticParams() {
// //   const res = await fetch(`${apiUrl}/posts/?limit=100`); // Paginate if many
// //   const { results } = await res.json();
// //   return results.map((post: Post) => ({ slug: post.slug }));
// // }

// export default async function BlogPostPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const post = await getCachedPost(slug);
//   if (!post) notFound();

//   const subSlug = post.subcategory?.slug;
//   const [related, trending] = await Promise.all([
//     getRelatedPosts(subSlug),
//     getTrendingPosts()
//   ]);

//   return (
//     <PostClient
//       key={post.slug}
//       post={post}
//       related={related.results || []}
//       trending={trending.results || []}
//     />
//   );
// }

// 'use client';

// import { useParams } from 'next/navigation';
// import { useGetPostBySlugQuery } from '@/features/api/apiSlice';
// import Image from 'next/image';
// import { Post, PostResponse } from '@/types/post';

// export default function BlogPost() {
//   const { slug } = useParams<{ slug: string }>();
//   const { data: post, error, isLoading } = useGetPostBySlugQuery(slug!);

//   if (isLoading) return <p>Loading post...</p>;
//   if (error) return <p className="text-red-500">Failed to load post</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4 text-lime-400">{post?.title}</h1>
//       <article className="text-gray-400">{post?.content_plain_text}</article>
//       <Image src={post?.image ?? '/blog-post-image.png'} alt={post?.alt ?? 'Blog post image'} width={600} height={400} />
//       <p>{post?.author}</p>
//       <p>{post?.caption}</p>
//       <p>{post?.alt}</p>
//       <p>{post?.author}</p>
//       <div className="grid grid-cols-2 gap-4">
//           {post?.images.map((img) => (
//             <Image 
//               key={img.id} 
//               src={img.image  ?? '/blog-post-image.png'}
//               alt={img.alt ?? "Post image"} 
//               className="rounded-lg"
//               width={300}
//               height={200}
//             />
//           ))}
//         </div>      
//       <p key={post?.category.id} className="text-gray-400 rounded-lg">{post?.category.name}</p>
//       <p className="text-gray-400 rounded-lg">{post?.subcategory.name}</p>
//       {/* <p className="text-gray-400 rounded-lg">{post?.comments}</p> */}
//       {/* <p className="text-gray-400 rounded-lg">{post?.links.label}</p> */}
//       <p className="text-gray-400 rounded-lg">{post?.tags}</p>
//       <p className="text-gray-400 rounded-lg">{post?.author}</p>
//       <p className="text-gray-400 rounded-lg">{post?.status}</p>
//       <p className="text-gray-400 rounded-lg">{post?.created_at}</p>
//       <p className="text-gray-400 rounded-lg">{post?.updated_at}</p>
//     </div>
//   );
// }
