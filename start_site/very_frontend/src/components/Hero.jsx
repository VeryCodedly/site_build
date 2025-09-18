"use client";

import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import MorphingPanel from "./MorphingPanel.jsx";

export default function Hero() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16 px-14 md:px-14">
        {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16 px-14 md:px-14"> */}
          <div className="space-y-5 sm:space-y-6 z-20">
          {/* <div className="min-h-[230px] w-[400px] flex relative"> */}
          <div className="w-full max-w-[400px] min-w-[280px] min-h-[100px] sm:min-h-[180px] md:min-h-[230px] flex relative boder brder-amber-100">
          <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-6xl text-white font-extrabold leading-tight">
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
            <a className="font-bold cursor-pointer border-3 border-gray-500/100 bg-lime-400 text-black px-4 py-1 sm:px-6 sm:py-1 rounded-full hover:bg-white hover:font-bold hover:text-black shadow-[0_4px_0_0_#0f0] hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#0f0] active:translate-y-1.5 transition-all duration-200">
              <span className="sm:hidden">Learn</span>
              <span className="hidden sm:inline">Start Learning</span>
            </a>
            <a className="font-bold cursor-pointer border-3 border-gray-500/100 px-5 py-1 sm:px-8 sm:py-1 rounded-full text-white hover:bg-white hover:text-black hover:translate-y-0.5 shadow-[0_4px_0_0_#0f0] hover:shadow-[0_2px_0_0_#0f0] active:translate-y-1.5 transition-all duration-200">
              <span className="sm:hidden">Blog</span>
              <span className="hidden sm:inline">Explore Blog</span>
            </a>
          </div>
        </div>

          <div className="flex items-center justify-center w-full mt-20 sm:mt-0 md:mt-20 lg:mt-0">
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