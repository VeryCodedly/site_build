"use client";

import { useGetCategoryPostsQuery } from "@/features/api/apiSlice";
import MiniPostCard from "../../components/blog/MiniPostCard";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion as Motion } from "framer-motion";
import Link from "next/link";
import { Post } from "@/types/post";
// import { useEffect } from "react";


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], },
  },
};


export default function CategoryPage() {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []); 

  const { slug } = useParams() as { slug: string };
  const { data, isLoading, isError } = useGetCategoryPostsQuery(slug);

  if (isError) {
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

  if (isLoading) {
    return (
      <section className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-zinc-900 text-gray-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
        </div>
      </section>
    );
  }

  const { name, posts = [] } = data!;

  return (
    <>
      <Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link href="/read" className="inline-flex items-center pt-8 pl-6 gap-2 text-lime-400 hover:text-white underline underline-offset-2 transition-all duration-200 text-sm sm:text-base">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <span className="sr-only">Go Home</span>
        </Link>
      </Motion.div>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-black text-white pt-4 pb-20 px-10"
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
            className="text-md text-center mx-auto text-gray-400 mt-4 mb-12 w-fit border-l-4 border-lime-400 rounded-sm pl-4 sm:pl-4"
          >
            {posts?.length} {posts?.length === 1 ? "post" : "posts"} in this category
          </Motion.p>

          <Motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="py-10 px-6 w-[97%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 border-y border-zinc-700 rounded-xl"
          >
            {posts?.map((post: Post) => (
              <Motion.div key={post.id} variants={cardVariants} className="">
                <MiniPostCard post={post} />
              </Motion.div>
            ))}
          </Motion.div>


        </div>
      </Motion.div>

    </>
  );
}