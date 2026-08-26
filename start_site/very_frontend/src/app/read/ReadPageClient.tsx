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
import { useSectionLoader } from "@/hooks/useSectionLoader";


interface Props {
  initialData: {
    latest: Post[];
  };

  techData: {
    hardware: Post[];
    AI: Post[];
    bigDeal: Post[];
    digitalMoney: Post[];
    keyPlayers: Post[];
    bchCrypto: Post[];
  };
}

interface CodeData {
  devDigest: Post[];
  upskill: Post[];
  buyGuides: Post[];
  dataDefense: Post[];
  secureHabits: Post[];
  prvCompliance: Post[];
}

interface CultureData {
  featured: Post[];
  trending: Post[];
  spotlight: Post[];
  globalLens: Post[];
  africaRising: Post[];
  policyProgress: Post[];
}

export default function ReadPageClient({ initialData, techData }: Props) {
  const {
    latest = [],
  } = initialData || {};

  const {
    hardware = [],
    AI = [],
    bigDeal = [],
    digitalMoney = [],
    keyPlayers = [],
    bchCrypto = [],
  } = techData || {};

  const {
    ref: codeRef,
    data: codeData,
  } = useSectionLoader<CodeData>(
    `${process.env.NEXT_PUBLIC_API_URL}/read-section/code/`
  );

  const {
    ref: cultureRef,
    data: cultureData,
  } = useSectionLoader<CultureData>(
    `${process.env.NEXT_PUBLIC_API_URL}/read-section/culture/`
  );

  const {
    devDigest = [],
    upskill = [],
    buyGuides = [],
    dataDefense = [],
    secureHabits = [],
    prvCompliance = [],
  } = codeData || {};

  const {
    featured = [],
    trending = [],
    spotlight = [],
    globalLens = [],
    africaRising = [],
    policyProgress = [],
  } = cultureData || {};

  const posts = latest;

  const [visiblePosts, setVisiblePosts] = useState(3);
  // const [loading, setLoading] = useState(true);

  const loadMore = () => {
    setVisiblePosts((prev) => Math.min(prev + 3, 10));
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* 🪶 HERO SECTION */}
      <section className="relative min-h-screen -mt-8 sm:mt-0 flex flex-col justify-center items-center text-center overflow-hidden">
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
              Culture.<span className="text-xs text-transparent">™</span>
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
        <a href="#posts">
          <Motion.div
            className="absolute bottom-6 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 text-gray-400"
            animate={{ y: [0, 10, 0] }}
            style={{ minHeight: '3rem' }} // reserve vertical space
            transition={{ repeat: Infinity, duration: 2 }}
            tabIndex={0}
          >
            <span className="text-base sm:text-sm tracking-widest uppercase">read</span>
            <span className="text-base sm:text-base"><FontAwesomeIcon icon={faLongArrowDown} size="sm" /></span>
          </Motion.div>
        </a>
      </section>

      {/* POSTS SECTION */}
      <div id="posts" className="relative max-w-6xl mx-auto py-20 px-6 sm:px-8">
        <Motion.h2
          className="text-4xl sm:text-5xl font-bold mb-6 text-center text-white/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Latest from <span className="text-lime-400">VeryCodedly</span>
        </Motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-center">
          Just in.
        </p>

        <div className="">
          {posts && (
            <div className="space-y-2.5 w-[92%] md:w-[80%] lg:w-[75%] mx-auto my-12">
              {posts?.slice(0, visiblePosts).map((post: Post) => (
                <Motion.div
                  key={post.slug}
                  // className="bg-white/5 border border-zinc-700 rounded-xl backdrop-blur-md p-6 hover:border-lime-200/30 transition-all duration-300"
                  className="bg-zinc-900/40 rounded-2xl p-3 border border-zinc-900 transition-transform duration-500 transform hover:-translate-y-2 
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
            <div className="flex justify-center my-12">
              <button
                onClick={loadMore}
                className="font-semibold cursor-pointer border-3 border-gray-500/100 bg-transparent text-white text-sm px-7 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
                      active:text-black shadow-[0_4px_0_0_#ff69b4] hover:shadow-[0_2px_0_0_#fe379a] active:shadow-[0_2px_0_0_#fe379a] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
              >
                <span className="hidden md:inline">Show </span>More
              </button>
            </div>
          )}

          <div className="flex items-center gap-3 mt-30">
            <span className="w-2 sm:w-1.5 h-10 rounded-xs font-black bg-gradient-to-r from-white via-lime-500 to-white" />
            <h2 className="text-4xl font-bold">Tech</h2>
            <p className="text-sm text-gray-600 ml-2 pt-2">Where new technology, big ideas, and the people behind them meet.</p>
          </div>

          {/* 5 HARDWARE */}
          <Carousel posts={hardware} />


          {/* 10 AI */}
          {AI.length > 0 && (
            <section className="py-7 px-2 flex flex-col md:flex-row md:items-start gap-4 group">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                <Motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-xl text-white leading-tight whitespace-normal max-w-[70px]">AI
                </Motion.h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                {AI.map(post => (
                  <MiniPostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          {bigDeal.length > 0 && (
            <section className="py-7 px-2 flex flex-col md:flex-row md:items-start gap-4 group">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                <Motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-xl text-white leading-tight whitespace-normal max-w-[50px]">Big Deal
                </Motion.h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                {bigDeal.map(post => (
                  <MiniPostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          <Carousel posts={digitalMoney} />

          {keyPlayers.length > 0 && (
            <section className="py-7 px-2 flex flex-col md:flex-row md:items-start gap-4 group">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                <Motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-xl text-white leading-tight whitespace-normal max-w-[85px]">
                  Key Players
                </Motion.h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
                {keyPlayers.map(post => (
                  <MiniPostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* 10 BLOCKCHAIN & CRYPTO */}
          {bchCrypto.length > 0 && (
            <section className="py-7 px-2 flex flex-col md:flex-row md:items-start gap-4 group">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                <Motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-xl text-white leading-tight whitespace-normal max-w-[90px] mr-7">
                  Blockchain & Crypto
                </Motion.h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                {bchCrypto.map(post => (
                  <MiniPostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          <section ref={codeRef} className="min-h-[1400px] md:min-h-[1400px] lg:min-h-[1800px]">
            {codeData && (
              <>
                <div className="flex items-center gap-3 mt-30">
                  <span className="w-2 sm:w-1.5 h-10 bg-lime-400 rounded-xs" />
                  <h2 className="text-4xl font-bold text-white">Code</h2>
                  <p className="text-sm text-gray-600 ml-2 pt-2">Modern software, from logic to security.</p>
                </div>

                <Carousel posts={devDigest} />

                {upskill.length > 0 && (
                  <section className="py-7 px-2 flex flex-col md:flex-row md:items-start gap-4 group">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                      <Motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-xl text-white leading-tight whitespace-normal max-w-[87px]">
                        Upskill
                      </Motion.h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                      {upskill.map(post => (
                        <MiniPostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </section>
                )}

                {buyGuides.length > 0 && (
                  <section className="py-7 px-2 flex flex-col md:flex-row md:items-start gap-4 group">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                      <Motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-xl text-white leading-tight whitespace-normal max-w-[100px]">Beginner Guides
                      </Motion.h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                      {buyGuides.map(post => (
                        <MiniPostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </section>
                )}

                <Carousel posts={dataDefense} />

                {/* 13 SECURE HABITS */}
                {secureHabits.length > 0 && (
                  <section className="py-7 px-2 flex flex-col md:flex-row md:items-start gap-4 group">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                      <Motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-xl text-white leading-tight whitespace-normal max-w-[87px]">Secure Habits
                      </Motion.h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                      {secureHabits.map(post => (
                        <MiniPostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </section>
                )}

                {/* 12 PRIVACY & COMPLIANCE */}
                {prvCompliance.length > 0 && (
                  <section className="py-7 px-2 flex flex-col md:flex-row md:items-start gap-4 group">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                      <Motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-xl text-white leading-tight whitespace-normal max-w-[107px] mr-2">
                        Privacy & Compliance
                      </Motion.h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                      {prvCompliance.map(post => (
                        <MiniPostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </section>

          <section ref={cultureRef} className="min-h-[1400px] md:min-h-[1400px] lg:min-h-[1800px]">
            {cultureData && (
              <>
                <div className="flex items-center gap-3 mt-30">
                  <span className="w-2 sm:w-1.5 h-10 bg-pink-400 rounded-xs" />
                  <h2 className="text-4xl font-bold text-white tracking-tighter">Culture</h2>
                  <p className="text-sm text-gray-600 ml-2 tracking-tighter pt-2">Trends, stories, places and the world changing around us.</p>
                </div>

                {/* 1 HERO: Featured Post */}
                <Carousel posts={featured} />

                {/* 2 TRENDING NOW */}
                {trending.length > 0 && (
                  <section className="py-7 px-2 flex flex-col md:flex-row md:items-start gap-4 group">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                      <Motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-xl text-white leading-tight whitespace-normal max-w-[60px]">Right Now
                      </Motion.h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
                      {trending.map((post) => (
                        <MiniPostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </section>
                )}

                {/* 3 SPOTLIGHT */}
                {spotlight.length > 0 && (
                  <section className="py-7 px-2 flex flex-col md:flex-row md:items-start gap-4 group">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                      <Motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-xl text-white leading-tight whitespace-normal max-w-[93px]">
                        Showtime
                      </Motion.h3>
                    </div>

                    {/* <h2 className="text-3xl sm:text-4xl font-bold text-pink-400 mb-10">Editor’s<span className="text-white"> Picks</span></h2> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
                      {spotlight.map(post => (
                        <MiniPostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </section>
                )}

                {/* <NewsletterCard /> */}

                <Carousel posts={globalLens} />


                {/* 7 AFRICA NOW */}
                {africaRising.length > 0 && (
                  <section className="py-7 px-2 flex flex-col md:flex-row md:items-start gap-4 group">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                      <Motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-xl text-white leading-tight whitespace-normal max-w-[70px]">Africa Now
                      </Motion.h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
                      {africaRising.map(post => (
                        <MiniPostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </section>
                )}

                {policyProgress.length > 0 && (
                  <section className="py-7 px-2 flex flex-col md:flex-row md:items-start gap-4 group">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400" />
                      <Motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-xl text-white leading-tight whitespace-normal max-w-[90px]">
                        Policy & Progress
                      </Motion.h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
                      {policyProgress.map(post => (
                        <MiniPostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </section>

          <section className="my-10 pt-20 px-6 bg-black/50 text-center">
            <div className="flex flex-col items-center gap-2 mb-6">
              <h4 className="text-2xl md:text-3xl font-bold text-white/90 tracking-tight">
                Seen enough? Keep going.
              </h4>
              <p className="text-sm text-gray-400/80 mt-1">
                There&apos;s more to know. And plenty to say.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/know"
                className="font-bold sm:font-bold border-3 border-gray-500/100 bg-lime-400 text-black px-9 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
                         active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
              >
                Know
              </Link>

              <Link
                href="/connect"                
                className="tracking-tighter hover:font-bold border-3 border-gray-500/100 px-7 py-1 rounded-full text-white hover:bg-white active:bg-white hover:text-black
                        active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200">
                Connect
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div >
  );
}
