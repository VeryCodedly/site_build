'use client';

import { motion as Motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight, faCalendar, faUser, faComment, faHashtag, faImage, faLink, faCopy } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLinkedinIn, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import CodeBlock from '@/app/learn/components/CodeBlock';
import { Post } from '@/types/post';
// import { useEffect } from 'react';
// import Head from 'next/head';

export interface BlogBlock {
  type: 'heading' | 'paragraph' | 'list' | 'link' | 'callout' | 'code' | 'reviewImg';
  level?: number;
  content?: string;
  style?: 'bullet' | 'number';
  items?: string[];
  text?: string;
  url?: string;
  language?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
}

interface BlogContentJSON {
  title?: string;
  blocks: BlogBlock[];
}

interface PostContentProps {
  post: Post;
  contentJson: BlogContentJSON | null;
}

export default function PostContent({ post, contentJson }: PostContentProps) {

  return (
    <>
      {/* Featured Image */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full group mb-6 sm:mb-8 overflow-hidden rounded-2xl select-none"
      >
        <Image
          src={post.image || '/blog-post-image.png'}
          alt={post.alt || 'Featured image'}
          width={1200}
          height={600}
          rel="preload"
          fetchPriority="high"
          className="w-full h-[250px] sm:h-[72vh] object-cover rounded-2xl brightness-65 hover:brightness-90 active:brightness-90 transition-all duration-500"
          priority
          sizes="100vw"
          tabIndex={0}
        />
        <p className="absolute bottom-0 sm:bottom-3 left-0 sm:left-3 right-4 w-fit text-gray-50/50 group-hover:opacity-0 group-active:opacity-0 bg-black/15 backdrop-blur-md rounded-lg p-2 text-sm">
          {post.caption || 'Featured Image'}
        </p>
      </Motion.div>

      {/* Post Header */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6 sm:mb-8"
      >
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-sm text-gray-400">
          <span className="bg-gray-400/10 text-gray-400 px-2 py-1 rounded-full font-medium gap-1 flex items-center" tabIndex={0}>
            <FontAwesomeIcon icon={faUser} className="text-pink-400" />
            {post.author || 'Anonymous'}
          </span>
          <span className="inline-flex text-sm items-center gap-1" tabIndex={0}>
            <FontAwesomeIcon icon={faCalendar} />
            {new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
            })}
          </span>
          <span className="bg-lime-400/10 text-lime-400 px-2 py-1 rounded-full text-sm font-medium" tabIndex={0}>
            {post.category?.name || 'Uncategorized'}
          </span>
          <span className="bg-pink-400/10 text-pink-400 px-2 py-1 rounded-full text-sm font-medium" tabIndex={0}>
            {post.subcategory?.name || 'General'}
          </span>
          <span className="px-2">
            <span className="flex gap-4">
              <Link href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://verycodedly.com/read/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-lime-400 transition active:text-lime-400 active:scale-50" title="Share on Twitter">
                <FontAwesomeIcon icon={faTwitter} size="1x" />
              </Link>
              <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=https://verycodedly.com/read/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-lime-400 transition active:text-lime-400 active:scale-50" title="Share on LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} size="1x" />
              </Link>
              <Link href={`https://www.facebook.com/sharer/sharer.php?u=https://verycodedly.com/read/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-lime-400 transition active:text-lime-400 active:scale-50" title="Share on Facebook">
                <FontAwesomeIcon icon={faFacebook} size="1x" />
              </Link>
              <Link href={`https://wa.me/?text=${encodeURIComponent(post.title + " — https://verycodedly.com/read/" + post.slug)}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-lime-400 transition active:text-lime-400 active:scale-50" title="Share on WhatsApp">
                <FontAwesomeIcon icon={faWhatsapp} size="1x" />
              </Link>
              <button onClick={() => navigator.clipboard.writeText(`https://verycodedly.com/read/${post.slug}`)} className="text-gray-400 hover:text-lime-400 transition duration-400 active:text-lime-400 active:scale-60 ease-in-out" title="Copy link">
                <FontAwesomeIcon icon={faCopy} size="1x" />
              </button>
            </span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent leading-tight">
          {post.title || 'Untitled Post'}
        </h1>

        <p className="text-gray-300/80 text-sm sm:text-base tracking-wide italic border-l-4 border-lime-400/50 rounded-sm pl-4 mb-6">
          {post.excerpt || 'No excerpt available for this post.'}
        </p>
      </Motion.div>

      {/* Post Content */}
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
                    <HeadingTag key={index} className="text-lg sm:text-2xl text-white font-semibold border-l-4 border-lime-400 rounded-sm pl-3 leading-tight">
                      {block.content || 'Untitled Section'}
                    </HeadingTag>
                  );
                }
                case 'paragraph':
                  return <p key={index} className="text-sm sm:text-base text-gray-300 leading-relaxed">{block.content || 'No content available.'}</p>;
                case 'list':
                  return (
                    <ul key={index} className={`${block.style === 'number' ? 'list-decimal' : 'list-disc'} list-outside ml-4 sm:ml-6 space-y-3 text-sm sm:text-base text-gray-300`}>
                      {block.items?.length ? block.items.map((item, i) => <li key={i} className="hover:text-lime-400 active:text-lime-400 transition-colors">{item}</li>) : <li>No items.</li>}
                    </ul>
                  );
                case 'link':
                  return (
                    <p key={index} className="text-center">
                      <Link href={block.url || '#'} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-lime-400 hover:text-white underline underline-offset-2 transition-colors text-sm sm:text-base">
                        {block.text || 'Learn more'}
                      </Link>
                    </p>
                  );
                case 'callout':
                  return (
                    <div key={index} className="p-3 sm:p-4 border border-pink-500/30 bg-zinc-800/60 rounded-xl text-gray-200 italic backdrop-blur-sm shadow-lg text-sm sm:text-base">
                      {block.content || 'No callout content.'}
                    </div>
                  );
                case 'code':
                  return <CodeBlock key={index} block={block} />;
                default:
                  console.warn('PostContent: Unrecognized block →', block);
                  return null;

                case 'reviewImg':
                  if (!block.imageUrl) return null;
                  return (
                    <Motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="my-12 mx-auto relative w-full max-w-full group overflow-hidden rounded-2xl select-none"
                    >
                      <Image
                        src={block.imageUrl}
                        alt={block.imageAlt || 'First Look'}
                        width={800}
                        height={500}
                        className="w-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-500"
                        sizes="100vw"
                        priority={index < 3}   // prioritize first few images
                      />

                      <p className="absolute bottom-0 sm:bottom-3 left-0 sm:left-3 right-4 w-fit text-gray-50/50 group-hover:opacity-0 group-active:opacity-0 bg-black/15 backdrop-blur-md rounded-lg p-2 text-sm">
                        {block.imageCaption || 'First Look'}
                      </p>
                    </Motion.div>
                  );
              }
            } catch (err) {
              console.error('PostContent: Error rendering block →', block, err);
              return (
                <div key={index} className="text-red-400 bg-zinc-900/60 p-2 rounded-md text-xs sm:text-sm border border-red-600/20 mx-4">
                  Error rendering block #{index + 1}
                </div>
              );
            }
          })
        ) : (
          <div className="text-yellow-400 bg-zinc-900/60 p-3 sm:p-4 rounded-xl border border-yellow-500/30 mx-4 text-sm sm:text-base">
            No content blocks available.
            {post.content_plain_text && <p className="text-gray-300 mt-2">{post.content_plain_text}</p>}
          </div>
        )}
      </Motion.div>

      {/* Gallery */}
      <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-8 sm:mb-12">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-lime-300 flex items-center gap-2">
          <FontAwesomeIcon icon={faImage} /> Gallery
        </h2>
        {post.images && post.images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {post.images.map((img, index) => (
              <div key={img.id || index} className="group relative overflow-hidden rounded-2xl bg-black/50 select-none">
                <Image src={img.image || 'read-post-image.png'} alt={img.alt || 'Gallery image'} width={400} height={300} className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 group-active:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" tabIndex={0} />
                {(img.alt || img.caption) && (
                  <div className="absolute bottom-0 sm:bottom-2 left-0 sm:left-2 right-2 w-fit bg-black/15 group-hover:bg-transparent group-active:bg-transparent backdrop-blur-md group-hover:!backdrop-blur-none group-active:!backdrop-blur-none rounded-lg px-2 py-1">
                    {img.caption && <p className="text-gray-50/80 group-hover:opacity-0 group-active:opacity-0 text-xs mb-1">{img.caption}</p>}
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
      <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mb-8 sm:mb-12">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-lime-300 gap-2 flex items-center">
          <FontAwesomeIcon icon={faHashtag} /> Tags
        </h3>
        {post.tags && Array.isArray(post.tags) && post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-zinc-900/50 hover:bg-lime-400/10 text-lime-400 hover:text-lime-300 lowercase px-3 py-1 rounded-full text-sm border border-zinc-800/30 transition-all" tabIndex={0}>
                #{tag}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic text-sm sm:text-base">No tags assigned.</p>
        )}
      </Motion.div>

      {/* Related Links */}
      <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mb-8 sm:mb-12">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-lime-300 gap-2 flex items-center">
          <FontAwesomeIcon icon={faLink} /> Related Links
        </h3>
        {post.links && post.links.length > 0 ? (
          <div className="space-y-3">
            {post.links.map((link) => (
              <Link key={link.id} aria-label={`Link for ${link.target_post}`} href={link.external_url || `/read/${link.target_post?.slug || '#'}`} 
                target={link.external_url ? '_blank' : '_self'} rel={link.external_url ? 'noopener noreferrer' : ''} 
                className="group flex items-center w-fit gap-2 px-3 py-2 bg-zinc-900/50 hover:bg-lime-500/10 active:bg-lime-500/10 border border-zinc-800/30
                hover:border-lime-500/20 active:border-lime-500/20 rounded-xl transition-all text-lime-300 hover:text-white active:text-white text-sm sm:text-sm">
                <span className="font-normal">{link.label || 'Related Link'}</span>
                {link.type === 'affiliate' && <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full">Affiliate</span>}
                {link.external_url && <FontAwesomeIcon icon={faLongArrowRight} className="group-hover:translate-x-1 transition-transform" />}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic text-sm sm:text-base">No related links available.</p>
        )}
      </Motion.div>

      {/* Comments */}
      <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="mb-8 sm:mb-12">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-lime-300 flex items-center gap-2">
          <FontAwesomeIcon icon={faComment} /> Comments {post.comments && post.comments.length > 0 ? `(${post.comments.length})` : ''}
        </h3>
        {post.comments && post.comments.length > 0 ? (
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="p-3 sm:p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 text-gray-200 text-sm sm:text-base">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-lime-400">{comment.name || 'Anonymous'}</span>
                  <span className="text-gray-400 text-xs">
                    {new Date(comment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
      <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
        className="text-center text-gray-500 text-sm border-t border-b border-zinc-700 rounded-xl py-6 sm:py-8">
        <p className="flex flex-col justify-center sm:flex-row sm:gap-2">
          <span>
            Published{' '}
            {new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>

          {post.updated_at && post.updated_at !== post.created_at && (
            <>
              {/* This bullet only shows on sm+ */}
              <span className="hidden sm:inline"> • </span>

              {/* Updated date — drops to new line on mobile, stays inline on sm+ */}
              <span>
                Updated{' '}
                {new Date(post.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </>
          )}
        </p>
        <p className="mt-4 text-pink-400 capitalize">{post.status || 'Draft'}</p>
      </Motion.div>
    </>
  );
}