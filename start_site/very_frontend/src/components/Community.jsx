import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Community() {
  return (
    <section className="w-full bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-12">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Join a Thriving <span className="text-lime-400">Creative Community</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto md:mx-0">
            Collaborate, get inspired, and build magic with people who think like you do. 
            Your next idea might just come from your next conversation.
          </p>
          
          {/* Feature tags */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-10">
            <span className="bg-pink-400/10 text-pink-300 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md border border-pink-400/20">
              Daily inspiration
            </span>
            <span className="bg-lime-400/10 text-lime-300 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md border border-lime-400/20">
              Creative minds
            </span>
            <span className="bg-cyan-400/10 text-cyan-300 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md border border-cyan-400/20">
              Inclusive space
            </span>
          </div>

          {/* Join button */}
          <div className="flex justify-center md:justify-start">
            <Link 
              href="https://discord.gg/53wVsqEcbE" 
              type="button"
              aria-label="Join Discord button"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block font-bold border-3 border-gray-500 px-8.5 md:px-9 lg:px-9.5 py-1 rounded-full text-white text-md hover:bg-white active:bg-white hover:text-black
                       active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#0f0] active:shadow-[0_2px_0_0_#0f0] active:translate-y-1.5 hover:translate-y-0.5  transition-all duration-200"
            >Join Now
              {/* <span className="lg:hidden">Join</span> */}
              {/* <span className="hidden lg:inline"></span> */}
            </Link>
          </div>

          <p className="text-gray-500 text-xs mt-4">
            No spam, no ads, just pure creative energy.
          </p>
        </div>
        
        {/* Right Visual */}
        <div className="w-full md:w-1/2 flex-1 overflow-hidden">
          <Image 
            className="w-full h-72 md:h-96 rounded-3xl object-cover" 
            src="images/community-img.svg" 
            alt="Community illustration" 
            width={600} 
            height={400} 
            priority={false}
            />
        </div>
      </div>
    </section>
  );
}
