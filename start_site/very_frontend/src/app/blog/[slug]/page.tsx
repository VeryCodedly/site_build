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
import Image from 'next/image';
import Link from 'next/link';
import { motion as Motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCalendar, faUser, faComment, faHashtag, faImage, faLink } from '@fortawesome/free-solid-svg-icons';
import { Post } from '@/types/post';
import NewsletterCard from '../components/blog/NewsletterCard';
import CodeBlock from '@/app/learn/components/CodeBlock';

interface BlogBlock {
  type: 'heading' | 'paragraph' | 'list' | 'link' | 'callout' | 'code';
  level?: number;
  content?: string;
  style?: 'bullet' | 'number';
  items?: string[];
  text?: string;
  url?: string;
  language?: string;
}

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
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-white/80">Post Not Found</h2>
          <p>Failed to load this post.</p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 text-lime-400 hover:text-white underline underline-offset-2 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="sm" />
            Back to blog
          </Link>
        </div>
      </section>
    );
  }

  const post: Post = postData;

  // Parse content_JSON
  let contentJson: BlogContentJSON | null = null;
  try {
    contentJson = typeof post.content_JSON === 'string'
      ? JSON.parse(post.content_JSON)
      : post.content_JSON as BlogContentJSON | unknown;
  } catch (err) {
    console.error('BlogPost: Failed to parse content_JSON →', err);
  }

  return (
    <section className="relative w-full bg-gradient-to-b from-black via-zinc-950 to-black text-white min-h-screen py-8 sm:py-12 px-5 sm:px-8">
      {/* Back button */}
      <Motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-6xl mx-auto mb-6 sm:mb-8"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-lime-400 hover:text-white underline underline-offset-2 transition-all duration-200 text-sm sm:text-base"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          {/* Back to blog */}
        </Link>
      </Motion.div>

      <article className="max-w-4xl mx-auto">
        {/* Featured Image */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative group mb-6 sm:mb-8 overflow-hidden rounded-2xl"
        >
          <Image
            src={post.image || '/blog-post-image.png'}
            alt={post.alt || 'Featured image'}
            width={1200}
            height={600}
            className="w-full h-[50vh] sm:h-[60vh] object-cover rounded-2xl brightness-75 hover:brightness-100 active:brightness-100 transition-all duration-500"
            priority
            sizes="100vw"
            tabIndex={0}
          />
          <p className="absolute bottom-4 left-4 right-4 w-fit text-gray-600/90 group-hover:text-gray-400/90 group-active:text-gray-400/90 group-active:brightness-100 bg-black/15 backdrop-blur-sm rounded-lg p-2 text-xs">
            {post.caption || 'Featured image for this post'}
          </p>
        </Motion.div>

        {/* Post Header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-xs sm:text-sm text-gray-400">
            {/* <span className="inline-flex items-center gap-1"> */}
            <span className="bg-gray-400/10 text-gray-400 px-2 py-1 rounded-full font-medium gap-1 flex items-center" tabIndex={0}>
              <FontAwesomeIcon icon={faUser} className="text-pink-400" />
              {post.author || 'Anonymous'}
            </span>
            <span className="inline-flex text-xs items-center gap-1" tabIndex={0}>
              <FontAwesomeIcon icon={faCalendar} />
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
              })}
            </span>
            <span className="bg-lime-400/10 text-lime-400 px-2 py-1 rounded-full text-xs font-medium" tabIndex={0}>
              {post.category?.name || 'Uncategorized'}
            </span>
            <span className="bg-pink-400/10 text-pink-400 px-2 py-1 rounded-full text-xs font-medium" tabIndex={0}>
              {post.subcategory?.name || 'General'}
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent leading-tight">
            {post.title || 'Untitled Post'}
          </h1>
          
          {/* Excerpt */}
          <p className="text-gray-300 text-sm sm:text-lg leading-relaxed italic border-l-4 border-lime-400/30 pl-4 mb-6">
            {post.excerpt || 'No excerpt available for this post.'}
          </p>
        </Motion.div>

        {/* Post Content - Render content_JSON */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 sm:mb-12 space-y-6 sm:space-y-8"
        >
          {contentJson && contentJson.blocks && Array.isArray(contentJson.blocks) ? (
            contentJson.blocks.map((block, index) => {
              try {
                switch (block.type) {
                  case 'heading': {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const HeadingTag = `h${block.level ?? 2}` as any;
                    return (
                      <HeadingTag
                        key={index}
                        className="text-lg sm:text-2xl text-white font-semibold border-l-4 border-lime-400 pl-3 leading-tight"
                      >
                        {block.content || 'Untitled Section'}
                      </HeadingTag>
                    );
                  }
                  case 'paragraph':
                    return (
                      <p
                        key={index}
                        className="text-sm sm:text-base text-gray-300/80 leading-relaxed"
                      >
                        {block.content || 'No content available.'}
                      </p>
                    );
                  case 'list':
                    return (
                      <ul
                        key={index}
                        className={`${
                          block.style === 'number' ? 'list-decimal' : 'list-disc'
                        } list-inside ml-4 sm:ml-6 space-y-2 text-sm sm:text-base text-gray-300/80`}
                      >
                        {block.items?.length ? (
                          block.items.map((item, i) => (
                            <li
                              key={i}
                              className="hover:text-lime-400 active:text-lime-400 transition-colors duration-200"
                            >
                              {item}
                            </li>
                          ))
                        ) : (
                          <li>No items available.</li>
                        )}
                      </ul>
                    );
                  case 'link':
                    return (
                      <p key={index} className="text-center">
                        <Link
                          href={block.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-lime-400 hover:text-white underline underline-offset-2 transition-colors text-sm sm:text-base"
                          tabIndex={0}
                        >
                          {block.text || 'Learn more'}
                        </Link>
                      </p>
                    );
                  case 'callout':
                    return (
                      <div
                        key={index}
                        className="p-3 sm:p-4 border border-pink-500/30 bg-zinc-800/60 rounded-xl text-gray-200 italic backdrop-blur-sm shadow-lg text-sm sm:text-base"
                      >
                        💡 {block.content || 'No callout content.'}
                      </div>
                    );
                  case 'code':
                    return <CodeBlock key={index} block={block} />
                  // <pre
                      //   className="bg-zinc-800/80 p-3 sm:p-4 rounded-lg text-sm sm:text-base text-lime-400 overflow-x-auto border border-zinc-700/50"
                      // >
                        {/* <code className={`language-${block.language || 'text'}`}>
                          {block.content || '// No code provided.'}
                        </code> */}
                  // </pre>
                    
                  default:
                    console.warn('BlogPost: Unrecognized block type →', block);
                    return null;
                }
              } catch (err) {
                console.error('BlogPost: Error rendering block →', block, err);
                return (
                  <div
                    key={index}
                    className="text-red-400 bg-zinc-900/60 p-2 rounded-md text-xs sm:text-sm border border-red-600/20 mx-4"
                  >
                    ⚠️ Error rendering block #{index + 1}
                  </div>
                );
              }
            })
          ) : (
            <div className="text-yellow-400 bg-zinc-900/60 p-3 sm:p-4 rounded-xl border border-yellow-500/30 mx-4 text-sm sm:text-base">
              ⚠️ No content blocks available. {post.content_plain_text && (
                <p className="text-gray-300 mt-2">{post.content_plain_text}</p>
              )}
            </div>
          )}
        </Motion.div>

        {/* Additional Images Gallery */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-lime-300 flex items-center gap-2">
            <FontAwesomeIcon icon={faImage} />
            Gallery
          </h2>
          {post.images && post.images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {post.images.map((img, index) => (
                <div key={img.id || index} className="group relative overflow-hidden rounded-2xl bg-black/50">
                  <Image
                    src={img.image || '/blog-post-image.png'}
                    alt={img.alt || 'Gallery image'}
                    width={400}
                    height={300}
                    priority={false}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    tabIndex={0}
                  />
                  {(img.alt || img.caption) && (
                    <div className="absolute bottom-2 left-2 right-2 w-fit bg-black/15 backdrop-blur-sm rounded px-2 py-1">
                      {img.caption && <p className="text-gray-700 group-hover:text-gray-600 text-xs mb-1">{img.caption}</p>}
                      {/* {img.alt && <p className="text-white/70 text-xs">{img.alt}</p>} */}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-sm sm:text-base">No additional images available.</p>
          )}
        </Motion.div>

        {/* Tags */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 sm:mb-12"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-lime-300 gap-2 flex items-center">
            <FontAwesomeIcon icon={faHashtag} />
            Tags
          </h3>
          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-zinc-800/50 hover:bg-lime-400/10 text-lime-400 hover:text-lime-300 lowercase px-3 py-1 rounded-full text-sm border border-zinc-600/30 transition-all"
                  tabIndex={0}
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-sm sm:text-base">No tags assigned.</p>
          )}
        </Motion.div>

        {/* Post Links */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-lime-300 gap-2 flex items-center">
            <FontAwesomeIcon icon={faLink} />
            Related Links
          </h3>
          {post.links && post.links.length > 0 ? (
            <div className="space-y-3">
              {post.links.map((link) => (
                <Link
                  key={link.id}
                  href={link.external_url || `/blog/${link.target_post?.slug || '#'}`}
                  target={link.external_url ? '_blank' : '_self'}
                  rel={link.external_url ? 'noopener noreferrer' : ''}
                  className="group inline-flex items-center gap-2 p-3 bg-zinc-800/50 hover:bg-lime-400/10 border border-zinc-700/50 hover:border-lime-400/30 rounded-xl transition-all text-lime-300 hover:text-white text-sm sm:text-base"
                >
                  <span className="font-medium">{link.label || 'Related Link'}</span>
                  {link.type === 'affiliate' && (
                    <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full">Affiliate</span>
                  )}
                  {link.external_url && (
                    <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-sm sm:text-base">No related links available.</p>
          )}
        </Motion.div>

        {/* Comments */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-lime-300 flex items-center gap-2">
            <FontAwesomeIcon icon={faComment} />
            Comments {post.comments && post.comments.length > 0 ? `(${post.comments.length})` : ''}
          </h3>
          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-3 sm:p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 text-gray-200 text-sm sm:text-base"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-lime-400">{comment.name || 'Anonymous'}</span>
                    <span className="text-gray-400 text-xs">
                      {new Date(comment.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p>{comment.body || 'No comment content.'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-sm sm:text-base">No comments yet. Be the first to comment!</p>
          )}
        </Motion.div>

        {/* Meta Footer */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-gray-500 text-sm border-t border-zinc-700 pt-6 sm:pt-8"
        >
          <p>
            Published {new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })} • 
            {post.updated_at && post.updated_at !== post.created_at && (
              <> Updated {new Date(post.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</>
            )}
          </p>
          <p className="mt-2 text-pink-400 capitalize">{post.status || 'Draft'}</p>
        </Motion.div>
      </article>
      <NewsletterCard />
    </section>
  );
}