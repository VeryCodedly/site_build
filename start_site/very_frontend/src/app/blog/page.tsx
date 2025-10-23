'use client';

import { motion as Motion } from "framer-motion";
import { useGetPostsQuery } from "@/features/api/apiSlice";
import PostCard from "../blog/components/blog/PostCard";
import FloatingMenu from "./components/blog/FloatingMenu";
import NewsletterCard from "./components/blog/NewsletterCard";
import { Post } from "@/types/post";
// import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogHome() {
  const page = useParams();
  const { data: posts, error, isLoading } = useGetPostsQuery(page);

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* 🪶 HERO SECTION */}
      <div className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        {/* layered typography */}
        <Motion.h1
          className="absolute text-[12rem] sm:text-[16rem] font-extrabold uppercase text-lime-400/5 blur-3xl select-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 4 }}
          transition={{ duration: 0.8 }}
        >
          VeryCodedly
        </Motion.h1>

        <Motion.h1
          className="absolute text-[14rem] sm:text-[18rem] font-extrabold uppercase text-white/3 z-10"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
        >
          VeryCodedly
        </Motion.h1>

        <div className="z-20 backdrop-blur-xs w-full py-2 sm:py-5">
        <Motion.h1
          className="hero relative text-6xl sm:text-7xl font-bold z-20 backdrop-blur-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Tech. <span className="text-lime-400">Code. </span> <span className="text-pink-400">Culture.</span>
        </Motion.h1>

        <Motion.p
          className="relative text-gray-400 mt-6 z-20 max-w-md mx-auto text-md sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Unfiltered takes on Tech, Code, Culture and everything in between.
        </Motion.p>
        </div>

        {/* scroll cue */}
        <Link href="#posts">
        <Motion.div
          className="absolute bottom-1.5 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 text-gray-400"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-sm tracking-widest uppercase">read</span>
          <span className="text-xl">↓</span>
        </Motion.div>
        </Link>
      </div>

      {/* 📰 POSTS SECTION */}
      <div id="posts" className="relative max-w-6xl mx-auto py-24 px-6 sm:px-8">
        <Motion.h2
          className="text-3xl sm:text-4xl font-bold mb-12 text-center text-white/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest from <span className="text-lime-400">VeryCodedly</span>
        </Motion.h2>

        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400" />
            <p className="mt-4 text-gray-400">Loading new content...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-20">
            <p className="text-rose-400 text-lg mb-4">Failed to load posts</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 rounded-full text-rose-300 transition-all"
            >
              Try Again
            </button>
          </div>
        )}
          
        {posts && (
          <div className="space-y-3 w-[70%] sm:w-[70%] mx-auto">
            {posts.results.map((post: Post) => (
              <Motion.div
                key={post.id}
                // className="bg-white/5 border border-zinc-700 rounded-xl backdrop-blur-md p-6 hover:border-lime-200/30 transition-all duration-300"
                className="bg-zinc-800/80 rounded-xl p-4 border border-zinc-800 transition-transform duration-500 transform hover:-translate-y-2 
                hover:rotateX-3 hover:rotateY-3 active:-translate-y-2 active:rotateX-3 active:rotateY-3" style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <PostCard post={post} />
              </Motion.div>
            ))}
          </div>
        )}
        <FloatingMenu />
        <NewsletterCard />
      </div>
    </section>
  );
}
