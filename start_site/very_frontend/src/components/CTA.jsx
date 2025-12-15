import React from 'react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="relative in-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white py-30 px-10 overflow-hidden">

      {/* Accent Glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-lime-400/20 rounded-full blur-[120px]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex justify-end">
        <div className="text-right md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white to-lime-300 bg-clip-text text-transparent">
            Ready<br /> to Create <br /> Something Brilliant?
          </h2>
          <p className="text-gray-300/90 px-1 sm:px-0 text-base md:text-lg mb-10 max-w-sm ml-auto">
            Start learning with a community of bold thinkers, dreamers, and doers. Your next big thing starts here.
          </p>

          <div className="flex space-x-4 justify-end">
            <Link
              href="/learn"
              aria-label="Go to Learn"
              className="font-bold cursor-pointer border-3 border-gray-500/100 px-8 py-1 rounded-full hover:bg-white active:bg-white hover:text-black active:text-black shadow-[0_4px_0_0_#39ff14]
                         hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
            >
              <span className="sr-only">Start</span>
              <span className="lg:hidden">Start</span>
              <span className="hidden lg:inline">Get Started</span>
              {/* <span className="absolute inset-0 bg-gradient-to-t from-lime-400 to-lime-300 
                               translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out"></span> */}
              {/* <span className="relative z-10 group-hover:text-black">Get Started</span> */}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
