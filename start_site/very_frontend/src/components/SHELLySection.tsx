"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Typewriter } from 'react-simple-typewriter';

export default function HomeMascot() {
  const [cursor, setCursor] = useState("|");
  const [startTyping, setStartTyping] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursor((prev) => (prev === "█" ? " " : "█"));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (startTyping) {
      const timer = setTimeout(() => {
        setTypingComplete(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [startTyping]);

  return (
    <section className="relative w-full bg-black overflow-hidden">
      <div className="relative flex flex-col lg:flex-row min-h-screen">
        {/* Left side: Mascot image – on mobile it's below the text */}
        <div className="relative w-full lg:w-[60%] h-[50vh] lg:h-screen flex-shrink-0 order-2 lg:order-1">
          <Image
            src="/images/SHELLy.svg"
            alt="SHELLy – VeryCodedly mascot"
            fill
            className="object-contain object-center scale-x-[-1]"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right side: Text content – on mobile it's above the image */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:py-0 order-1 lg:order-2">
          <div className="group max-w-xl mx-auto ml-4 sm:ml-0 lg:mx-0">
            <div className="mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400" />
              <p className="text-xs uppercase tracking-widest text-gray-400">a distinguished gentleman</p>
            </div>

            <h3 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-white">
              This is{" "}
              <span className="bg-lime-400 bg-clip-text text-transparent">
                SHELLy.
              </span>
            </h3>

            <motion.div
              className="mt-6 flex items-baseline flex-wrap gap-2"
              onViewportEnter={() => setStartTyping(true)}
            >
              <div className="h-10 text-gray-300 text-2xl sm:text-3xl md:text-3xl font-mono">
                {startTyping && (
                  <Typewriter
                    words={['$ SHELLy eats bugs.']}
                    loop={1}
                    cursor={false}
                    typeSpeed={50}
                    delaySpeed={500}
                    onLoopDone={() => setTypingComplete(true)}
                  />
                )}
              </div>
              {typingComplete && (
                <span className="text-lime-400 text-2xl font-mono animate-pulse">
                  {cursor}
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
