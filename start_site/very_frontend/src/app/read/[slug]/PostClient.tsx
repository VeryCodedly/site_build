"use client";

import NewsletterCard from '../components/blog/NewsletterCard';
import RelatedPostsSection from '../components/blog/RelatedPostsSection';
import PostContent, { BlogBlock } from '../components/blog/PostContent';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Post } from '@/types/post';

interface BlogContentJSON {
    title?: string;
    blocks: BlogBlock[];
}

interface PostClientProps {
  post: Post;
  related: Post[];
  trending: Post[];
}

export default function PostClient({ post, related, trending }: PostClientProps) {
    let contentJson: BlogContentJSON | null = null;
    try {
        contentJson =
            typeof post.content_JSON === 'string'
                ? JSON.parse(post.content_JSON)
                : (post.content_JSON as BlogContentJSON | unknown);
    } catch (err) {
        console.error('Failed to parse content_JSON', err);
    }

    return (
        <section className="relative w-full bg-gradient-to-b from-black via-zinc-950 to-black text-white min-h-screen py-10 px-9">
            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto mb-6"
            >
                <Link
                    href="/read"
                    className="inline-flex items-center gap-2 text-lime-400 hover:text-white active:scale-60 transition-all duration-300 text-sm sm:text-base"
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                    <span className="sr-only">Back to posts</span>
                </Link>
            </motion.div>

            <main className="max-w-4xl mx-auto">
                <PostContent post={post} contentJson={contentJson} />
                <RelatedPostsSection posts={related} trending={trending} name={post.subcategory?.name} />
            </main>

            <NewsletterCard />
        </section>
    );
}