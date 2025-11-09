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
import {
  useGetPostsQuery, useGetFeaturedPostQuery, useGetTrendingPostsQuery,
  useGetSpotlightPostsQuery, useGetBigDealPostsQuery, useGetGlobalLensPostsQuery,
  useGetAfricaRisingPostsQuery, useGetDigitalMoneyPostsQuery, useGetEmergingTechPostsQuery,
  useGetHardwarePostsQuery, useGetSecureHabitsPostsQuery, useGetTechCulturePostsQuery,
  useGetKeyPlayersPostsQuery, useGetAIPostsQuery, useGetbchCryptoPostsQuery,
  useGetStartupsPostsQuery, useGetprvCompliancePostsQuery, useGetSocialPostQuery,
} from "@/features/api/apiSlice";
import PostCard from "../blog/components/blog/PostCard";
import MiniPostCard from "../blog/components/blog/MiniPostCard";
// import FloatingMenu from "./components/blog/FloatingMenu";
// import NewsletterCard from "./components/blog/NewsletterCard";
import { faLongArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const { data: bigDeal = [] } = useGetBigDealPostsQuery();

  const { data: digitalMoney } = useGetDigitalMoneyPostsQuery();
  const { data: bchCrypto = [] } = useGetbchCryptoPostsQuery();
  const { data: startups = [] } = useGetStartupsPostsQuery();
  const { data: prvCompliance = [] } = useGetprvCompliancePostsQuery();

  const { data: AI = [] } = useGetAIPostsQuery();
  const { data: emergingTech = [] } = useGetEmergingTechPostsQuery();
  const { data: hardware } = useGetHardwarePostsQuery();
  const { data: techCulture = [] } = useGetTechCulturePostsQuery();


  const { data: social } = useGetSocialPostQuery();
  const { data: globalLens = [] } = useGetGlobalLensPostsQuery();
  const { data: africaRising = [] } = useGetAfricaRisingPostsQuery();
  const { data: keyPlayers = [] } = useGetKeyPlayersPostsQuery();

  const { data: secureHabits = [] } = useGetSecureHabitsPostsQuery();

  const [visiblePosts, setVisiblePosts] = useState(3);
  const loadMore = () => {
    setVisiblePosts((prev) => Math.min(prev + 3, 10));
  };

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* 🪶 HERO SECTION */}
      <div className="relative h-screen -mt-16 sm:mt-0 flex flex-col justify-center items-center text-center overflow-hidden">
        {/* layered typography */}
        <Motion.h1
          className="absolute text-[16rem] sm:text-[16rem] font-extrabold uppercase text-lime-400/5 blur-2xl select-none z-0"
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
        {/* <FloatingMenu /> */}

        {/* scroll cue */}
        <Link href="#posts">
          <Motion.div
            className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 text-gray-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            tabIndex={0}
          >
            <span className="text-md sm:text-sm tracking-widest uppercase">read</span>
            <span className="text-md sm:text-lg"><FontAwesomeIcon icon={faLongArrowDown} size="sm" /></span>
          </Motion.div>
        </Link>
      </div>

      {/* 📰 POSTS SECTION */}
      <div id="posts" className="relative max-w-6xl mx-auto py-20 px-6 sm:px-8">
        <Motion.h2
          className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12 text-center text-white/90"
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
          <div className="space-y-2.5 w-[90%] lg:w-[75%] mx-auto">
            {posts.results.slice(0, visiblePosts).map((post: Post) => (
              <Motion.div
                key={post.id}
                // className="bg-white/5 border border-zinc-700 rounded-xl backdrop-blur-md p-6 hover:border-lime-200/30 transition-all duration-300"
                className="bg-zinc-900/80 rounded-2xl p-3.5 border border-zinc-800 transition-transform duration-500 transform hover:-translate-y-2 
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
              className="font-bold cursor-pointer border-3 border-gray-500/100 bg-transparent text-white text-sm px-7 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
                      active:text-black shadow-[0_4px_0_0_#ff69b4] hover:shadow-[0_2px_0_0_#fb64b6] active:shadow-[0_2px_0_0_#ff69b4] active:translate-y-1.5 hover:translate-y-0.5  transition-all duration-200"
            >
              <span className="hidden md:inline">Load </span>More
            </button>
          </div>
        )}

        {/* 1 HERO: Featured Post */}
        {featured && (
          <section className="py-10 px-6 mt-8">
            <Link href={`/blog/${featured.slug}`}>
              <p className="text-xs pl-3 font-semibold tracking-tight text-pink-400 uppercase mb-2">
                {featured.category?.name ?? 'Featured'}
              </p>
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
                      priority
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

        {/* 2 TRENDING NOW */}
        {trending.length > 0 && (
          <section className="py-10">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-white mb-4">Trending<span className="text-lime-400">Now</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {trending.map((post) => (
                <MiniPostCard key={post.id} post={post} />
              ))}

            </div>
          </section>
        )}

        {/* 3 SPOTLIGHT */}
        {spotlight.length > 0 && (
          <section className="py-10">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-white mb-4 flex justify-end">
              Entertainment
            </Motion.h2>
            {/* <h2 className="text-3xl sm:text-4xl font-bold text-pink-400 mb-10">Editor’s<span className="text-white"> Picks</span></h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {spotlight.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 4 BIG DEAL */}
        {bigDeal.length > 0 && (
          <section className="py-10">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-lime-400 mb-4 flex justify-start">Big<span className="text-white">Deal</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bigDeal.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 5 HARDWARE */}
        {hardware && (
          <section className="py-8 px-6 mt-10">
            <Link href={`/blog/${hardware.slug}`}>
              <p className="text-xs pr-3 font-semibold tracking-tight text-right text-pink-400 uppercase mb-2">
                {hardware.category?.name ?? 'Hardware'}
              </p>
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
                  {hardware.image && (
                    <Image
                      src={hardware.image}
                      alt={hardware.alt || hardware.title}
                      className="w-full h-96 object-cover rounded-xl shadow-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                      width={800}
                      height={400}
                      priority={false}
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
                    {hardware.title}
                  </Motion.h1>
                  <Motion.p
                    className="text-gray-300 text-sm"
                  >
                    {hardware.excerpt}
                  </Motion.p>
                </Motion.div>
              </Motion.div>
            </Link>
          </section>
        )}

        {/* <NewsletterCard /> */}

        {/* 11 EMERGING TECH */}
        {emergingTech.length > 0 && (
          <section className="py-10">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-white mb-4 flex justify-start">Emerging<span className="text-lime-400">Tech</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergingTech.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 10 AI */}
        {AI.length > 0 && (
          <section className="py-10">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-lime-400 mb-4 flex justify-end">AI
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {AI.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 12 TECH CULTURE */}
        {techCulture.length > 0 && (
          <section className="py-10">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-lime-400 mb-4 flex justify-start">Tech<span className="text-white">Culture</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {techCulture.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 9 DIGITAL MONEY */}
        {digitalMoney && (
          <section className="py-8 px-6 mt-10">
            <Link href={`/blog/${digitalMoney.slug}`}>
              <p className="text-xs pr-3 font-semibold tracking-tight text-right text-pink-400 uppercase mb-2">
                {digitalMoney.category?.name ?? 'Digital Money'}
              </p>
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
                  {digitalMoney.image && (
                    <Image
                      src={digitalMoney.image}
                      alt={digitalMoney.alt || digitalMoney.title}
                      className="w-full h-96 object-cover rounded-xl shadow-lg opacity-70 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"
                      width={800}
                      height={400}
                      priority={false}
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
                    {digitalMoney.title}
                  </Motion.h1>
                  <Motion.p
                    className="text-gray-300 text-sm"
                  >
                    {digitalMoney.excerpt}
                  </Motion.p>
                </Motion.div>
              </Motion.div>
            </Link>
          </section>
        )}

        {/* 10 BLOCKCHAIN & CRYPTO */}
        {bchCrypto.length > 0 && (
          <section className="py-10">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-white mb-4 flex justify-start">
              Blockchain&<span className="text-lime-400">Crypto</span>

            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bchCrypto.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 11 STARTUPS */}
        {startups.length > 0 && (
          <section className="py-10">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-white mb-4 flex justify-end">
              Startups
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {startups.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 12 PRIVACY & COMPLIANCE */}
        {prvCompliance.length > 0 && (
          <section className="py-10">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-lime-400 mb-4 flex justify-start">
              Privacy<span className="text-white">&Compliance</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {prvCompliance.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 5 HARDWARE */}
        {social && (
          <section className="py-8 px-6 mt-10">
            <Link href={`/blog/${social.slug}`}>
              <p className="text-xs pr-3 font-semibold tracking-tight text-right text-pink-400 uppercase mb-2">
                {social.category?.name ?? 'Hardware'}
              </p>
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
                  {social.image && (
                    <Image
                      src={social.image}
                      alt={social.alt || social.title}
                      className="w-full h-96 object-cover rounded-xl shadow-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                      width={800}
                      height={400}
                      priority={false}
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
                    {social.title}
                  </Motion.h1>
                  <Motion.p
                    className="text-gray-300 text-sm"
                  >
                    {social.excerpt}
                  </Motion.p>
                </Motion.div>
              </Motion.div>
            </Link>
          </section>
        )}

        {/* 6 GLOBAL LENS */}
        {globalLens.length > 0 && (
          <section className="py-10">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-white mb-4 flex justify-start">
              Wired<span className="text-lime-400">World</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {globalLens.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 7 AFRICA RISING */}
        {africaRising.length > 0 && (
          <section className="py-10">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-lime-400 mb-4 flex justify-end">Africa<span className="text-white">Rising</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {africaRising.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 8 KEY PLAYERS */}
        {keyPlayers.length > 0 && (
          <section className="py-10">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-white mb-4 flex justify-start">
              Key<span className="text-lime-400">Players</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyPlayers.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 13 SECURE HABITS */}
        {secureHabits.length > 0 && (
          <section className="py-10">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-white mb-4 flex justify-end">Secure<span className="text-lime-400">Habits</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {secureHabits.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}