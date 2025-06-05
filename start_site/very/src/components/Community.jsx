import React from 'react';

export default function Community() {
  return (
    <>
    <section className="w-full py-18 bg-black flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-pops font-bold text-white mb-10">
            Join a Thriving Creative Community
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10">
            Collaborate, get inspired, and build magic with people who think like you do. Your next idea might just come from your next conversation.
          </p>

          <div className="flex flex-wrap justify-center gap-4 py-6 mb-15">
            <span className="bg-pink-400/10 text-pink-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-pink-400/20">
              Daily inspiration
            </span>
            <span className="bg-lime-400/10 text-lime-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-lime-400/20">
              Lots of Creatives
            </span>
            <span className="bg-cyan-400/10 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-cyan-400/20">
              Safe, inclusive space
            </span>
          </div>
          
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <a href="#join" className="font-bold cursor-pointer border-2 border-gray-500/100 bg-lime-400 text-black px-6 py-1 rounded-full hover:bg-white hover:text-black shadow-[0_4px_0_0_#0f0] hover:translate-y-1 hover:shadow-[0_2px_0_0_#0f0] active:translate-y-0 transition-all duration-200">
            Join Now
          </a>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            No spam, no ads, just pure creative energy.
          </p>
        </div>
      </section>
      </>
  );
}
