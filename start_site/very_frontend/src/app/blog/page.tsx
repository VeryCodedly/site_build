// 'use client';

// import { Motion as Motion } from "framer-Motion";
// import { useGetPostsQuery } from "@/features/api/apiSlice";
// import PostCard from "../blog/components/blog/PostCard";
// import FloatingMenu from "./components/blog/FloatingMenu";
// import NewsletterCard from "./components/blog/NewsletterCard";
// import { Post } from "@/types/post";
// // import { useState } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// export default function BlogHome() {
//   const page = useParams();
//   const { data: posts, error, isLoading } = useGetPostsQuery(page);

//   return (
//     <section className="relative w-full min-h-scree bg-black text-white overflow-hidden">
//       {/* 🪶 HERO SECTION */}
//       <div className="relative h-[100dvh] sm:h-screen -mt-10 sm:mt-0 flex flex-col justify-center items-center text-center overflow-hidden">
//         {/* layered typography */}
//         <Motion.h1
//           className="absolute text-[12rem] sm:text-[16rem] font-extrabold uppercase text-lime-400/5 blur-2xl select-none z-0"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 4 }}
//           transition={{ duration: 0.8 }}
//         >
//           VeryCodedly
//         </Motion.h1>

//         <Motion.h1
//           className="absolute text-[14rem] sm:text-[18rem] font-extrabold uppercase text-white/5 z-10"
//           style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
//         >
//           VeryCodedly
//         </Motion.h1>

//         <div className="z-20 backdrop-blur-xs w-full py-2 sm:py-5">
//         <Motion.h1
//           className="hero px-14 sm:px-0 relative text-6xl sm:text-7xl font-bold z-20 backdrop-blur-2xl"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//         >
//           Tech. <span className="text-lime-400">Code. </span> <span className="text-pink-400">Culture.</span>
//         </Motion.h1>

//         <Motion.p
//           className="relative text-gray-400 mt-6 z-20 max-w-sm sm:max-w-md mx-auto text-md sm:text-lg"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//         >
//           Unfiltered takes on Tech, Code, Culture and everything in between.
//         </Motion.p>
//         </div>

//         {/* scroll cue */}
//         <Link href="#posts">
//         <Motion.div
//           className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-30 text-gray-400"
//           animate={{ y: [0, 10, 0] }}
//           transition={{ repeat: Infinity, duration: 2 }}
//           tabIndex={0}
//         >
//           <span className="text-md sm:text-sm tracking-widest uppercase">read</span>
//           <span className="text-xl">↓</span>
//         </Motion.div>
//         </Link>
//       </div>

//       {/* 📰 POSTS SECTION */}
//       <div id="posts" className="relative max-w-6xl mx-auto py-20 px-6 sm:px-8">
//         <Motion.h2
//           className="text-3xl sm:text-4xl font-bold mb-18 sm:mb-12 text-center text-white/90"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           Latest from <span className="text-lime-400">VeryCodedly</span>
//         </Motion.h2>

//         {isLoading && (
//           <div className="text-center py-20">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400" />
//             <p className="mt-4 text-gray-400">Loading new content...</p>
//           </div>
//         )}

//         {error && (
//           <div className="text-center py-20">
//             <p className="text-rose-400 text-lg mb-4">Failed to load posts</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-6 py-3 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 rounded-full text-rose-300 transition-all"
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         {posts && (
//           <div className="space-y-3 w-[70%] sm:w-[70%] mx-auto">
//             {posts.results.map((post: Post) => (
//               <Motion.div
//                 key={post.id}
//                 // className="bg-white/5 border border-zinc-700 rounded-xl backdrop-blur-md p-6 hover:border-lime-200/30 transition-all duration-300"
//                 className="bg-zinc-800/80 rounded-xl p-4 border border-zinc-800 transition-transform duration-500 transform hover:-translate-y-2 
//                 hover:rotateX-3 hover:rotateY-3 active:-translate-y-2 active:rotateX-3 active:rotateY-3" style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <PostCard post={post} />
//               </Motion.div>
//             ))}
//           </div>
//         )}
//         <FloatingMenu />
//         <NewsletterCard />
//       </div>
//     </section>
//   );
// }
'use client';

import { motion as Motion } from "framer-motion";
import { useGetPostsQuery, useGetFeaturedPostQuery, useGetTrendingPostsQuery, useGetSpotlightPostsQuery } from "@/features/api/apiSlice";
import PostCard from "../blog/components/blog/PostCard";
import FloatingMenu from "./components/blog/FloatingMenu";
// import NewsletterCard from "./components/blog/NewsletterCard";
import { Post } from "@/types/post";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function BlogHome() {
  const page = useParams();
  const { data: posts, error, isLoading } = useGetPostsQuery(page);
  const { data: featured } = useGetFeaturedPostQuery();
  const { data: trending = [] } = useGetTrendingPostsQuery();
  const { data: spotlight = [] } = useGetSpotlightPostsQuery();
  const [visiblePosts, setVisiblePosts] = useState(3);

  const loadMore = () => {
    setVisiblePosts((prev) => Math.min(prev + 3, 10));
  };

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* 🪶 HERO SECTION */}
      <div className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        {/* layered typography */}
        <Motion.h1
          className="absolute text-[12rem] sm:text-[16rem] font-extrabold uppercase text-lime-400/5 blur-2xl select-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 4 }}
          transition={{ duration: 0.8 }}
        >
          VeryCodedly
        </Motion.h1>

        <Motion.h1
          className="absolute text-[14rem] sm:text-[18rem] font-extrabold uppercase text-white/5 z-10"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
        >
          VeryCodedly
        </Motion.h1>

        <div className="z-20 backdrop-blur-xs w-full py-2 sm:py-5">
          <Motion.h1
            className="hero px-14 sm:px-0 relative text-6xl sm:text-7xl font-bold z-20 backdrop-blur-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Tech. <span className="text-lime-400">Code. </span> <span className="text-pink-400">Culture.</span>
          </Motion.h1>

          <Motion.p
            className="relative text-gray-400 mt-6 z-20 max-w-sm sm:max-w-md mx-auto text-md sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Unfiltered takes on Tech, Code, Culture and everything in between.
          </Motion.p>
        </div>

        {/* Floating Menu */}
        <FloatingMenu />

        {/* scroll cue */}
        <Link href="#posts">
          <Motion.div
            className="absolute bottom-1.5 sm:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 text-gray-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            tabIndex={0}
          >
            <span className="text-md sm:text-sm tracking-widest uppercase">read</span>
            <span className="text-2xl sm:text-xl">↓</span>
          </Motion.div>
        </Link>
      </div>

      {/* 📰 POSTS SECTION */}
      <div id="posts" className="relative max-w-6xl mx-auto py-20 px-6 sm:px-8">
        <Motion.h2
          className="text-3xl sm:text-4xl font-bold mb-18 sm:mb-12 text-center text-white/90"
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
              className="px-6 py-1 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 rounded-full text-rose-300 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {posts && (
          <div className="space-y-3 w-[70%] sm:w-[70%] mx-auto">
            {posts.results.slice(0, visiblePosts).map((post: Post) => (
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
        {posts && visiblePosts < 9 && (
          <div className="flex justify-center my-10">
            <button
              onClick={loadMore}
              className="font-semibold cursor-pointer border-3 border-gray-500/100 bg-transparent text-white text-sm px-7 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
                      active:text-black shadow-[0_4px_0_0_#ff69b4] hover:shadow-[0_2px_0_0_#fb64b6] active:shadow-[0_2px_0_0_#ff69b4] active:translate-y-1.5 hover:translate-y-0.5  transition-all duration-200"
            >
              <span className="hidden md:inline">Load </span>More
            </button>
          </div>
        )}

        {/* HERO: Featured Post */}
        {featured && (
          <section className="py-16 px-8 mt-16">
            <Link href={`/blog/${featured.slug}`}>
              <Motion.div
                className="relative group cursor-pointer overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image with parallax hover */}
                <Motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {featured.image && (
                    <Image
                      src={featured.image}
                      alt={featured.alt || featured.title}
                      className="w-full h-96 object-cover rounded-xl shadow-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                      width={800}
                      height={400}
                    />
                  )}
                </Motion.div>

                {/* Gradient overlay with fade-in */}
                <Motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />

                {/* Text content with slide-up */}
                <Motion.div
                  className="absolute bottom-6 left-6 right-6"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                >
                  <Motion.h1
                    className="text-2xl md:text-3xl font-bold text-white mb-2"
                  >
                    {featured.title}
                  </Motion.h1>
                  <Motion.p
                    className="text-gray-300 text-sm"
                  >
                    {featured.excerpt}
                  </Motion.p>
                </Motion.div>
              </Motion.div>
            </Link>
          </section>
        )}
        {/* TRENDING NOW */}
        {trending.length > 0 && (
          <section className="py-16 px-7">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl text-white mb-10">Trending <span className="text-lime-400">Now</span>
            </Motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
              {trending.map((post, index) => (
                <Motion.div
                  key={index}
                  // className="bg-white/5 border border-zinc-700 rounded-xl backdrop-blur-md p-6 hover:border-lime-200/30 transition-all duration-300"
                  className="bg-zinc-800/80 rounded-xl p-4 border border-zinc-800 transition-transform duration-500 transform hover:-translate-y-2 
                            hover:rotateX-3 hover:rotateY-3 active:-translate-y-2 active:rotateX-3 active:rotateY-3" style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <PostCard key={post.id} post={post} />
                </Motion.div>
              ))}
            </div>
          </section>
        )}

        {/* SPOTLIGHT */}
        {spotlight.length > 0 && (
          <section className="py-16">
            <h2 className="text-2xl font-bold text-pink-400 mb-6">Editor’s Picks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {spotlight.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* <NewsletterCard /> */}
      </div>
    </section>
  );
}