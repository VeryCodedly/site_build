import { notFound } from 'next/navigation';
import { Post } from '@/types/post';
import PostClient from './PostClient';
import Script from "next/script";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is missing'); // Server-only fail

export const revalidate = 180; // 3 minutes
export const dynamicParams = true;

async function getPost(slug: string): Promise<Post | null> {
  const res = await fetch(`${apiUrl}/posts/${slug}/`, {
    next: { revalidate: 180 },
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) return null;
  return res.json();
}

async function getRelatedPosts(subSlug?: string) {
  if (!subSlug) return { results: [] as Post[] };

  const res = await fetch(`${apiUrl}/subcategories/${subSlug}/posts/`, {
    next: { revalidate: 180 },
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) return { results: [] };

  return res.json();
}

async function getTrendingPosts() {
  const res = await fetch(`${apiUrl}/subcategories/right-now/posts/`, {
    next: { revalidate: 180 },
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) return { results: [] };

  return res.json();
}

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
    <>
    {/* Structured Data */}
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt,
          "author": {
            "@type": "Person",
            "name": "Chrise"
          },
          "publisher": {
            "@type": "Organization",
            "name": "VeryCodedly",
            "logo": {
              "@type": "ImageObject",
              "url": "https://verycodedly.com/icon.svg"
            }
          },
          "datePublished": post.created_at,
          "dateModified": post.updated_at,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://verycodedly.com/read/${post.slug}`
          }
        })}
      </Script>
      <Script id="breadcrumb-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "VeryCodedly | Tech. Code. Culture.",
              "item": "https://verycodedly.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Read | VeryCodedly",
              "item": "https://verycodedly.com/read"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": `${post.title} | VeryCodedly`,
              "item": `https://verycodedly.com/read/${post.slug}`
            }
          ]
        })}
      </Script>

    <PostClient
      key={post.slug} // force refresh if slug change
      post={post}
      related={related.results ?? []}
      trending={trending.results ?? []}
    />
  </>
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
