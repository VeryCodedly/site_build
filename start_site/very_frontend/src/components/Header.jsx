"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
// import ScrollLink from './ScrollLink';
import useScrollShadow from '../hooks/useScrollShadow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const isScrolled = useScrollShadow();
  const [menuOpen, setMenuOpen] = useState(false);

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false); // scrolling down → hide
      } else {
        setShow(true); // scrolling up → show
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


  return (
    <header className={`sticky top-0 z-50 px-2 py-3 rounded-b-2xl bg-black/20 backdrop-blur-lg flex justify-between items-center transition-transform duration-300
    ${isScrolled ? 'shadow-md shadow-gray-50/10 transition-shadow duration 300' : ''}
    ${show ? "translate-y-0" : "-translate-y-full"}`}>
            {/* <div className="m-0 b-0 p-0"> */}
              <Link href="/" className="">
                <div className=" flex items-center space-x-1">
                  <Image
                    src="/images/favicon-main.svg"
                    alt="Logo"
                    className="absolute left-1 sm:left-1.5 top-0 h-12 w-20  object-cover hover:scale-105 active:scale-70 transition-all duration-400"
                    loading="eager"
                    width={0}
                    height={0}
                    priority
                  />
                </div>
              </Link>
            {/* </div> */}
              <nav className="space-x-18 text-xs hidden md:flex">
                <Link href="/blog" className="px-2 text-white hover:text-lime-400 transition">READ</Link>
                <Link href="/learn" className="px-2 text-white hover:text-lime-400 transition">LEARN</Link>
                <Link href="https://www.youtube.com/channel/UCNDy9Q0qPHcY-TT2BD7B1kw" target="_blank" className="px-2 text-white hover:text-lime-400 transition">KNOW</Link>
                <Link href="https://discord.gg/invite/UVWNezaj" className="px-2 text-white hover:text-lime-400 transition" target="_blank" rel="noopener">CONNECT</Link>
                <p href="/" className="px-2 text-white hover:text-lime-400 transition">Beta 🚧</p>
              </nav>
              <div className="pr-4 py-0">
              <Link href="/contact" className="hidden md:inline-flex cursor-pointer border-2 border-gray-500/100 bg-lime-400 hover:bg-white text-black px-3 py-0.5 rounded-full shadow-[0_3px_0_0_#0f0] hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#0f0] active:translate-y-1.5 transition-all duration-200">
              <FontAwesomeIcon className="" icon={faEnvelope} size="sm" />
              </Link>
              </div>
              
              {/* Mobile menu toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white focus:outline-none"
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="mr-2 hover:text-lime-400 active:text-lime-400" size="lg" />
      </button>

      {/* Mobile dropdown */}
      <div
        className={`absolute top-full w-[97%] flex flex-col items-center transform transition-all duration-500 ease-in-out
                bg-black/100 backdrop-blur-lg border-2 border-white/20 rounded-4xl py-6.5 space-y-4 md:hidden
                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}
        >
          <Link
            href="/blog"
            className="text-white hover:text-lime-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            READ
          </Link>
          <Link
            href="/learn"
            className="text-white hover:text-lime-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            LEARN
          </Link>
          <Link
            href="/know"
            className="text-white hover:text-lime-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            KNOW
          </Link>
          <Link
            href="https://discord.gg/invite/UVWNezaj"
            className="text-white hover:text-lime-400 transition"
            target="_blank"
            rel="noopener"
            onClick={() => setMenuOpen(false)}
          >
            CONNECT
          </Link>
          <Link
            href="/contact"
            className="inline-flex cursor-pointer border-2 border-gray-500/100 bg-lime-400 hover:bg-white text-black px-3.5 py-1 rounded-full shadow-[0_3px_0_0_#0f0] hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#0f0] active:translate-y-1.5 transition-all duration-200"
            onClick={() => setMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faEnvelope} size="sm" />
          </Link>
          <p className="px-2 text-white hover:text-lime-400 transition">Beta 🚧</p>
        </div>
      </header>
  );
}
