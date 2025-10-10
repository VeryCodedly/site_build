// 'use client';

// import { useState } from 'react';
// import { useGetPostsQuery } from '@/features/api/apiSlice';
// import PostCard from '../blog/components/blog/PostCard';
// import { Post } from '@/types/post';

// export default function BlogHome() {
//   const [page, setPage] = useState(1);

//   // fetch posts dynamically by page
//   const { data: posts, error, isLoading, isFetching } = useGetPostsQuery({ page });

//   if (isLoading) return <p>Loading posts...</p>;
//   if (error) return <p className="text-red-500">Failed to load posts</p>;

//   const handleNext = () => {
//     if (posts?.next) setPage((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     if (posts?.previous) setPage((prev) => Math.max(prev - 1, 1));
//   };

//   return (
//     <section className="min-h-screen p-6 space-y-8">
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {posts?.results?.map((post: Post) => (
//           <PostCard key={post.id} post={post} />
//         ))}
//       </div>

//       <div className="flex justify-center items-center gap-4 mt-8">
//         <button
//           onClick={handlePrev}
//           disabled={!posts?.previous || isFetching}
//           className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-md disabled:opacity-50 hover:bg-gray-200 transition"
//         >
//           ← Previous
//         </button>

//         <span className="text-gray-700 text-sm">
//           Page {page} of {Math.ceil(posts?.count ?? 0 / 10) || 1}
//         </span>

//         <button
//           onClick={handleNext}
//           disabled={!posts?.next || isFetching}
//           className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-md disabled:opacity-50 hover:bg-gray-200 transition"
//         >
//           Next →
//         </button>
//       </div>

//       <section className="mt-10 text-center space-y-4 border-t border-gray-800 pt-8">
//   <h3 className="text-2xl font-semibold text-white">Let’s keep this convo going 💬</h3>
//   <p className="text-gray-400 text-sm sm:text-base">
//     Got thoughts, questions, or “wait what?” moments?  
//     Join the{" "}
//     <a
//       href="https://discord.gg/yourlink"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="text-lime-400 hover:underline hover:text-lime-300 transition-colors duration-200"
//     >
//       Verycodedly Discord
//     </a>{"."}
//     {/* — we talk. */}
//   </p>
// </section>

//     </section>
//   );
// }
'use client';

import { motion as Motion } from "framer-motion";
import { useGetPostsQuery } from "@/features/api/apiSlice";
import PostCard from "../blog/components/blog/PostCard";
import { Post } from "@/types/post";
import { useState } from "react";
import Link from "next/link";

export default function BlogHome() {
    const [page, setPage] = useState(1);

  const { data: posts, error, isLoading } = useGetPostsQuery({page});

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
          className="relative text-gray-300 mt-6 z-20 max-w-lg mx-auto text-md sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Interesting takes on Tech, Code, and Culture. Everything in between, too.
        </Motion.p>
        </div>

        {/* scroll cue */}
        <Link href="#posts">
        <Motion.div
          className="absolute bottom-12 flex flex-col items-center gap-2 z-30 text-gray-400"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
            <span className="text-sm tracking-widest uppercase">Scroll</span>
            <span className="text-xl">↓</span>
        </Motion.div>
        </Link>
      </div>

      {/* 📰 POSTS SECTION */}
      <div className="relative max-w-6xl mx-auto py-24 px-6 sm:px-8">
        <Motion.h2
          className="text-4xl font-bold mb-12 text-center text-white/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest from <span className="text-lime-400">VeryCodedly</span>
        </Motion.h2>

        {isLoading && <p className="text-center text-gray-400">Loading posts...</p>}
        {error && <p className="text-center text-red-500">Failed to load posts</p>}

        {posts && (
          <div className="space-y-3 w-[80%] mx-auto">
            {posts.results.map((post: Post) => (
              <Motion.div
                key={post.id}
                // className="bg-white/5 border border-zinc-700 rounded-xl backdrop-blur-md p-6 hover:border-lime-200/30 transition-all duration-300"
                className="bg-zinc-800/80 rounded-xl p-4 border border-zinc-700 transition-transform duration-500 transform hover:-translate-y-2 hover:rotateX-3 hover:rotateY-3 hover:shadow-[0_25px_40px_rgba(0,0,0,0.6)]" style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                id="#posts"
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
      </div>
    </section>
  );
}
