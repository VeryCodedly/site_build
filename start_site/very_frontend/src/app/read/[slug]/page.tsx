import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { Post } from '@/types/post';
import PostClient from './PostClient';

const getCachedPost = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return null;

    const res = await fetch(`${apiUrl}/posts/${slug}/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return (await res.json()) as Post;
  },
  ['post-by-slug'],
  { revalidate: 60 }
);

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getCachedPost(slug);

  if (!post) notFound();
  
  // Extract subcategory slug
  const subSlug = post.subcategory?.slug;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return null;

  // 2. Fetch related + trending in parallel
  const [relatedRes, trendingRes] = await Promise.all([
    subSlug
      ? fetch(`${apiUrl}/subcategories/${subSlug}/posts/`)
      : Promise.resolve(new Response(JSON.stringify({ ok: false }))),

    fetch(`${apiUrl}/subcategories/trending-now/posts/`)
  ]);

  const related = relatedRes.ok ? await relatedRes.json() : { results: [] };
  const trending = trendingRes.ok ? await trendingRes.json() : { results: [] };


  return (
    <PostClient post={post} related={related.results || []} trending={trending.results || []} />
     );
}

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
