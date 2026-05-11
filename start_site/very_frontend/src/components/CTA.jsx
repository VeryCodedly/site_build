"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

export default function CTA() {
  const [startTyping, setStartTyping] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [cursor, setCursor] = useState("|");

    useEffect(() => {
    const interval = setInterval(() => {
        setCursor((prev) => (prev === "█" ? " " : "█"));
    }, 500);
    return () => clearInterval(interval);
    }, []);

  // Calculate when typing complete based on text length
  useEffect(() => {
    if (startTyping) {
      // "Server running. Your move." is 28 characters
      // 28 chars * 50ms typing speed + 500ms delay = ~1900ms
      const timer = setTimeout(() => {
        setTypingComplete(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [startTyping]);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black to-zinc-950/40 text-white pt-16 pb-32 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Terminal FIRST on small screens */}
        <div className="lg:hidden flex justify-center mb-18">
          <div className="w-full max-w-md">
            <div className="relative bg-zinc-900/30 backdrop-blur-sm order order-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-900/70 border-b border-zinc-800">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="text-xs text-gray-500 ml-2 font-mono">~/verycodedly</span>
              </div>

              {/* Terminal Content */}
              <motion.div className="p-5 font-mono text-sm space-y-3" onViewportEnter={() => setStartTyping(true)}>
                <p className="text-gray-400"><span className="text-white">$</span> git clone verycodedly/starter</p>
                <p className="text-gray-300 ml-3">Cloning into 'starter'...</p>

                <p className="text-gray-400 mt-4"><span className="text-white">$</span> cd starter</p>

                <p className="text-gray-400 mt-4"><span className="text-white">$</span> npm install</p>
                <p className="text-gray-300 ml-3">Installing dependencies...</p>

                <p className="text-gray-400 mt-4"><span className="text-white">$</span> npm run start</p>

                <p className="text-lime-400 ml-3 min-h-[24px]">
                  {startTyping && (
                    <Typewriter
                      words={['Server running. Your move.']}
                      loop={1}
                      cursor={false}
                      typeSpeed={50}
                      delaySpeed={500}
                      onLoopDone={() => setTypingComplete(true)}
                    />
                  )}
                </p>

                <div className="flex items-center gap-2 text-gray-400 mt-4">
                  {typingComplete ? (
                    <>
                      <span className="text-white">$</span>
                      <span className="text-lime-400 text-sm animate-pulse">
                        {cursor}
                      </span>
                    </>
                  ) : (
                    <span className="text-white opacity-0">$</span>
                  )}
                </div>
              </motion.div>
              <div className="h-1 bg-gradient-to-r from-lime-400/20 via-pink-400/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* DESKTOP TERMINAL (left side) */}
        <div className="absolute left-8 top-12 bottom-12 w-[500px] hidden lg:block">
          <div className="relative w-full h-full flex items-center">
            <div className="relative w-full max-w-md ml-10 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-900/70 border-b border-zinc-800">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="text-xs text-gray-500 ml-2 font-mono">~/verycodedly</span>
              </div>

              <motion.div className="p-5 font-mono text-sm space-y-3" onViewportEnter={() => setStartTyping(true)}>
                <p className="text-gray-400"><span className="text-white">$</span> git clone verycodedly/starter</p>
                <p className="text-gray-300 ml-3">Cloning into 'starter'...</p>

                <p className="text-gray-400 mt-4"><span className="text-white">$</span> cd starter</p>

                <p className="text-gray-400 mt-4"><span className="text-white">$</span> npm install</p>
                <p className="text-gray-300 ml-3">Installing dependencies...</p>

                <p className="text-gray-400 mt-4"><span className="text-white">$</span> npm run start</p>

                <p className="text-lime-400 ml-3 min-h-[24px]">
                  {startTyping && (
                    <Typewriter
                      words={['Server running. Your move.']}
                      loop={1}
                      cursor={false}
                      typeSpeed={50}
                      delaySpeed={500}
                      onLoopDone={() => setTypingComplete(true)}
                    />
                  )}
                </p>
                <div className="flex items-center gap-1 text-gray-400 mt-4">
                  {typingComplete ? (
                    <>
                      <span className="text-white">$</span>
                      <span className="w-2 h-4 bg-lime-400/70 animate-pulse" />
                    </>
                  ) : (
                    <span className="text-white opacity-0">$</span>
                  )}
                </div>
              </motion.div>
              <div className="h-1 bg-gradient-to-r from-lime-400/20 via-pink-400/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="relative z-10 max-w-2xl mx-auto lg:ml-auto lg:w-1/2 lg:mr-0 text-center lg:text-right">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-7 leading-tight bg-gradient-to-r from-white to-lime-300 bg-clip-text text-transparent">
            Ready <br /> to Start <br /> Something?
          </h2>

          <p className="text-gray-300/90 text-base px-4 md:px-0 md:text-lg mb-10 max-w-sm mx-auto lg:ml-auto lg:mr-0">
            Start learning with people who are into what you&apos;re into.
            Your next big thing could start here.
          </p>

          <div className="flex justify-center lg:justify-end">
            <Link
              href="/start"
              className="font-semibold border-3 border-gray-500 px-7.5 py-1 rounded-full bg-lime-400 hover:bg-white active:bg-white text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1 transition-all duration-200"
            >
              Start Here
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
