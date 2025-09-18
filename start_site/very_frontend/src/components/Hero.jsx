"use client";

import React from 'react';
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';
import MorphingPanel from "./MorphingPanel.jsx";

export default function Hero() {
    return (
        <section className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 items-center py-12 sm:py-16 md:py-16 lg:py-18 px-10 sm:px-12 md:px-12 lg:px-16">
        {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16 px-14 md:px-14"> */}
          <div className="space-y-6 z-20">
          {/* <div className="min-h-[230px] w-[400px] flex relative"> */}
          <div className="w-full max-w-[400px] min-w-[300px] min-h-[180px] sm:min-h-[180px] md:min-h-[230px] flex relative">
          <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl text-white font-extrabold tracking-wider sm:tracking-normal leading-tight">
            <Typewriter
              words={["Ready to see what's next in Tech?"]}
              cursor
              cursorStyle="|"
              typeSpeed={40}
              // deleteSpeed={50}
              // delaySpeed={1500}
            />
          </h1>
          </div>
          {/* <p className="text-gray-400 relative max-w-fit"> */}
          <p className="w-full min-w-[280px] max-w-[400px] text-gray-400 text-base sm:text-md">
            Deep insights on what you need to know. No noise, just clarity.
          </p>
          <div className="flex space-x-4">
            <Link href="/learn" className="font-bold cursor-pointer border-3 border-gray-500/100 bg-lime-400 text-black px-6 py-1 sm:px-7 md:px-7 rounded-full hover:bg-white hover:font-bold hover:text-black shadow-[0_4px_0_0_#0f0] hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#0f0] active:translate-y-1.5 transition-all duration-200">
              <span className="lg:hidden">Learn</span>
              <span className="hidden lg:inline">Start Learning</span>
            </Link>
            <Link href="/blog" className="font-bold cursor-pointer border-3 border-gray-500/100 px-7 py-1 sm:px-8 md:px-8 rounded-full text-white hover:bg-white hover:text-black hover:translate-y-0.5 shadow-[0_4px_0_0_#0f0] hover:shadow-[0_2px_0_0_#0f0] active:translate-y-1.5 transition-all duration-200">
              <span className="lg:hidden">Blog</span>
              <span className="hidden lg:inline">Explore Blog</span>
            </Link>
          </div>
        </div>

          <div className="flex items-center justify-center w-full mt-20 sm:mt-14 md:mt-0 lg:mt-0">
            <MorphingPanel />
          </div>

          {/* Uncomment below to add morphing code + symbols + logos */}
          {/* <div className="absolute inset-0 flex items-center justify-center text-lime-400 text-lg"> */}
            {/* [ Morphing Code + Symbols + Logos Here ] */}
          {/* </div> */}
        {/* </div> */}
      </section>
  );
}