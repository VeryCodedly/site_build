import React from 'react';
import ScrollLink from './ScrollLink';
import useScrollShadow from '../hooks/useScrollShadow';

export default function Header() {
  const isScrolled = useScrollShadow();

  return (
    <header className={`sticky top-0 z-50 px-4 py-4 rounded-b-2xl bg-black flex justify-between items-center ${isScrolled ? 'shadow-md shadow-gray-50/10 transition-shadow duration 300' : ''}`}>
            {/* <div className="m-0 b-0 p-0"> */}
              <a href="/" className="">
                <div className="">
                  <img
                    src="/images/favicon.svg"
                    alt="Logo"
                    className="absolute left-0 top-0 h-14 w-14 object-contain"
                    loading="eager"
                  />
                </div>
              </a>
            {/* </div> */}
              <nav className="space-x-17 text-xs font-inter md:flex">
                <a href="/read" className="px-2 text-white hover:text-lime-400 transition">READ</a>
                <a href="/learn" className="px-2 text-white hover:text-lime-400 transition">LEARN</a>
                <a href="/know" className="px-2 text-white hover:text-lime-400 transition">KNOW</a>
                <a href="/connect" className="px-2 text-white hover:text-lime-400 transition">CONNECT</a>
              </nav>
              <a href="/contact" className="cursor-pointer border-2 border-gray-500/100 bg-lime-400 hover:bg-white hover:text-black text-black text-xs px-4 py-0 rounded-full font-bold shadow-[0_3px_0_0_#0f0] hover:translate-y-1 hover:shadow-[0_2px_0_0_#0f0] active:translate-y-0 transition-all duration-200">CONTACT</a>
          </header>
  );
}
