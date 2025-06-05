import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import MorphingPanel from "./MorphingPanel.jsx";

export default function Hero() {
    return (
        <section className="grid grid-cols-2 lg:grid-cols-2 gap-10 items-center mt-16 px-14 md:px-14">
          <div className="space-y-6 z-20">
          <div className="min-h-[230px] w-[400px] flex relativ">
          <h1 className="text-6xl font-pops font-extrabold leading-tight">
            <Typewriter
              words={["Ready to see what's next in Tech?"]}
              // loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={40}
              // deleteSpeed={50}
              // delaySpeed={1500}
            />
          </h1>
          </div>
          <p className="text-gray-400 max-w-md">
            Deep insights on what you need to know. No noise, just clarity.
          </p>
          <div className="flex space-x-4">
            <a className="font-semibold cursor-pointer border-2 border-gray-500/100 bg-lime-400 text-black px-6 py-1 rounded-full hover:bg-white hover:text-black shadow-[0_4px_0_0_#0f0] hover:translate-y-1 hover:shadow-[0_2px_0_0_#0f0] active:translate-y-0 transition-all duration-200">Start Learning</a>
            <a className="cursor-pointer border-2 border-gray-500/100 px-9 py-1 rounded-full hover:bg-white hover:text-black hover:translate-y-1 shadow-[0_4px_0_0_#0f0] hover:shadow-[0_2px_0_0_#0f0] active:translate-y-0 transition-all duration-200">Explore Blog</a>
          </div>
        </div>

        {/* Morphing Graphics Placeholder */}
        {/* <div className="relative pt-10 h-[350px] rounded-3xl border border-lime-400 bg-gradient-to-br from-[#0f0f0f] to-[#1f1f1f] p-5"> */}
          {/* This is where the morphing graphic component will go */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 via-pink-400/5 to-[#000]/20 backdrop-blur-xl rounded-3xl"></div> */}
          <MorphingPanel />
          {/* Uncomment below to add morphing code + symbols + logos */}
          {/* <div className="absolute inset-0 flex items-center justify-center text-lime-400 text-lg"> */}
            {/* [ Morphing Code + Symbols + Logos Here ] */}
          {/* </div> */}
        {/* </div> */}
      </section>
  );
}