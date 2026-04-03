"use client";

import MiniPostCard from "../../components/blog/MiniPostCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion as Motion } from "framer-motion";
import Link from "next/link";
import { Category, Post } from "@/types/post";
import RelatedPostsSection from "../../components/blog/RelatedPostsSection";


export default function CatClient({ category,
    trending,
}: {
    category: Category;
    trending: Post[];
}) {
    const { name, posts = [] } = category;

    return (
        <>
            <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="min-h-screen max-w-[90%] sm:max-w-[94%] bg-black text-white pb-20 px-2 mx-auto"
            >
                <Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <Link href="/read" className="inline-flex items-center pt-8 text-lime-400 hover:text-white active:text-white active:scale-60 transition-all duration-300 text-sm sm:text-base">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                    <span className="sr-only">Go Home</span>
                </Link>
            </Motion.div>
                <div className="max-w-5xl mx-auto">
                    {/* Title */}
                    <h1
                        className="pt-8 text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent uppercase"
                    >
                        {name}
                    </h1>
                    {/* Count */}
                    <p
                        className="text-md text-left text-gray-400 mt-6 mb-12 w-fit border-l-4 border-lime-400 rounded-sm pl-4 sm:pl-4"
                    >
                        {posts?.length} {posts?.length === 1 ? "post" : "posts"} in this category
                    </p>

                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.02 }}
                        className="py-10 px-4 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 border-y border-zinc-700 rounded-xl"
                    >
                        {posts?.map((post: Post) => (
                            <Motion.div key={post.slug} >
                                <MiniPostCard post={post} />
                            </Motion.div>
                        ))}
                    </Motion.div>
                </div>
                <RelatedPostsSection
                    subcategoryName={category.name}
                    posts={posts}
                    trending={trending}
                />
            </Motion.div>
        </>
    );
}