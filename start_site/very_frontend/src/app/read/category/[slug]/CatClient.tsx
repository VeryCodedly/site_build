"use client";

import MiniPostCard from "../../components/blog/MiniPostCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion as Motion } from "framer-motion";
import Link from "next/link";
import { Category, Post } from "@/types/post";
import RelatedPostsSection from "../../components/blog/RelatedPostsSection";


const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.10, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], },
    },
};


export default function CatClient({ category,
    trending,
}: {
    category: Category;
    trending: Post[];
}) {
    const { name, posts = [] } = category;

    return (
        <>
            <Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <Link href="/read" className="inline-flex items-center pt-8 ml-8 gap-2 text-lime-400 hover:text-white active:text-white active:scale-60 transition-all duration-300 text-sm sm:text-base">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                    <span className="sr-only">Go Home</span>
                </Link>
            </Motion.div>
            <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="min-h-screen max-w-[90%] bg-black text-white pt- pb-14 px-2 mx-auto"
            >
                <div className="max-w-5xl mx-auto">

                    {/* Title */}
                    <Motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-semibold text-center uppercase"
                    >
                        {name}
                    </Motion.h1>

                    {/* Count */}
                    <Motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="text-md text-center mx-auto text-gray-400 mt-6 mb-12 w-fit border-l-4 border-lime-400 rounded-sm pl-4 sm:pl-4"
                    >
                        {posts?.length} {posts?.length === 1 ? "post" : "posts"} in this category
                    </Motion.p>

                    <Motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="py-10 px-4 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 border-y border-zinc-700 rounded-xl"
                    >
                        {posts?.map((post: Post) => (
                            <Motion.div key={post.id} variants={cardVariants} className="">
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