'use client';

import { motion as Motion } from "framer-motion";
import PostCard from "../read/components/blog/PostCard";
import MiniPostCard from "../read/components/blog/MiniPostCard";
// import FloatingMenu from "./components/blog/FloatingMenu";
// import NewsletterCard from "./components/blog/NewsletterCard";
import { faLongArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "@/types/post";
import { useState } from "react";
import Link from "next/link";
import Carousel from "./components/blog/Carousel";


interface Props {
  data: {
  latest: Post[];
  featured: Post[];
  trending: Post[];
  spotlight: Post[];
  bigDeal: Post[];
  digitalMoney: Post[];
  bchCrypto: Post[];
  startups: Post[];
  prvCompliance: Post[];
  AI: Post[];
  emergingTech: Post[];
  hardware: Post[];
  techCulture: Post[];
  policyProgress: Post[];
  globalLens: Post[];
  africaRising: Post[];
  keyPlayers: Post[];
  dataDefense: Post[];
  secureHabits: Post[];
  stack: Post[];
  buyGuides: Post[];
  devDigest: Post[];
  theClimb: Post[];
  rundown: Post[];
  industryInsights: Post[];
  };
}

export default function ReadPageClient({ data }: Props){
  const {
    latest = [],
    featured = [],
    trending = [],
    spotlight = [],
    bigDeal = [],
    digitalMoney = [],
    bchCrypto = [],
    startups = [],
    prvCompliance = [],
    AI = [],
    emergingTech = [],
    hardware = [],
    techCulture = [],
    policyProgress = [],
    globalLens = [],
    africaRising = [],
    keyPlayers = [],
    dataDefense = [],
    secureHabits = [],
    stack = [],
    buyGuides = [],
    devDigest = [],
    theClimb = [],
    rundown = [],
    industryInsights = [],
  } = data;

  const posts = latest;

  const [visiblePosts, setVisiblePosts] = useState(3);
  
  const loadMore = () => {
    setVisiblePosts((prev) => Math.min(prev + 3, 10));
  };

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* 🪶 HERO SECTION */}
      <div className="relative min-h-screen -mt-8 sm:mt-0 flex flex-col justify-center items-center text-center overflow-hidden">
        {/* layered typography */}
        <Motion.h1
          className="absolute text-[16rem] sm:text-[16rem] font-extrabold uppercase text-gray-400/5 blur-2xl select-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 4 }}
          transition={{ duration: 0.8 }}
        >
          VeryCodedly
        </Motion.h1>

        <Motion.h1
          className="absolute text-[18rem] sm:text-[18rem] font-extrabold uppercase text-white/5 z-10"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
        >
          VeryCodedly
        </Motion.h1>

        <div className="z-20 backdrop-blur-xs w-full py-5 sm:py-5">
          <h1 className="hero px-14 sm:px-0 md:px-8 lg:px-0 relative text-6xl sm:text-7xl font-bold z-20 backdrop-blur-2xl">
            Tech.{" "}
            <Motion.span
              className="mx-1"
              initial={{ color: "#ffffff" }}
              animate={{ color: "#9AE600" }}
              transition={{ delay: 0.3, duration: 1 }}
            >
            Code.{" "}
            </Motion.span>
            <Motion.span
              className="mx-0"
              initial={{ color: "#ffffff" }}
              animate={{ color: "#fb64b6" }}
              transition={{ delay: 0.6, duration: 1 }}
            >
            Culture.<span className="text-xs">™</span>
            </Motion.span>
          </h1>
          <Motion.p
            className="relative text-gray-400 px-2 sm:px-0 mt-6 z-20 max-w-sm sm:max-w-md mx-auto text-md sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Unfiltered takes on Tech, Code, Culture and everything in between.
          </Motion.p>
        </div>

        {/* scroll cue */}
        <Link href="#posts">
          <Motion.div 
            className="absolute bottom-6 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 text-gray-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            tabIndex={0}
          >
            <span className="text-base sm:text-sm tracking-widest uppercase">read</span>
            <span className="text-base sm:text-base"><FontAwesomeIcon icon={faLongArrowDown} size="sm" /></span>
          </Motion.div>
        </Link>
      </div>

      {/* 📰 POSTS SECTION */}
      <div id="posts" className="relative max-w-6xl mx-auto py-20 px-6 sm:px-8">
        <Motion.h2
          className="text-3xl sm:text-4xl font-bold mb-10 text-center text-white/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Latest from <span className="text-lime-400">VeryCodedly</span>
        </Motion.h2>

        <div className="">
        {posts && (
          <div className="space-y-2.5 w-[90%] md:w-[80%] lg:w-[75%] mx-auto my-12">
            {posts?.slice(0, visiblePosts).map((post: Post) => (
              <Motion.div
                key={post.id}
                // className="bg-white/5 border border-zinc-700 rounded-xl backdrop-blur-md p-6 hover:border-lime-200/30 transition-all duration-300"
                className="bg-zinc-900/80 rounded-2xl p-3 border border-zinc-800 transition-transform duration-500 transform hover:-translate-y-2 
                hover:rotateX-3 hover:rotateY-3 active:-translate-y-2 active:rotateX-3 active:rotateY-3" style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <PostCard post={post} />
              </Motion.div>
            ))}
          </div>
        )}
        
        {posts && visiblePosts < 9 && (
          <div className="flex justify-center my-12">
            <button
              onClick={loadMore}
              className="font-semibold cursor-pointer border-3 border-gray-500/100 bg-transparent text-white text-sm px-7 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
                      active:text-black shadow-[0_4px_0_0_#ff69b4] hover:shadow-[0_2px_0_0_#fb64b6] active:shadow-[0_2px_0_0_#ff69b4] active:translate-y-1.5 hover:translate-y-0.5  transition-all duration-200"
            >
              <span className="hidden md:inline">Show </span>More
            </button>
          </div>
        )}

        <Carousel posts={hardware} />

        {emergingTech.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
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
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-white mb-4 flex justify-end">AI
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {AI.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {bigDeal.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-lime-400 mb-4 flex justify-start">Big<span className="text-white">Deal</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bigDeal.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        <Carousel posts={digitalMoney} />

        {/* 10 BLOCKCHAIN & CRYPTO */}
        {bchCrypto.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
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
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
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
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
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

        <Carousel posts={devDigest} />

        {theClimb.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-white mb-4 flex justify-start">
              The<span className="text-lime-400">Climb</span>

            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {theClimb.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {stack.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-white mb-4 flex justify-end">Stack
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stack.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {industryInsights.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-lime-400 mb-4 flex justify-start">
              Industry<span className="text-white">Insights</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {industryInsights.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        <Carousel posts={dataDefense} />

        {/* 13 SECURE HABITS */}
        {secureHabits.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-white mb-4 flex justify-start">Secure<span className="text-lime-400">Habits</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {secureHabits.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {rundown.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-white mb-4 flex justify-end">
              Rundown
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rundown.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {buyGuides.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-white mb-4 flex justify-start">Beginner<span className="text-lime-400">Guides</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {buyGuides.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 1 HERO: Featured Post */}
        <Carousel posts={featured} />

        {/* 2 TRENDING NOW */}
        {trending.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-white mb-4">Trending<span className="text-lime-400">Now</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {trending.map((post) => (
                <MiniPostCard key={post.id} post={post} />
              ))}

            </div>
          </section>
        )}

        {/* 3 SPOTLIGHT */}
        {spotlight.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-white mb-4 flex justify-end">
              Entertainment
            </Motion.h2>
            {/* <h2 className="text-3xl sm:text-4xl font-bold text-pink-400 mb-10">Editor’s<span className="text-white"> Picks</span></h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {spotlight.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 4 BIG DEAL */}
        
        {/* 5 HARDWARE */}

        {/* <NewsletterCard /> */}

        {/* 11 EMERGING TECH */}
        
        {/* 12 TECH CULTURE */}
        {techCulture.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-lime-400 mb-4 flex justify-start">Tech<span className="text-white">Culture</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {techCulture.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 9 DIGITAL MONEY */}

        {/* 5 HARDWARE */}
        <Carousel posts={globalLens} />

        {/* 6 GLOBAL LENS */}
        {keyPlayers.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-white mb-4 flex justify-start">
              Key<span className="text-lime-400">Players</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {keyPlayers.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 7 AFRICA RISING */}
        {africaRising.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-lime-400 mb-4 flex justify-end">Africa<span className="text-white">Now</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {africaRising.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* 8 KEY PLAYERS */}
        {policyProgress.length > 0 && (
          <section className="py-4 px-3">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-lime-400 mb-4 flex justify-start">
              Policy<span className="text-white">&Progress</span>
            </Motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {policyProgress.map(post => (
                <MiniPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        <section className="py-20 px-6 bg-black/50 text-center">
          <h2 className="text-2xl font-bold mb-6">Join the Conversation</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="https://www.youtube.com/@verycodedly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-11 rounded-lg transition"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Know
            </Link>

            <Link
              href="https://discord.gg/53wVsqEcbE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base inline-flex items-center gap-3 bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-3 px-8 rounded-lg transition"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.452 18.452 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.069.069 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.366 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Connect
            </Link>
          </div>
        </section>

      </div>
      </div>
    </section>
  );
}

{/* // {dataDefense && (
        //   <section className="py-6 px-5 mt-6">
        //     <Link href={`/read/${dataDefense.slug}`}>
        //       <p className="text-xs pr-3 font-semibold tracking-tight text-right text-pink-400 uppercase mb-2">
        //         {dataDefense.category?.name ?? 'Data Defense'}
        //       </p>
        //       <Motion.div
        //         className="relative group cursor-pointer overflow-hidden rounded-xl"
        //         initial={{ opacity: 0, y: 20 }}
        //         animate={{ opacity: 1, y: 0 }}
        //         transition={{ duration: 0.6, ease: "easeOut" }}
        //         whileHover={{ scale: 1.02 }}
        //         whileTap={{ scale: 0.98 }}
        //       >
        //         {/ Image with parallax hover /}
        //         <Motion.div
        //           className="relative"
        //           whileHover={{ scale: 1.05 }}
        //           transition={{ duration: 0.8, ease: "easeOut" }}
        //         >
        //           {dataDefense.image && (
        //             <Image
        //               src={dataDefense.image}
        //               alt={dataDefense.alt || dataDefense.title}
        //               className="w-full h-96 text-xs object-cover rounded-xl shadow-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        //               width={800}
        //               height={400}
        //               priority={false}
        //             />
        //           )}
        //         </Motion.div>

        //         {/ Gradient overlay with fade-in /}
        //         <Motion.div
        //           className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent rounded-xl"
        //           initial={{ opacity: 0 }}
        //           animate={{ opacity: 1 }}
        //           transition={{ duration: 0.8, delay: 0.2 }}
        //         />

        //         {/ Text content with slide-up /}
        //         <Motion.div
        //           className="absolute bottom-6 left-6 right-6"
        //           initial={{ y: 30, opacity: 0 }}
        //           whileInView={{ y: 0, opacity: 1 }}
        //           transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        //           viewport={{ once: true }}
        //         >
        //           <Motion.h1
        //             className="text-2xl md:text-3xl font-bold text-white mb-2"
        //           >
        //             {dataDefense.title}
        //           </Motion.h1>
        //           <Motion.p
        //             className="text-gray-300 text-sm"
        //           >
        //             {dataDefense.excerpt}
        //           </Motion.p>
        //         </Motion.div>
        //       </Motion.div>
        //     </Link>
        //   </section>
        )} */}
        
// 'use client';

// import { motion as Motion } from "framer-motion";
// import {
//   useGetPostsQuery, useGetFeaturedPostQuery, useGetTrendingPostsQuery,
//   useGetSpotlightPostsQuery, useGetBigDealPostsQuery, useGetGlobalLensPostsQuery,
//   useGetAfricaRisingPostsQuery, useGetDigitalMoneyPostsQuery, useGetEmergingTechPostsQuery,
//   useGetHardwarePostsQuery, useGetSecureHabitsPostsQuery, useGetTechCulturePostsQuery,
//   useGetKeyPlayersPostsQuery, useGetAIPostsQuery, useGetbchCryptoPostsQuery,
//   useGetStartupsPostsQuery, useGetprvCompliancePostsQuery, useGetSocialPostQuery,
//   useGetDataDefensePostQuery, useGetStackPostsQuery, useGetBuyGuidesPostsQuery,
//   useGetDevDigestPostQuery, useGetTheClimbPostsQuery, useGetRundownPostsQuery,
//   useGetIndustryInsightsPostsQuery} from "@/features/api/apiSlice";
// import PostCard from "../read/components/blog/PostCard";
// import MiniPostCard from "../read/components/blog/MiniPostCard";
// // import FloatingMenu from "./components/blog/FloatingMenu";
// // import NewsletterCard from "./components/blog/NewsletterCard";
// import { faLongArrowDown } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Post } from "@/types/post";
// import { useState } from "react";
// import Link from "next/link";
// // import Image from "next/image";
// import { useParams } from "next/navigation";
// import Carousel from "./components/blog/Carousel";


// export default function ReadHome() {
//   const page = useParams();
//   const { data: posts, error, isLoading } = useGetPostsQuery(page);

//   const { data: featured = [] } = useGetFeaturedPostQuery();
//   const { data: trending = [] } = useGetTrendingPostsQuery();
//   const { data: spotlight = [] } = useGetSpotlightPostsQuery();
//   const { data: bigDeal = [] } = useGetBigDealPostsQuery();

//   const { data: digitalMoney = [] } = useGetDigitalMoneyPostsQuery();
//   const { data: bchCrypto = [] } = useGetbchCryptoPostsQuery();
//   const { data: startups = [] } = useGetStartupsPostsQuery();
//   const { data: prvCompliance = [] } = useGetprvCompliancePostsQuery();

//   const { data: AI = [] } = useGetAIPostsQuery();
//   const { data: emergingTech = [] } = useGetEmergingTechPostsQuery();
//   const { data: hardware = [] } = useGetHardwarePostsQuery();
//   const { data: techCulture = [] } = useGetTechCulturePostsQuery();


//   const { data: social = [] } = useGetSocialPostQuery();
//   const { data: globalLens = [] } = useGetGlobalLensPostsQuery();
//   const { data: africaRising = [] } = useGetAfricaRisingPostsQuery();
//   const { data: keyPlayers = [] } = useGetKeyPlayersPostsQuery();

//   const { data: dataDefense = [] } = useGetDataDefensePostQuery();
//   const { data: secureHabits = [] } = useGetSecureHabitsPostsQuery();
//   const { data: stack = [] } = useGetStackPostsQuery();
//   const { data: buyGuides = [] } = useGetBuyGuidesPostsQuery();

//   const { data: devDigest = [] } = useGetDevDigestPostQuery();
//   const { data: theClimb = [] } = useGetTheClimbPostsQuery();
//   const { data: rundown = [] } = useGetRundownPostsQuery();
//   const { data: industry = [] } = useGetIndustryInsightsPostsQuery();

//   const [visiblePosts, setVisiblePosts] = useState(3);
//   const loadMore = () => {
//     setVisiblePosts((prev) => Math.min(prev + 3, 10));
//   };

//   return (
//     <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
//       {/* 🪶 HERO SECTION */}
//       <div className="relative min-h-screen -mt-16 sm:mt-0 flex flex-col justify-center items-center text-center overflow-hidden">
//         {/* layered typography */}
//         <Motion.h1
//           className="absolute text-[16rem] sm:text-[16rem] font-extrabold uppercase text-gray-400/5 blur-2xl select-none z-0"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 4 }}
//           transition={{ duration: 0.8 }}
//         >
//           VeryCodedly
//         </Motion.h1>

//         <Motion.h1
//           className="absolute text-[18rem] sm:text-[18rem] font-extrabold uppercase text-white/5 z-10"
//           style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
//         >
//           VeryCodedly
//         </Motion.h1>

//         <div className="z-20 backdrop-blur-xs w-full py-5 sm:py-5">
//           <h1 className="hero px-14 sm:px-0 md:px-8 lg:px-0 relative text-6xl sm:text-7xl font-bold z-20 backdrop-blur-2xl">
//             Tech.{" "}
//             <Motion.span
//               className="mx-1"
//               initial={{ color: "#ffffff" }}
//               animate={{ color: "#9AE600" }}
//               transition={{ delay: 0.3, duration: 1 }}
//             >
//             Code.{" "}
//             </Motion.span>
//             <Motion.span
//               className="mx-0"
//               initial={{ color: "#ffffff" }}
//               animate={{ color: "#fb64b6" }}
//               transition={{ delay: 0.6, duration: 1 }}
//             >
//             Culture.
//             </Motion.span>
//           </h1>
//           <Motion.p
//             className="relative text-gray-400 px-2 sm:px-0 mt-6 z-20 max-w-sm sm:max-w-md mx-auto text-md sm:text-lg"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.7 }}
//           >
//             Unfiltered takes on Tech, Code, Culture and everything in between.
//           </Motion.p>
//         </div>

//         {/* scroll cue */}
//         <Link href="#posts">
//           <Motion.div
//             className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 text-gray-400"
//             animate={{ y: [0, 10, 0] }}
//             transition={{ repeat: Infinity, duration: 2 }}
//             tabIndex={0}
//           >
//             <span className="text-md sm:text-sm tracking-widest uppercase">read</span>
//             <span className="text-md sm:text-lg"><FontAwesomeIcon icon={faLongArrowDown} size="sm" /></span>
//           </Motion.div>
//         </Link>
//       </div>

//       {/* 📰 POSTS SECTION */}
//       <div id="posts" className="relative max-w-6xl mx-auto py-20 px-6 sm:px-8">
//         <Motion.h2
//           className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12 text-center text-white/90"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           Latest from <span className="text-lime-400">VeryCodedly</span>
//         </Motion.h2>

//         {isLoading && (
//           <div className="bg-zinc-900/50 rounded-xl h-96 animate-pulse" />
//         )}

//         {error && (
//           <div className="text-center py-20">
//             <p className="text-rose-400 text-lg mb-4">Failed to load posts</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-6 py-1 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 rounded-full text-rose-300 transition-all"
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         <div className="min-h-[1500px] md:min-h-[2000px]">
//         {posts && (
//           <div className="space-y-2.5 w-[90%] lg:w-[75%] mx-auto">
//             {posts?.results.slice(0, visiblePosts).map((post: Post) => (
//               <Motion.div
//                 key={post.id}
//                 // className="bg-white/5 border border-zinc-700 rounded-xl backdrop-blur-md p-6 hover:border-lime-200/30 transition-all duration-300"
//                 className="bg-zinc-900/80 rounded-2xl p-3 border border-zinc-800 transition-transform duration-500 transform hover:-translate-y-2 
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
//         {posts && visiblePosts < 9 && (
//           <div className="flex justify-center my-10">
//             <button
//               onClick={loadMore}
//               className="font-bold cursor-pointer border-3 border-gray-500/100 bg-transparent text-white text-sm px-7 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
//                       active:text-black shadow-[0_4px_0_0_#ff69b4] hover:shadow-[0_2px_0_0_#fb64b6] active:shadow-[0_2px_0_0_#ff69b4] active:translate-y-1.5 hover:translate-y-0.5  transition-all duration-200"
//             >
//               <span className="hidden md:inline">Load </span>More
//             </button>
//           </div>
//         )}

//         {/* 1 HERO: Featured Post */}
//         <Carousel posts={featured} />

//         {/* 2 TRENDING NOW */}
//         {trending.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-white mb-4">Trending<span className="text-lime-400">Now</span>
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
//               {trending.map((post) => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}

//             </div>
//           </section>
//         )}

//         {/* 3 SPOTLIGHT */}
//         {spotlight.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-white mb-4 flex justify-end">
//               Entertainment
//             </Motion.h2>
//             {/* <h2 className="text-3xl sm:text-4xl font-bold text-pink-400 mb-10">Editor’s<span className="text-white"> Picks</span></h2> */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {spotlight.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* 4 BIG DEAL */}
//         {bigDeal.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-lime-400 mb-4 flex justify-start">Big<span className="text-white">Deal</span>
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {bigDeal.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* 5 HARDWARE */}
//         <Carousel posts={hardware} />

//         {/* <NewsletterCard /> */}

//         {/* 11 EMERGING TECH */}
//         {emergingTech.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-white mb-4 flex justify-start">Emerging<span className="text-lime-400">Tech</span>
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {emergingTech.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* 10 AI */}
//         {AI.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-white mb-4 flex justify-end">AI
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {AI.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* 12 TECH CULTURE */}
//         {techCulture.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-lime-400 mb-4 flex justify-start">Tech<span className="text-white">Culture</span>
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {techCulture.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         <Carousel posts={devDigest} />

//         {theClimb.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-white mb-4 flex justify-start">
//               The<span className="text-lime-400">Climb</span>

//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {theClimb.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         {rundown.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-white mb-4 flex justify-end">
//               Rundown
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {rundown.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         {industry.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-lime-400 mb-4 flex justify-start">
//               Industry<span className="text-white">Insights</span>
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {industry.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* 9 DIGITAL MONEY */}
//         <Carousel posts={digitalMoney} />

//         {/* 10 BLOCKCHAIN & CRYPTO */}
//         {bchCrypto.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-white mb-4 flex justify-start">
//               Blockchain&<span className="text-lime-400">Crypto</span>

//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {bchCrypto.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* 11 STARTUPS */}
//         {startups.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-white mb-4 flex justify-end">
//               Startups
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {startups.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* 12 PRIVACY & COMPLIANCE */}
//         {prvCompliance.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-lime-400 mb-4 flex justify-start">
//               Privacy<span className="text-white">&Compliance</span>
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {prvCompliance.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* 5 HARDWARE */}
//         <Carousel posts={social} />

//         {/* 6 GLOBAL LENS */}
//         {globalLens.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-white mb-4 flex justify-start">
//               Wired<span className="text-lime-400">World</span>
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {globalLens.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* 7 AFRICA RISING */}
//         {africaRising.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-lime-400 mb-4 flex justify-end">Africa<span className="text-white">Now</span>
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {africaRising.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* 8 KEY PLAYERS */}
//         {keyPlayers.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-lime-400 mb-4 flex justify-start">
//               Key<span className="text-white">Players</span>
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {keyPlayers.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         <Carousel posts={dataDefense} />

//         {/* 13 SECURE HABITS */}
//         {secureHabits.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-white mb-4 flex justify-start">Secure<span className="text-lime-400">Habits</span>
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {secureHabits.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         {stack.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-white mb-4 flex justify-end">Stack
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {stack.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}

//         {buyGuides.length > 0 && (
//           <section className="py-6 px-3">
//             <Motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-3xl text-white mb-4 flex justify-start">Beginner<span className="text-lime-400">Guides</span>
//             </Motion.h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {buyGuides.map(post => (
//                 <MiniPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//       </div>
//     </section>
//   );
// }

{/* // {dataDefense && (
        //   <section className="py-6 px-5 mt-6">
        //     <Link href={`/read/${dataDefense.slug}`}>
        //       <p className="text-xs pr-3 font-semibold tracking-tight text-right text-pink-400 uppercase mb-2">
        //         {dataDefense.category?.name ?? 'Data Defense'}
        //       </p>
        //       <Motion.div
        //         className="relative group cursor-pointer overflow-hidden rounded-xl"
        //         initial={{ opacity: 0, y: 20 }}
        //         animate={{ opacity: 1, y: 0 }}
        //         transition={{ duration: 0.6, ease: "easeOut" }}
        //         whileHover={{ scale: 1.02 }}
        //         whileTap={{ scale: 0.98 }}
        //       >
        //         {/ Image with parallax hover /}
        //         <Motion.div
        //           className="relative"
        //           whileHover={{ scale: 1.05 }}
        //           transition={{ duration: 0.8, ease: "easeOut" }}
        //         >
        //           {dataDefense.image && (
        //             <Image
        //               src={dataDefense.image}
        //               alt={dataDefense.alt || dataDefense.title}
        //               className="w-full h-96 text-xs object-cover rounded-xl shadow-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        //               width={800}
        //               height={400}
        //               priority={false}
        //             />
        //           )}
        //         </Motion.div>

        //         {/ Gradient overlay with fade-in /}
        //         <Motion.div
        //           className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent rounded-xl"
        //           initial={{ opacity: 0 }}
        //           animate={{ opacity: 1 }}
        //           transition={{ duration: 0.8, delay: 0.2 }}
        //         />

        //         {/ Text content with slide-up /}
        //         <Motion.div
        //           className="absolute bottom-6 left-6 right-6"
        //           initial={{ y: 30, opacity: 0 }}
        //           whileInView={{ y: 0, opacity: 1 }}
        //           transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        //           viewport={{ once: true }}
        //         >
        //           <Motion.h1
        //             className="text-2xl md:text-3xl font-bold text-white mb-2"
        //           >
        //             {dataDefense.title}
        //           </Motion.h1>
        //           <Motion.p
        //             className="text-gray-300 text-sm"
        //           >
        //             {dataDefense.excerpt}
        //           </Motion.p>
        //         </Motion.div>
        //       </Motion.div>
        //     </Link>
        //   </section>
        )} */}
        