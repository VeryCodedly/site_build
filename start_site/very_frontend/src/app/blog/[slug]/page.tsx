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

'use client';

import { useParams } from 'next/navigation';
import { useGetPostBySlugQuery } from '@/features/api/apiSlice';
import Link from 'next/link';
import { motion as Motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Post } from '@/types/post';
import NewsletterCard from '../components/blog/NewsletterCard';
import RelatedPostsSection from '../components/blog/RelatedPostsSection';
import PostContent, { BlogBlock } from '../components/blog/PostContent';


interface BlogContentJSON {
  title?: string;
  blocks: BlogBlock[];
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: postData, error, isLoading } = useGetPostBySlugQuery(slug!);

  if (isLoading) {
    return (
      <section className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-zinc-900 text-gray-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
          Loading post...
        </div>
      </section>
    );
  }

  if (error || !postData) {
    return (
      <section className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-black to-zinc-900 text-gray-400 px-4">
        <div className="text-center py-20">
          <p className="text-rose-400 text-lg mb-4">
            Failed to load posts
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-1 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 rounded-full text-rose-300 transition-all"
          >
            Try Again
          </button>
        </div>
      </section >
    );
  }

  const post: Post = postData;

  let contentJson: BlogContentJSON | null = null;
  try {
    contentJson = typeof post.content_JSON === 'string'
      ? JSON.parse(post.content_JSON)
      : post.content_JSON as BlogContentJSON | unknown;
  } catch (err) {
    console.error('BlogPost: Failed to parse content_JSON →', err);
  }

  return (
    <section className="relative w-full bg-gradient-to-b from-black via-zinc-950 to-black text-white min-h-screen py-12 sm:py-12 px-8">
      {/* Back Button */}
      <Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="max-w-6xl mx-auto mb-6 sm:mb-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-lime-400 hover:text-white underline underline-offset-2 transition-all duration-200 text-sm sm:text-base">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <span className="sr-only">Go Home</span>
        </Link>
      </Motion.div>

      <article className="max-w-4xl mx-auto">
        <PostContent post={post} contentJson={contentJson} />
      </article>

      <RelatedPostsSection subSlug={post.subcategory?.slug || "Posts"} />

      <NewsletterCard />
    </section>
  );
}