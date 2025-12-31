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
            <>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="max-w-6xl mx-auto mb-6">
                    <Link href="/read" className="inline-flex items-center gap-2 mt-8 pl-7 text-lime-400 hover:text-white underline underline-offset-2 text-sm">
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
            </>
        );
    }

    return (
        <>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <Link href="/read" className="inline-flex items-center gap-2 text-lime-400 pt-8 ml-8 hover:text-white text-sm sm:text-base active:text-white active:scale-60 transition-all duration-300">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </Link>
            </motion.div>

            <section className="min-h-screen max-w-[90%] mx-auto bg-black text-white pt- pb-14">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-semibold text-center uppercase pt-4">
                        {name}
                    </h1>
                    {about && (
                        <div className="my-10 flex justify-center px-4 sm:px-">
                            <p className="whitespace-pre-wra italic text-sm m:text-base max-w-2xl tracking-tighter leading- text-zinc-300/80 pl-4 border-l-4 border-lime-500 rounded-sm last:text-center">
                                {about}
                            </p>
                        </div>
                    )}

                    <div className="space-y-2.5 px-2 sm:px-0">
                        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 py-10 px-4 border-y border-zinc-800 rounded-xl">
                            {posts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.05 }}
                                //     className="bg-zinc-900/80 rounded-2xl p-2 border border-zinc-800 transition-transform duration-500 transform hover:-translate-y-2 
                                //                 hover:rotateX-3 hover:rotateY-3 active:-translate-y-2 active:rotateX-3 active:rotateY-3" style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                                >
                                    <MiniPostCard post={post} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <RelatedPostsSection
                        subcategoryName={subcategory.name}
                        posts={posts}
                        trending={trending}
                    />
                </div>
            </section>
        </>
    );
}