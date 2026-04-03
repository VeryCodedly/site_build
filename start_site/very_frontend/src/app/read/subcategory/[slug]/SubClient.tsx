"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import RelatedPostsSection from '../../components/blog/RelatedPostsSection';
import MiniPostCard from '../../components/blog/MiniPostCard';
import { Post, Subcategory } from '@/types/post';

export default function SubClient({
    subcategory,
    posts,
    trending,
}: {
    subcategory: Subcategory;
    posts: Post[];
    trending: Post[];
}) {
    const { name, about } = subcategory;

    if (posts.length === 0) {
        return (
            <main>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="max-w-6xl mx-auto mb-6">
                    <Link href="/read" className="inline-flex items-center gap-2 mt-8 pl-7 text-lime-400 hover:text-white underline underline-offset-2 text-sm" aria-label="Back to Read button">
                        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                    </Link>
                </motion.div>

                <div className="empty-state py-18 px-6 text-center">
                    <div className="max-w-md mx-auto">
                        <FontAwesomeIcon className="text-white/50" icon={faFileAlt} size="8x" />
                        <h3 className="text-xl font-semibold text-white my-6">No posts yet</h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            This space is quiet for now, but awesome posts are on the way.
                            <span className="block mt-2 text-lime-400/80 font-medium">Check back soon.</span>
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <section>
            <section className="min-h-screen max-w-[90%] sm:max-w-[94%] mx-auto bg-black text-white px-2 pb-20">
                <div className="max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                        <Link href="/read" className="inline-flex items-center  text-lime-400 pt-8 hover:text-white text-sm sm:text-base active:text-white active:scale-60 transition-all duration-300"
                            aria-label="Back to Read button">
                            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                        </Link>
                    </motion.div>
                    <div className="max-w-5xl mx-auto">
                        <h1 className="pt-8 text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent uppercase">
                            {name}
                        </h1>
                        {about && (
                            <div className="mt-6 py-2 mb-10">
                                <p className="whitespace-pre-wra italic text-sm m:text-base max-w-2xl tracking-tight text-zinc-300/80 pl-4.5 sm:pl-4 border-l-4 border-lime-500 rounded-sm">
                                    {about}
                                </p>
                            </div>
                        )}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.02 }}
                        className="py-12 px-4 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 border-y border-zinc-700 rounded-xl"
                    >
                        {posts?.map((post: Post) => (
                            <motion.div key={post.slug} >
                                <MiniPostCard post={post} />
                            </motion.div>
                        ))}
                    </motion.div>
                    <div className="pt-4">
                        <RelatedPostsSection
                            subcategoryName={subcategory.name}
                            posts={posts}
                            trending={trending}
                        />
                    </div>
                </div>
            </section>
        </section>
    );
}